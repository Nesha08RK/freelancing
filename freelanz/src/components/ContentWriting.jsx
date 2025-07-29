import React, { useState } from 'react';

const ContentWriting = () => {
  const [modalContent, setModalContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (service) => setModalContent(service);
  const closeModal = () => setModalContent(null);

  const services = [
    {
      name: 'Website Content',
      icon: 'https://nutz.in/assets/feather/file-text.svg',
      tooltip: 'Engaging and SEO-optimized website copy',
      details: [
        'We create compelling website content that engages visitors and drives conversions.',
        'Our team crafts SEO-optimized copy to boost your site’s visibility on search engines.',
        'We tailor content to reflect your brand voice, ensuring consistency across all pages.',
        'Our writing highlights your unique value proposition to differentiate you from competitors.',
        'We produce clear, concise, and persuasive text for homepages, about pages, and service sections.',
        'Our process includes keyword research and competitor analysis for strategic content planning.',
        'We provide revisions to ensure your website content perfectly aligns with your goals.',
      ],
      tools: 'Google Docs, SEMrush, Ahrefs, Grammarly, Yoast SEO',
    },
    {
      name: 'Blog Writing',
      icon: 'https://nutz.in/assets/feather/edit-3.svg',
      tooltip: 'Informative and audience-focused blog posts',
      details: [
        'We deliver high-quality blog posts that establish your authority and attract organic traffic.',
        'Our writers create engaging, informative content tailored to your audience’s interests.',
        'We optimize blogs with targeted keywords to improve search engine rankings.',
        'Our team researches trending topics and industry insights to keep your content fresh and relevant.',
        'We include compelling calls-to-action to encourage reader interaction and conversions.',
        'Our blog writing services offer consistent posting schedules to build audience loyalty.',
        'We provide content calendars and editorial support to streamline your blogging strategy.',
      ],
      tools: 'WordPress, Google Analytics, BuzzSumo, Hemingway Editor, Trello',
    },
    {
      name: 'Copywriting',
      icon: 'https://nutz.in/assets/feather/type.svg',
      tooltip: 'Persuasive copy for ads and campaigns',
      details: [
        'We craft persuasive copy for ads, emails, and landing pages that drives action.',
        'Our team writes attention-grabbing headlines and slogans to capture your audience instantly.',
        'We create emotionally resonant copy that connects with your target market.',
        'Our copywriting is optimized for conversions, turning prospects into customers.',
        'We adapt tone and style to suit various platforms, from social media to print campaigns.',
        'Our process includes A/B testing recommendations to refine messaging effectiveness.',
        'We deliver concise, impactful copy that aligns with your marketing objectives.',
      ],
      tools: 'Google Ads, Mailchimp, Canva, Surfer SEO, Copyscape',
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tools.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container section-mobileview" style={{ paddingTop: '12rem', paddingBottom: '6rem', background: 'linear-gradient(135deg, #eef2f7 0%, #ffffff 100%)' }}>
      <div className="text-center mb-6" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#1a2a3c', textShadow: '0 3px 6px rgba(0,0,0,0.15)' }}>Content Writing</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search services or tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.75rem 1.5rem', width: '100%', maxWidth: '500px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {filteredServices.length > 0 ? filteredServices.map((service, index) => (
          <div key={index} className="service-card" style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', cursor: 'pointer' }} onClick={() => openModal(service)}>
            <div className="flex items-center">
              <img src={service.icon} alt={service.name} style={{ width: '48px', height: '48px', marginRight: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#1a2a3c' }}>{service.name}</h3>
            </div>
          </div>
        )) : <p style={{ textAlign: 'center', width: '100%' }}>No services found.</p>}
      </div>

      {modalContent && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', maxWidth: '600px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#1a2a3c' }}>{modalContent.name}</h3>
              <button onClick={closeModal} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
            </div>
            <ul style={{ padding: '1rem 0' }}>
              {modalContent.details.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '1.25rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#3454f2' }}>•</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ background: '#f0f4ff', padding: '1rem', borderLeft: '4px solid #3454f2', borderRadius: '6px', fontWeight: 500 }}>
              Tools and Technologies: {modalContent.tools}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContentWriting;