import React, { useState } from 'react';

const LogoDesign = () => {
  const [activeService, setActiveService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'Custom Logo Creation',
      icon: 'https://nutz.in/assets/feather/pen-tool.svg',
      tooltip: 'Bespoke logos for brand identity',
      details: [
        'We craft bespoke logos that uniquely represent your brand’s identity and core values.',
        'Our designs are tailored to resonate with your target audience, ensuring instant recognition.',
        'We explore multiple creative concepts to provide you with diverse options to choose from.',
        'Our team ensures each logo is versatile, looking impeccable across digital platforms and print media.',
        'We deliver scalable designs that maintain clarity from small icons to large signage.',
        'Our process includes in-depth research into your industry and competitors for a standout result.',
        'We provide unlimited revisions until you’re completely satisfied with the final design.',
      ],
      tools: 'Adobe Illustrator, Photoshop, CorelDRAW, Affinity Designer, Inkscape',
    },
    {
      name: 'Logo Redesign',
      icon: 'https://nutz.in/assets/feather/edit-2.svg',
      tooltip: 'Modernizing existing logos',
      details: [
        'We refresh outdated logos while preserving your brand’s heritage and equity.',
        'Our redesigns modernize your visual identity to align with current trends and audience expectations.',
        'We analyze your existing logo to identify strengths and areas for improvement.',
        'Our team ensures a seamless transition with updated branding materials.',
        'We maintain consistency with your established brand colors and typography where needed.',
        'Our redesign process includes mockups to visualize the new logo in real-world applications.',
        'We offer strategic guidance to reintroduce your updated logo to your audience.',
      ],
      tools: 'Adobe Illustrator, Photoshop, Figma, Canva, Sketch',
    },
    {
      name: 'Logo Animation',
      icon: 'https://nutz.in/assets/feather/film.svg',
      tooltip: 'Dynamic logo animations',
      details: [
        'We bring your logo to life with dynamic animations for digital platforms and video content.',
        'Our animations enhance brand engagement, making your logo memorable in motion.',
        'We create smooth, professional transitions tailored to your brand’s personality.',
        'Our team optimizes animations for web, social media, and presentation use.',
        'We provide lightweight files to ensure fast loading without compromising quality.',
        'Our process includes storyboarding to align the animation with your marketing goals.',
        'We deliver versatile formats like GIF, MP4, and Lottie for all your needs.',
      ],
      tools: 'Adobe After Effects, Premiere Pro, Cinema 4D, Blender, Lottie by Airbnb',
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tools.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container section-mobileview" style={{ paddingTop: '12rem', paddingBottom: '6rem', background: '#f8f9fc', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Logo Design</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search services or tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {filteredServices.map((service, index) => (
          <div
            key={index}
            onClick={() => setActiveService(service)}
            style={{
              cursor: 'pointer',
              padding: '1.5rem',
              borderRadius: '12px',
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'transform 0.2s',
            }}
          >
            <div className="tooltip-container" style={{ position: 'relative' }}>
              <img src={service.icon} alt={service.name} style={{ width: '48px', marginBottom: '1rem' }} />
              <div className="tooltip">{service.tooltip}</div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{service.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeService && (
        <div className="modal-overlay" onClick={() => setActiveService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveService(null)}>&times;</button>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{activeService.name}</h3>
            <ul style={{ paddingLeft: '1rem' }}>
              {activeService.details.map((detail, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem', lineHeight: 1.6 }}>{detail}</li>
              ))}
            </ul>
            <p style={{ marginTop: '1.5rem', fontWeight: 600 }}>
              Tools & Technologies: <span style={{ fontWeight: 'normal' }}>{activeService.tools}</span>
            </p>
          </div>
        </div>
      )}

      <style>{`
        .tooltip {
          visibility: hidden;
          background: #333;
          color: #fff;
          text-align: center;
          padding: 0.5rem;
          border-radius: 4px;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 5;
        }

        .tooltip-container:hover .tooltip {
          visibility: visible;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 10px;
          width: 90%;
          max-width: 600px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease-out;
        }

        .close-button {
          position: absolute;
          top: 0.75rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #888;
        }

        .close-button:hover {
          color: #000;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default LogoDesign;
