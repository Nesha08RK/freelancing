import React from 'react';
import '../styles/topfreelancers.css';

const TopFreelancers = () => {
  return (
    <section className="top-freelancers-section">
      <div className="container">
        <div className="portfolio-header">
          <h1>PORTFOLIO</h1>
          <h2>CHECK OUR PORTFOLIO</h2>
        </div>
        <div className="freelancer-grid">
          <div className="freelancer-card">
            
            <img src="/images/team/team-1.jpg" alt="Ricky Henry" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Ricky Henry</h3>
              <p className="freelancer-title">Web Developer</p>
              <p className="freelancer-description">
                A skilled Web Developer with expertise in creating responsive and dynamic websites.
              </p>
            </div>
          </div>
          <div className="freelancer-card">
            <img src="/images/team/team-2.jpg" alt="Kelly Mitchell" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Kelly Mitchell</h3>
              <p className="freelancer-title">Resume & Cover Writer</p>
              <p className="freelancer-description">
                A talented Resume & Cover Writer specializing in professional document crafting.
              </p>
            </div>
          </div>
          <div className="freelancer-card">
            <img src="/images/team/team-4.jpg" alt="Bernice Bennett" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Bernice Bennett</h3>
              <p className="freelancer-title">Digital Marketing Officer</p>
              <p className="freelancer-description">
                A proficient Digital Marketing Officer with expertise in online strategies.
              </p>
            </div>
          </div>
          <div className="freelancer-card">
            <img src="/images/team/team-3.jpg" alt="Alex Carter" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Alex Carter</h3>
              <p className="freelancer-title">Graphic Designer</p>
              <p className="freelancer-description">
                A creative Graphic Designer with a passion for crafting visually stunning designs.
              </p>
            </div>
          </div>
          <div className="freelancer-card">
            <img src="/images/team/team-6.jpeg" alt="Samantha Lee" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Samantha Lee</h3>
              <p className="freelancer-title">Content Writer</p>
              <p className="freelancer-description">
                An experienced Content Writer skilled in creating engaging and SEO-friendly content.
              </p>
            </div>
          </div>
          <div className="freelancer-card">
            <img src="/images/team/team-7.jpeg" alt="Michael Brown" className="freelancer-image" />
            <div className="freelancer-info">
              <h3>Thendral</h3>
              <p className="freelancer-title">Logo Designer</p>
              <p className="freelancer-description">
                A talented Logo Designer specializing in creating unique and memorable brand identities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFreelancers;