import React, { useState } from 'react';

const DigitalMarketing = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'Search Engine Optimization (SEO)',
      icon: 'https://nutz.in/assets/feather/search.svg',
      tooltip: 'Boost website visibility',
      details: [
        'We enhance your website’s visibility on search engines with advanced SEO strategies.',
        'Our team conducts in-depth keyword research to target high-intent search terms.',
        'We optimize on-page elements like meta tags, headings, and content for better rankings.',
        'Our off-page SEO builds high-quality backlinks to boost your site’s authority.',
        'We provide technical SEO to improve site speed, mobile-friendliness, and crawlability.',
        'Our monthly reports track performance metrics like organic traffic and keyword positions.',
        'We adapt strategies based on the latest search engine algorithm updates.',
      ],
      tools: 'Google Analytics, SEMrush, Ahrefs, Moz, Screaming Frog, Google Search Console',
    },
    {
      name: 'Social Media Marketing',
      icon: 'https://nutz.in/assets/feather/share-2.svg',
      tooltip: 'Engage audiences on social platforms',
      details: [
        'We create impactful social media campaigns to grow your brand’s online presence.',
        'Our team designs engaging content tailored to platforms like Instagram, Facebook, and LinkedIn.',
        'We manage ad campaigns to target specific demographics and maximize ROI.',
        'Our strategies increase follower engagement through interactive posts and stories.',
        'We analyze social media metrics to refine campaigns and boost performance.',
        'Our team schedules consistent posts to maintain an active and vibrant presence.',
        'We leverage influencer partnerships to amplify your brand’s reach.',
      ],
      tools: 'Hootsuite, Buffer, Canva, Sprout Social, Meta Business Suite, Later',
    },
    {
      name: 'Pay-Per-Click (PPC) Advertising',
      icon: 'https://nutz.in/assets/feather/dollar-sign.svg',
      tooltip: 'Drive traffic with targeted ads',
      details: [
        'We design PPC campaigns that deliver immediate traffic and measurable results.',
        'Our team optimizes ad copy and landing pages for higher click-through and conversion rates.',
        'We target precise audiences with data-driven keyword and demographic selections.',
        'Our budget management ensures maximum ROI with cost-effective bidding strategies.',
        'We provide A/B testing to identify the most effective ad variations.',
        'Our real-time monitoring adjusts campaigns to capitalize on trends and opportunities.',
        'We deliver detailed performance reports to track clicks, conversions, and cost metrics.',
      ],
      tools: 'Google Ads, Microsoft Advertising, AdEspresso, WordStream, SpyFu, Optmyzr',
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
          Digital Marketing
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

      <style>
        {`
          @media (max-width: 991px) {
            .section-mobileview {
              padding-top: 8rem;
              padding-bottom: 4rem;
            }
            .grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </section>
  );
};

export default DigitalMarketing;
