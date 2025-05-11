const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (using freelanzDB)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected to freelanzDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema (for login)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'freelancer'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

// Proposal Schema
const proposalSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  bid: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'ignored'] },
  createdAt: { type: Date, default: Date.now },
});

const Proposal = mongoose.model('Proposal', proposalSchema);

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No authentication token found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Post a Job Route
app.post('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { title, category, description, budget } = req.body;

    if (!title || !category || !description || !budget) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const job = new Job({
      title,
      category,
      description,
      budget,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Open Jobs for Freelancers (jobs they haven't applied to)
app.get('/api/jobs/open', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ message: 'Only freelancers can access this endpoint' });
    }

    // Find jobs the freelancer hasn't applied to
    const proposals = await Proposal.find({ freelancer: req.user.id });
    const appliedJobIds = proposals.map(proposal => proposal.jobId.toString());

    // Fetch jobs that are not posted by the freelancer and not applied to
    const jobs = await Job.find({
      postedBy: { $ne: req.user.id }, // Exclude jobs posted by the freelancer
      _id: { $nin: appliedJobIds },   // Exclude jobs the freelancer has applied to
    }).populate('postedBy', 'fullName');

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching open jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a Proposal Route
app.post('/api/proposals', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ message: 'Only freelancers can submit proposals' });
    }

    const { jobId, bid, message } = req.body;

    if (!jobId || !bid || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingProposal = await Proposal.findOne({ freelancer: req.user.id, jobId });
    if (existingProposal) {
      return res.status(400).json({ message: 'You have already submitted a proposal for this job' });
    }

    const proposal = new Proposal({
      freelancer: req.user.id,
      jobId,
      bid,
      message,
    });

    await proposal.save();
    res.status(201).json({ message: 'Proposal submitted successfully', proposal });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Jobs and Proposals for a User
app.get('/api/jobs', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).populate('postedBy', 'fullName');
    const jobsWithProposals = await Promise.all(
      jobs.map(async (job) => {
        const proposals = await Proposal.find({ jobId: job._id }).populate('freelancer', 'fullName');
        return { ...job._doc, proposals };
      })
    );

    res.status(200).json(jobsWithProposals);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Proposal Status
app.put('/api/proposals/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['approved', 'ignored'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    const job = await Job.findById(proposal.jobId);
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    proposal.status = status;
    await proposal.save();

    if (status === 'approved') {
      await Proposal.updateMany(
        { jobId: proposal.jobId, _id: { $ne: id }, status: 'pending' },
        { status: 'ignored' }
      );
    }

    res.status(200).json({ message: 'Proposal updated successfully', proposal });
  } catch (error) {
    console.error('Error updating proposal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});