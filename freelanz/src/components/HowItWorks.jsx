import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="Howitworks" className="Howitworks">
      <div className="section-title" data-aos="fade-up">
        <br></br>
        <h2>How it Works!</h2>
      </div>
      <div className="howitworks-content">
        <div className="row">
          <div className="col-md-6">
            <div className="info-box">
              <h4>Post your job</h4>
              <p>
                It's free and easy! Get lots of competitive bids that suit your budget in minutes. Start making your dreams reality.
              </p>
            </div>
            <div className="info-box">
              <h4>Choose freelancers</h4>
              <p>
                No job is too big or complex. We've got freelancers for jobs of any size or budget, across 2700+ skills.
              </p>
            </div>
            <div className="info-box">
              <h4>Pay safely</h4>
              <p>
                Only pay for work when you are 100% satisfied. Our milestone payment system protects you every step of the way.
              </p>
            </div>
            <div className="info-box">
              <h4>We're here to help</h4>
              <p>
                Our expert recruiters help you save time finding talent, even managing your job if needed.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/men/10.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐⭐</p>
                <p>John Doe - Web Developer</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/women/20.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐⭐</p>
                <p>Jane Smith - Graphic Designer</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/men/30.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐⭐</p>
                <p>Michael Brown - Content Writer</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/women/40.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐</p>
                <p>Lisa Ray - SEO Expert</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/women/60.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐</p>
                <p>Emily Clark - UI/UX Designer</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/men/70.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐⭐</p>
                <p>Robert Wilson - Data Analyst</p>
              </div>
            </div>
            <div className="freelancer-box">
              <img
                src="https://randomuser.me/api/portraits/women/80.jpg"
                className="freelancer-img"
                alt="Freelancer"
              />
              <div>
                <p className="stars">⭐⭐⭐⭐</p>
                <p>Sarah Kim - Digital Marketer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;