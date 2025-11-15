"use client";

import BigName from '../BigName/BigName';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, #6b0f1a, #b91372)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'left', alignSelf: 'flex-end', marginRight: '20%', marginTop: '20%' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#f0e6f6' }}>
          April 18 - 19, 2026
        </h2>
        <p style={{ fontSize: '19px', color: '#f0e6f6' }}>
          University of Washington, Tacoma
        </p>
      </div>

      <div style={{ width: "100%", position: "absolute", bottom: "0" }}>
        <BigName names={["UHACKATHON"]} speed={80} className="text-white" />
      </div>
    </section>
  );
}
