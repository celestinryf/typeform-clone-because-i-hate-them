'use client';

import { useState } from 'react';
import { Users, Scale, HandHeart } from 'lucide-react';
import RegistrationForm from '../ParticipantForm/ParticipantForm';
import JudgeForm from '../JudgeForm/JudgeForm';
import VolunteerForm from '../VolunteerForm/VolunteerForm';

type FormType = 'participant' | 'judge' | 'volunteer' | null;

export default function FormSelector() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null);

  const handleCardClick = (formType: FormType) => {
    setSelectedForm(formType);
  };

  const cards = [
    {
      type: 'participant' as FormType,
      title: 'Participant',
      icon: Users,
      color: '#357',
    },
    {
      type: 'judge' as FormType,
      title: 'Judge',
      icon: Scale,
      color: '#375',
    },
    {
      type: 'volunteer' as FormType,
      title: 'Volunteer',
      icon: HandHeart,
      color: '#537',
    },
  ];

  // Render participant form
  if (selectedForm === 'participant') {
    return <RegistrationForm />;
  }

  // Render judge form
  if (selectedForm === 'judge') {
    return <JudgeForm />;
  }

  // Render volunteer form
  if (selectedForm === 'volunteer') {
    return <VolunteerForm />;
  }

  // Render card selector
  return (
    <section
        id="form"
      style={{
        minHeight: '100vh',
        background: '#111',
        color: '#ccc',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%', maxWidth: '690px', paddingTop: '10px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', color: '#7dbaff', marginBottom: '10px' }}>
            UHackathon @ UWT 2026
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Choose your registration type</p>
          <div style={{ opacity: 0.6, fontSize: '14px' }}>
            join the discord: discord.gg/FUhmBsn2Ew
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.type}
                onClick={() => handleCardClick(card.type)}
                style={{
                  background: '#222',
                  border: '1px solid #333',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  aspectRatio: '1',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#282828';
                  e.currentTarget.style.borderColor = '#444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#222';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <div
                  style={{
                    background: card.color,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={40} color="#fff" />
                </div>
                <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>
                  {card.title}
                </h2>
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '12px',
            opacity: 0.4,
          }}
        >
          questions? contact us at uhackathon@uwt.edu
        </div>
      </div>
    </section>
  );
}