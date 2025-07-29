import React from "react";
import "../styles/testimonials.css";

const Testimonials = () => {
  const testimonials = [
    { quote: "Great service!", author: "John Doe" },
    { quote: "Highly recommended!", author: "Jane Smith" },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-item">
            <p>{item.quote}</p>
            <h4>{item.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;