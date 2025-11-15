"use client";

import uhackstats from '../../../public/assets/uhackstats.png';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: "130vh",
        padding: "0",
        margin: "0",
        backgroundImage: `url(${uhackstats.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Light pink tint overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        //   backgroundColor: "rgba(255, 200, 220, 0.25)",
          zIndex: 0,
        }}
      />
    </section>
  );
}
