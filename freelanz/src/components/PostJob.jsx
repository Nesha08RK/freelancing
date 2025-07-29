import React, { useState } from 'react';
import Header from './Header';
import '../styles/post-job.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { title, category, description, budget } = formData;
    if (!title || !category || !description || !budget) {
      setError('All fields are required');
      return;
    }

    if (budget <= 0) {
      setError('Budget must be greater than 0');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/jobs', {
        title,
        category,
        description,
        budget,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      setFormData({
        title: '',
        category: '',
        description: '',
        budget: '',
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to post job');
      }
    }
  };

  return (
    <>
      <Header />
      <section id="post-job" className="post-job">
        <div className="container">
          <div className="section-title">
            <h2>Post a Job</h2>
            <p>Attract top talent by posting your job requirements here.</p>
          </div>
          <div className="job-form">
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  placeholder="e.g., Front-End Developer Needed"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="web-development">Web Development</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="logo-design">Logo Design</option>
                  <option value="content-writing">Content Writing</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Job Description</label>
                <textarea
                  id="description"
                  className="form-input"
                  rows="5"
                  placeholder="Describe the job requirements, skills needed, and any other details..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget (INR)</label>
                <input
                  type="number"
                  id="budget"
                  className="form-input"
                  placeholder="e.g., 5000"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-btn">Post Job</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostJob;