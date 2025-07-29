import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/submit-proposal.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SubmitProposal = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ bid: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/jobs/open', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      }
    };

    if (user && user.role === 'freelancer') {
      fetchJobs();
    }
  }, [user]);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { bid, message } = formData;
    if (!bid || !message) {
      setError('All fields are required');
      return;
    }

    if (bid <= 0) {
      setError('Bid must be greater than 0');
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
      setFormData({ bid: '', message: '' });
      setJobs(jobs.filter(job => job._id !== selectedJob._id));
      setSelectedJob(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit proposal');
    }
  };

  if (user.role !== 'freelancer') {
    return (
      <>
        <Header />
        <section className="submit-proposal">
          <div className="container">
            <p className="error-message">Only freelancers can access this page.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <section id="submit-proposal" className="submit-proposal">
        <div className="container">
          <div className="section-title">
            <h2>Submit a Proposal</h2>
            <p>Find jobs and submit your proposal as a freelancer.</p>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p>No jobs available to apply for.</p>
            ) : (
              jobs.map(job => (
                <div key={job._id} className="job-card">
                  <h3>{job.title}</h3>
                  <p><strong>Category:</strong> {job.category}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Budget:</strong> ₹{job.budget}</p>
                  <p><strong>Posted By:</strong> {job.postedBy.fullName}</p>
                  <button className="apply-btn" onClick={() => handleSelectJob(job)}>
                    Apply
                  </button>
                </div>
              ))
            )}
          </div>
          {selectedJob && (
            <div className="proposal-form">
              <h3>Submit Proposal for: {selectedJob.title}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="bid">Your Bid (INR)</label>
                  <input
                    type="number"
                    id="bid"
                    name="bid"
                    className="form-input"
                    placeholder="e.g., 5000"
                    value={formData.bid}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    rows="5"
                    placeholder="Explain why you're the best fit for this job..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Proposal</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SubmitProposal;