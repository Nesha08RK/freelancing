import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/hire-freelancer.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const HireFreelancer = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      }
    };

    if (user) {
      fetchJobs();
    }
  }, [user]);

  const handleApprove = async (jobId, proposalId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/proposals/${proposalId}`, {
        status: 'approved',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.map(job => {
        if (job._id === jobId) {
          return {
            ...job,
            proposals: job.proposals.map(proposal =>
              proposal._id === proposalId
                ? { ...proposal, status: 'approved' }
                : { ...proposal, status: proposal.status === 'pending' ? 'ignored' : proposal.status }
            ),
          };
        }
        return job;
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve proposal');
    }
  };

  const handleIgnore = async (jobId, proposalId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/proposals/${proposalId}`, {
        status: 'ignored',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.map(job => {
        if (job._id === jobId) {
          return {
            ...job,
            proposals: job.proposals.map(proposal =>
              proposal._id === proposalId ? { ...proposal, status: 'ignored' } : proposal
            ),
          };
        }
        return job;
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to ignore proposal');
    }
  };

  return (
    <>
      <Header />
      <section id="hire-freelancer" className="hire-freelancer">
        <div className="container">
          <div className="section-title">
            <h2>Manage Proposals</h2>
            <p>Review and respond to proposals for your posted jobs.</p>
          </div>
          {error && <p className="error-message">{error}</p>}
          {jobs.length === 0 ? (
            <p className="no-jobs">You haven't posted any jobs yet. <a href="/post-job">Post a job now!</a></p>
          ) : (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job._id} className="job-card">
                  <h3>{job.title}</h3>
                  <p><strong>Category:</strong> {job.category}</p>
                  <h4>Proposals:</h4>
                  {job.proposals.length === 0 ? (
                    <p>No proposals yet.</p>
                  ) : (
                    <div className="proposals-list">
                      {job.proposals.map(proposal => (
                        <div key={proposal._id} className={`proposal-card ${proposal.status}`}>
                          <p><strong>Freelancer:</strong> {proposal.freelancer.fullName}</p>
                          <p><strong>Bid:</strong> ₹{proposal.bid}</p>
                          <p><strong>Message:</strong> {proposal.message}</p>
                          <p><strong>Status:</strong> {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</p>
                          {proposal.status === 'pending' && (
                            <div className="proposal-actions">
                              <button
                                className="approve-btn"
                                onClick={() => handleApprove(job._id, proposal._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="ignore-btn"
                                onClick={() => handleIgnore(job._id, proposal._id)}
                              >
                                Ignore
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HireFreelancer;