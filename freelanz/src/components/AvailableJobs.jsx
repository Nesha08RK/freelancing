import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './Header';
import '../styles/home.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'freelancer') {
      navigate('/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/jobs/open', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched jobs:", response.data);
        setJobs(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, [user, navigate]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setBid('');
    setMessage('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!bid || !message) {
      setError('Bid and message are required');
      setLoading(false);
      return;
    }

    if (bid <= 0) {
      setError('Bid must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/proposals', {
        jobId: selectedJob._id,
        bid: parseFloat(bid),
        message,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(response.data.message);
      setJobs(jobs.filter(job => job._id !== selectedJob._id));
      setSelectedJob(null);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
      setError(err.response?.data?.message || 'Failed to submit proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section id="freelancer-jobs" className="freelancer-jobs py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Available Jobs</h2>
            <p>Submit your proposals for jobs that match your skills.</p>
          </div>

          {error && <p className="error-message text-center">{error}</p>}
          {success && <p className="success-message text-center">{success}</p>}

          <div className="jobs-layout row flex-lg-nowrap">
            {/* Left Side: Job List */}
            <div className="col-lg-6 col-md-12 job-list-container">
              <h3 className="mb-4">Open Jobs</h3>
              {jobs.length === 0 ? (
                <p>No available jobs to apply for. Check back later!</p>
              ) : (
                <div className="job-list">
                  {jobs.map(job => (
                    <div
                      key={job._id}
                      className={`job-item p-4 mb-3 ${selectedJob?._id === job._id ? 'selected' : ''}`}
                      onClick={() => handleJobSelect(job)}
                    >
                      <h4>{job.title}</h4>
                      <p><strong>Category:</strong> {job.category}</p>
                      <p><strong>Description:</strong> {job.description}</p>
                      <p><strong>Budget:</strong> ₹{job.budget}</p>
                      <p><strong>Posted By:</strong> {job.postedBy?.fullName || 'Unknown Employer'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Proposal Form */}
            <div className="col-lg-6 col-md-12 proposal-container">
              {selectedJob ? (
                <>
                  <h3 className="mb-4">Submit Proposal for "{selectedJob.title}"</h3>
                  <div className="proposal-form-box p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="bid">Your Bid (INR)</label>
                        <input
                          type="number"
                          id="bid"
                          className="form-control"
                          value={bid}
                          onChange={(e) => setBid(e.target.value)}
                          placeholder="Enter your bid"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="message">Message to Employer</label>
                        <textarea
                          id="message"
                          className="form-control"
                          rows="5"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Explain why you're the best fit for this job..."
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Proposal'}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="proposal-placeholder p-4 text-center">
                  <p>Select a job from the left to submit a proposal.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AvailableJobs;