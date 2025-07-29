import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section py-5 mt-5">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="section-title display-5 fw-bold">Contact Us</h2>
          <p className="text-muted">We're here to help! Reach out to us with any questions or inquiries.</p>
        </div>

        {/* 3 Column Layout */}
        <div className="row g-4">
          {/* Left Column - Contact Info + More Info inside */}
          <div className="col-lg-4 col-md-6">
            <div className="p-4 h-100 shadow rounded bg-white">
              <h4 className="mb-3">Contact Information</h4>
              <p><strong>Email:</strong> freelanz@gmail.com</p>
              <p><strong>Phone:</strong> +91 8632497610</p>
              <p><strong>Address:</strong> 123 Freelanz Ave, Suite 100, Tech City, TC 12345</p>

              {/* Nested More Contact Info */}
              <div className="mt-4 p-3 rounded bg-light border">
                <h5 className="mb-2">More Contact Info</h5>
                <p><strong>Support Email:</strong> support@freelanz.com</p>
                <p><strong>Alternate Phone:</strong> +91 9876543210</p>
                <p><strong>Social Media:</strong></p>
                <ul className="list-unstyled ms-3">
                  <li>Twitter: <a href="#">@freelanzHQ</a></li>
                  <li>Instagram: <a href="#">@freelanz_official</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Column - Contact Form */}
          <div className="col-lg-4 col-md-6">
            <div className="p-4 h-100 shadow rounded bg-white">
              <h4 className="mb-3">Send Us a Message</h4>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" placeholder="Your Name" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="form-control" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button className="btn btn-primary w-100">Send Message</button>
            </div>
          </div>

          {/* Right Column - Optional or Empty */}
          <div className="col-lg-4 d-none d-lg-block">
            {/* You can use this space for a map, testimonials, or leave empty */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
