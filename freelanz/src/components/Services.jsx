import React from 'react';
import '../styles/services.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { useEffect } from 'react';

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <br></br>
        <h2>Services</h2>
        <p>Check our Services</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-activity"></i>
              </div>
              <h3>Web Development</h3>
              <p>
                Build stunning, responsive websites tailored to your business needs using the latest technologies. 
                From personal blogs to e-commerce platforms, we bring your vision to life.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-broadcast"></i>
              </div>
              <h3>Graphic Design</h3>
              <p>
                Transform ideas into visually appealing graphics for social media, marketing, and branding. 
                From posters to brochures, we create designs that speak to your audience.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-easel"></i>
              </div>
              <h3>Digital Marketing</h3>
              <p>
                Boost your online presence with expert SEO, social media marketing, and targeted ad campaigns. Drive traffic,
                increase engagement, and grow your brand effortlessly.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-bounding-box-circles"></i>
              </div>
              <h3>Content-Writing</h3>
              <p>
                Craft engaging, SEO-friendly content that captivates your audience. From blogs to website copy,
                we deliver high-quality writing that makes an impact.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <h3>Resume & Cover Letter Writing</h3>
              <p>
                Stand out with a professionally written resume and cover letter that highlight your skills and experience. 
                Get customized documents that impress recruiters and land interviews.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <h3>Logo Design</h3>
              <p>
                Create unique and memorable logos that represent your brand identity. Get professional, high-quality designs that leave a lasting impression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;