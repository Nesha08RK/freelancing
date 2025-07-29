import React, { useState } from 'react';

const WebDevelopment = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'App Development',
      icon: 'https://nutz.in/assets/feather/smartphone.svg',
      tooltip: 'Custom mobile apps for Android and iOS',
      details: [
        'Our team comprises skilled developers well-versed in both Android and iOS platforms, enabling us to build high-quality, cross-platform mobile applications that perform seamlessly across devices.',
        'We create apps that shine on every device. Our responsive and intuitive designs ensure your app looks and works perfectly, whether it\'s on a smartphone, tablet, or desktop.',
        'Whether it’s a consumer-facing app or an enterprise solution, we deliver mobile experiences that are intuitive, fast, and scalable. From ideation to launch, we handle the entire lifecycle.',
        'Our commitment doesn’t stop at launch. We offer comprehensive post-launch support, regular updates, and feature enhancements to keep your app competitive and functional.',
      ],
      tools: 'Flutter, React Native, Swift, Kotlin, Xamarin, Ionic, Android Studio',
    },
    {
      name: 'Web Development',
      icon: 'https://nutz.in/assets/feather/code.svg',
      tooltip: 'Responsive and scalable web solutions',
      details: [
        'We specialize in turning concepts into cutting-edge digital solutions. Our team of expert developers crafts high-performance websites that are not only visually appealing but also functionally robust.',
        'Our responsive design approach ensures your website looks stunning on all screen sizes. Whether your users are on a desktop, tablet, or mobile phone, they get a consistent and engaging experience.',
        'We engineer websites to scale with your business. From custom CMS development to advanced web applications, we create solutions that grow as you do.',
        'We prioritize security in every line of code. Our websites are built with best practices to safeguard data and ensure compliance with modern web standards.',
      ],
      tools: 'React, Next.js, Three.js, Node.js, MYSQL, MongoDB, Core PHP, CodeIgniter, Laravel, Wordpress, Squarespace, Wix, Webflow',
    },
    {
      name: 'DevOps',
      icon: 'https://nutz.in/assets/feather/server.svg',
      tooltip: 'Streamlined infrastructure and CI/CD',
      details: [
        'Boost your development cycle with CI/CD pipelines that automate testing and deployment, enabling faster and more reliable releases. Our CI/CD integration reduces manual errors and increases developer productivity.',
        'Our DevOps experts streamline infrastructure management using Infrastructure as Code (IaC), allowing for consistent and repeatable environments across development, staging, and production.',
        'We enhance your system monitoring and alerting capabilities with industry-leading tools like Prometheus and Grafana. Real-time insights allow for proactive issue resolution and performance optimization.',
        'Security and compliance are built into our DevOps processes. We implement automated security checks and ensure best practices are followed throughout the development lifecycle.',
      ],
      tools: 'Git, Jenkins, Docker, Kubernetes, Prometheus, Grafana, Terraform, Ansible, AWS, Azure, GCP',
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tools.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => setSelectedService(null);

  return (
    <section className="container section-mobileview" style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>Web Development</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
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
            fontSize: '1rem',
          }}
        />
      </div>

      <div
        className="service-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => setSelectedService(service)}
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                padding: '1.5rem',
                cursor: 'pointer',
                border: '1px solid #ddd',
                transition: 'transform 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={service.icon}
                  alt={service.name}
                  style={{ width: '48px', height: '48px', marginRight: '1rem' }}
                />
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{service.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No services found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#f0e8e8',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={selectedService.icon}
                alt={selectedService.name}
                style={{ width: '40px', height: '40px', marginRight: '1rem' }}
              />
              <h3 style={{ fontSize: '1.8rem' }}>{selectedService.name}</h3>
            </div>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {selectedService.details.map((detail, idx) => (
                <li key={idx} style={{ marginBottom: '0.8rem', lineHeight: '1.5' }}>
                  {detail}
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#f0e8e8',
                borderLeft: '4px solid #3454f2',
                borderRadius: '4px',
              }}
            >
              <strong>Tools:</strong> {selectedService.tools}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default WebDevelopment;
