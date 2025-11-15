"use client";

export default function TracksSection() {
  const tracks = [
    {
      icon: "🔧",
      color: "#a8e6cf",
      darkColor: "#56ab91",
      division: 1,
      title: "The Inventor",
      tagline: "I play out of the sandbox, always innovating, and ideating something new.",
      description: "Some problems need a bold idea, and an even bolder build. This track is your playground for innovation! The most unconventional ideas are welcome, as long as they're solving real problems.",
      fullDescription: "Whether you're pushing the boundaries of AI or pioneering something new, connect imagination with technical ingenuity. The Inventor champions projects that embrace experimentation, harness emerging technologies, and challenge the norm.",
      topics: "Artificial Intelligence, AR/VR/XR, Quantum Computing, Blockchain, Web3, Biotechnology, Robotics, Cybersecurity, Space Exploration, etc."
    },
    {
      icon: "🌱",
      color: "#dcc6e0",
      darkColor: "#9b7ea6",
      division: 2,
      title: "The Advocate",
      tagline: "My blanket forts welcome all, where playing together means growing together.",
      description: "Powerful solutions bring us closer and help us thrive. This track celebrates technology's role in strengthening our ties to each other, our communities, and the world around us, while also empowering ourselves.",
      fullDescription: "It's human-centered and fosters belonging, bridges gaps, and unlocks personal and collective growth. The Advocate builds tools that unite, uplift, and drive positive, lasting change.",
      topics: "Friendship, Mental & Physical Wellness, Peer-to-Peer Interactions, Neighborhoods, Homelessness, Activism, Civic Technology, Learning, Sustainability, Education, Childhood Development, Environment, Climate Change, etc."
    }
  ];

  return (
    <section id="tracks" style={{ padding: '80px 20px', backgroundColor: '#d4f1f4', textAlign: 'center', paddingBottom: '200px' }}>
      <style>{`
        .card-container {
          perspective: 1000px;
          width: 100%;
          max-width: 450px;
          height: 40vw;
        }
        
        .card-flipper {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .card-container:hover .card-flipper {
          transform: rotateY(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .card-front {
          background: var(--card-color);
        }
        
        .card-back {
          background: var(--card-color);
          transform: rotateY(180deg);
          overflow-y: auto;
          justify-content: flex-start;
          gap: 20px;
        }
        
        .card-banner {
          background: var(--dark-color);
          color: white;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 20px 0;
        }
        
        .card-icon {
          font-size: 80px;
          margin: 20px 0;
        }
        
        .card-title {
          font-size: 32px;
          font-weight: bold;
          color: #1a1a2e;
          margin: 20px 0 12px 0;
        }
        
        .card-tagline {
          font-size: 20px;
          color: #2a2a3e;
          line-height: 1.5;
          font-weight: 400;
          font-family: 'Helvetica', sans-serif;
        }
        
        .card-back-header {
          text-align: left;
        }
        
        .card-back-content {
          text-align: left;
          font-size: 16px;
          line-height: 1.6;
          color: #2a2a3e;
        }
        
        .card-back-content p {
          margin: 12px 0;
        }
        
        .card-back-content strong {
          color: #1a1a2e;
        }
        
        .topics-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .topics-title {
          font-style: italic;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1a1a2e;
        }
        
        .topics-list {
          font-style: italic;
          color: #3a3a4e;
          line-height: 1.5;
        }
        
        @media (max-width: 968px) {
          .tracks-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .card-container {
            max-width: 380px;
            height: 500px;
          }
          
          .card-title {
            font-size: 28px;
          }
          
          .card-icon {
            font-size: 60px;
          }
        }
      `}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 60px auto', textAlign: 'left' }}>
        <h2 style={{ fontSize: '3vw', marginBottom: '0px', color: '#16213e', fontWeight: 'bold' }}>
          Tracks
        </h2>
        <p style={{ fontSize: '1.5vw', color: '#16213e', marginBottom: '50px' }}>
          Participants will have the opportunity to create projects based on their skillset with ranked tracks:
        </p>
      </div>
      
      <div 
        className="tracks-grid"
        style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, minmax(320px, 450px))', 
        gap: '40px', 
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {tracks.map(track => (
          <div 
            key={track.title}
            className="card-container"
            style={{
              ['--card-color' as any]: track.color,
              ['--dark-color' as any]: track.darkColor
            }}
          >
            <div className="card-flipper">
              {/* Front of card */}
              <div className="card-face card-front">
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card-banner">DIVISION {track.division}</div>
                  <div className="card-icon">{track.icon}</div>
                  <div className="card-title">{track.title}</div>
                  <div className="card-tagline">{track.tagline}</div>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="card-face card-back">
                <div className="card-back-header">
                  <div className="card-banner">DIVISION {track.division}</div>
                </div>
                
                <div className="card-back-content">
                  <p><strong>{track.description}</strong></p>
                  <p>{track.fullDescription}</p>
                  
                  <div className="topics-section">
                    <div className="topics-title">Topics to Consider:</div>
                    <div className="topics-list">{track.topics}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}