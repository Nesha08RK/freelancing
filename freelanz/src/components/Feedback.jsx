import React from 'react';
import Header from './Header';
import '../styles/home.css';

const Feedback = () => {
  return (
    <>
      <Header />
      <section
        id="feedback"
        className="feedback d-flex align-items-center"
        style={{
          minHeight: 'calc(100vh - 70px)',
          background: `url('/images/hero-bg.jpg') no-repeat center center/cover`,
          backgroundAttachment: 'fixed',
          padding: '0 20px',
        }}
      >
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Feedback</h2>
            <p>We value your feedback! Let us know how we can improve Freelanz.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="feedbackMessage">Your Feedback</label>
                  <textarea
                    id="feedbackMessage"
                    className="form-control"
                    rows="5"
                    placeholder="Share your thoughts or suggestions..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <style>
        {`
          .btn-primary {
            background: #007bff;
            border: none;
            font-weight: 600;
            transition: background 0.3s ease-in-out;
          }
          .btn-primary:hover {
            background: #000000;
          }
        `}
      </style>
    </>
  );
};

export default Feedback;