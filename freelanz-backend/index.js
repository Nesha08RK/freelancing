const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads", "profilePics");
fs.mkdirSync(uploadsDir, { recursive: true });

// ======================
//       MIDDLEWARE
// ======================
// ❗ FIX APPLIED: allow your deployed frontend domain
app.use(cors({
  origin: [
    "https://freelancing-marketplace-f0i8m5a77-nesha-r-ks-projects.vercel.app", // current deployment
    "https://freelancing-marketplace.vercel.app" // permanent production URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
//  MONGODB ATLAS CONNECT
// ======================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ======================
//       USER MODEL
// ======================
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "freelancer"], default: "user" },

  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  profilePic: { type: String, default: "" },
  location: { type: String, default: "" },
  portfolioLinks: { type: [String], default: [] },
  rating: { type: Number, default: 0 },

  totalProjects: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

// ======================
//       JOB MODEL
// ======================
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);

// ======================
//     PROPOSAL MODEL
// ======================
const proposalSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  bid: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "pending", enum: ["pending", "approved", "ignored"] },
  createdAt: { type: Date, default: Date.now },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

// ======================
//     PROJECT MODEL
// ======================
const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedWord: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: "In Progress", enum: ["In Progress", "Completed"] },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

// ================================
//  JWT AUTH VERIFICATION MIDDLEWARE
// ================================
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No authentication token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ================================
//        MULTER (file uploads)
// ================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"));
  },
});

// ================================
//            LOGIN
// ================================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//            SIGNUP
// ================================
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user",
      totalProjects: 0,
      completedProjects: 0,
    });

    await user.save();

    const project = new Project({
      userId: user._id,
      assignedWord: "Sample Project",
      progress: 0,
      status: "In Progress",
    });

    await project.save();
    user.totalProjects = 1;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//      Post a Job
// ================================
app.post("/api/jobs", verifyToken, async (req, res) => {
  try {
    const { title, category, description, budget } = req.body;

    if (!title || !category || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = new Job({
      title,
      category,
      description,
      budget,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//    Fetch Open Jobs for Freelancer
// ================================
app.get("/api/jobs/open", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can access this endpoint" });
    }

    const proposals = await Proposal.find({ freelancer: req.user.id });
    const appliedJobIds = proposals.map((proposal) => proposal.jobId.toString());

    const jobs = await Job.find({
      postedBy: { $ne: req.user.id },
      _id: { $nin: appliedJobIds },
    }).populate("postedBy", "fullName");

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//    Submit a Proposal
// ================================
app.post("/api/proposals", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can submit proposals" });
    }

    const { jobId, bid, message } = req.body;

    if (!jobId || !bid || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existingProposal = await Proposal.findOne({
      freelancer: req.user.id,
      jobId,
    });

    if (existingProposal) {
      return res.status(400).json({ message: "You already submitted a proposal" });
    }

    const proposal = new Proposal({ freelancer: req.user.id, jobId, bid, message });
    await proposal.save();

    res.status(201).json({ message: "Proposal submitted successfully", proposal });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//   Fetch Jobs + Proposals
// ================================
app.get("/api/jobs", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).populate("postedBy", "fullName");

    const jobsWithProposals = await Promise.all(
      jobs.map(async (job) => {
        const proposals = await Proposal.find({ jobId: job._id })
          .populate("freelancer", "fullName");
        return { ...job._doc, proposals };
      })
    );

    res.status(200).json(jobsWithProposals);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//   Approve / Ignore Proposals
// ================================
app.put("/api/proposals/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["approved", "ignored"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const proposal = await Proposal.findById(id);
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    const job = await Job.findById(proposal.jobId);
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    proposal.status = status;
    await proposal.save();

    if (status === "approved") {
      await Proposal.updateMany(
        { jobId: proposal.jobId, _id: { $ne: id }, status: "pending" },
        { status: "ignored" }
      );

      const existingProject = await Project.findOne({
        userId: proposal.freelancer,
        jobId: proposal.jobId,
      });

      if (!existingProject) {
        const project = new Project({
          userId: proposal.freelancer,
          assignedWord: job.title,
          progress: 0,
          status: "In Progress",
        });

        await project.save();

        const freelancer = await User.findById(proposal.freelancer);
        freelancer.totalProjects = (freelancer.totalProjects || 0) + 1;
        await freelancer.save();
      }
    }

    res.status(200).json({ message: "Proposal updated successfully", proposal });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//       Dashboard Data
// ================================
app.get("/api/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await Project.findOne({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      totalProjects: user.totalProjects,
      completedProjects: user.completedProjects,
      assignedWord: project ? project.assignedWord : "No project assigned",
      progress: project ? project.progress : 0,
      status: project ? project.status : "N/A",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//   Update Project Status
// ================================
app.put("/api/project/status", verifyToken, async (req, res) => {
  try {
    const { status, progress } = req.body;

    if (!status || !["In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const project = await Project.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const previousStatus = project.status;

    project.status = status;
    project.progress = progress;
    await project.save();

    const user = await User.findById(req.user.id);

    if (status === "Completed" && previousStatus !== "Completed") {
      user.completedProjects += 1;
    } else if (previousStatus === "Completed" && status !== "Completed") {
      user.completedProjects -= 1;
    }

    await user.save();

    res.status(200).json({
      message: "Project status updated",
      project: {
        assignedWord: project.assignedWord,
        progress: project.progress,
        status: project.status,
      },
      user: {
        totalProjects: user.totalProjects,
        completedProjects: user.completedProjects,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//       Get User Profile
// ================================
app.get("/api/profile/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//       Update Profile
// ================================
app.put("/api/profile", verifyToken, async (req, res) => {
  try {
    const { fullName, bio, skills, location, profilePic, portfolioLinks } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        bio,
        skills,
        location,
        profilePic,
        portfolioLinks,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
//   Upload profile picture (Multer)
// ================================
app.post("/api/upload/profile-pic", verifyToken, upload.single("profilePic"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = `/uploads/profilePics/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
});

// ================================
//         SERVER START
// ================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
