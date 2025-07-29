import React, { useState } from 'react';

const GraphicDesign = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'Logo Design',
      icon: 'https://nutz.in/assets/feather/pen-tool.svg',
      tooltip: 'Unique and memorable logo creation',
      details: [
        'We craft unique, memorable logos that encapsulate your brand’s identity and values.',
        'Our designs are versatile, ensuring they look stunning across digital and print media.',
        'We collaborate closely with you to understand your vision and deliver logos that resonate with your audience.',
        'Our team provides multiple concepts and revisions to ensure perfection.',
        'We optimize logos for scalability, from business cards to billboards.',
        'Our process includes delivering files in all necessary formats for seamless use.',
      ],
      tools: 'Adobe Illustrator, Photoshop, CorelDRAW, Figma, Canva',
    },
    {
      name: 'Branding',
      icon: 'https://nutz.in/assets/feather/package.svg',
      tooltip: 'Comprehensive branding strategies',
      details: [
        'We develop comprehensive branding strategies that create a cohesive and powerful brand presence.',
        'Our team designs visual identities including color schemes, typography, and brand guidelines.',
        'We ensure consistency across all touchpoints, from packaging to digital platforms.',
        'Our branding solutions enhance recognition and build trust with your audience.',
        'We provide mood boards and mockups to visualize your brand’s story.',
        'Our services include rebranding for businesses looking to refresh their image.',
      ],
      tools: 'Adobe InDesign, Illustrator, Photoshop, Sketch, Brandfolder',
    },
    {
      name: 'UI/UX Design',
      icon: 'https://nutz.in/assets/feather/layout.svg',
      tooltip: 'Intuitive and user-centered interfaces',
      details: [
        'We design intuitive, user-centered interfaces that enhance digital experiences.',
        'Our UX process includes wireframing, prototyping, and usability testing for optimal functionality.',
        'We create visually appealing UI designs that align with your brand and engage users.',
        'Our team focuses on responsive designs that work seamlessly across devices.',
        'We optimize user flows to reduce friction and increase conversion rates.',
        'Our iterative approach ensures continuous improvement based on user feedback.',
      ],
      tools: 'Figma, Adobe XD, Sketch, InVision, Axure, Principle',
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tools.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      className="container section-mobileview"
      style={{
        paddingTop: '12rem',
        paddingBottom: '6rem',
        background: 'linear-gradient(135deg, #eef2f7 0%, #ffffff 100%)',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div className="text-center mb-6">
        <h2
          style={{
            marginBottom: '4rem',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#1a2a3c',
            textShadow: '0 3px 6px rgba(0,0,0,0.15)',
          }}
        >
          Graphic Design
        </h2>
        <input
          type="text"
          placeholder="Search services or tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.75rem 1.5rem',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '2rem',
          }}
        />
      </div>

      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          padding: '0 1rem',
        }}
      >
        {filteredServices.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => setSelectedService(service)}
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={service.icon}
                alt={service.name}
                style={{ width: '48px', marginRight: '1rem' }}
              />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{service.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              overflowY: 'auto',
              maxHeight: '80vh',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#555',
              }}
            >
              &times;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={selectedService.icon}
                alt={selectedService.name}
                style={{ width: '48px', marginRight: '1rem' }}
              />
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>{selectedService.name}</h3>
            </div>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
              {selectedService.details.map((detail, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem', color: '#444' }}>
                  {detail}
                </li>
              ))}
            </ul>
            <p>
              <strong>Tools & Technologies:</strong> {selectedService.tools}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesign;
