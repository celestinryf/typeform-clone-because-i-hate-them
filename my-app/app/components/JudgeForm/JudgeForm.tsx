'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

type JudgeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  expertise: string;
  experience: string;
  availability: string;
  motivation: string;
  linkedIn: string;
};

export default function JudgeForm() {
  const [pg, setPg] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [d, setD] = useState<JudgeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    expertise: '',
    experience: '',
    availability: '',
    motivation: '',
    linkedIn: '',
  });

  const t = 7;

  function nxt() {
    if (pg < t - 1) setPg(pg + 1);
  }

  function bak() {
    if (pg > 0) setPg(pg - 1);
  }

  function upd<K extends keyof JudgeFormData>(k: K, v: JudgeFormData[K]) {
    setD((old) => ({
      ...old,
      [k]: v,
    }));
  }

  function valid() {
    switch (pg) {
      case 1:
        return d.firstName && d.lastName && d.email && d.company;
      case 2:
        return d.expertise !== '';
      case 3:
        return d.experience !== '';
      case 4:
        return d.availability !== '';
      default:
        return true;
    }
  }

  async function sub() {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_JUDGE_SHEETS_URL!, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          company: d.company,
          expertise: d.expertise,
          experience: d.experience,
          availability: d.availability,
          motivation: d.motivation,
          linkedIn: d.linkedIn,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Judge form submitted:', d);
      nxt();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const faded = { animation: 'fadeIn .25s ease-out' };

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (pg === 5 && !isSubmitting) sub();
        else if (valid()) nxt();
      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [pg, d, isSubmitting]);

  return (
    <div
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
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '4px',
            background: '#333',
            overflow: 'hidden',
            zIndex: 100,
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#738',
              width: ((pg + 1) / t) * 100 + '%',
              transition: 'width .2s',
            }}
          ></div>
        </div>

        {/* PAGE 0 */}
        {pg === 0 && (
          <div style={faded}>
            <h1 style={{ fontSize: '28px', color: '#b97dff', marginBottom: '10px' }}>Judge Application</h1>
            <p style={{ fontSize: '18px' }}>Help us evaluate amazing projects at UHackathon @ UWT 2026</p>
            <div style={{ opacity: 0.6, marginTop: '10px' }}>join the discord: discord.gg/FUhmBsn2Ew</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={nxt}
                style={{
                  marginTop: '25px',
                  marginBottom: '10px',
                  padding: '12px 20px',
                  background: '#536',
                  color: '#fff',
                  border: '1px solid #424',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                start <ChevronRight size={18} />
              </button>
            </div>
            <div style={{ fontSize: '12px', opacity: 0.4 }}>takes around 1 minute</div>
          </div>
        )}

        {/* PAGE 1 */}
        {pg === 1 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', margin: '10px 0' }}>
              let's get to know you! <span style={{ color: 'red' }}>*</span>
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                placeholder="first name"
                value={d.firstName}
                onChange={(e) => upd('firstName', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="last name"
                value={d.lastName}
                onChange={(e) => upd('lastName', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="email"
                type="email"
                value={d.email}
                onChange={(e) => upd('email', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="company or organization"
                value={d.company}
                onChange={(e) => upd('company', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={bak}
                style={{ padding: '8px 16px', border: '1px solid #444', background: 'none', color: '#999', cursor: 'pointer' }}
              >
                back
              </button>
              <button
                disabled={!valid()}
                onClick={nxt}
                style={{
                  padding: '8px 16px',
                  paddingRight: '12px',
                  background: valid() ? '#537' : '#222',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: valid() ? 'pointer' : 'not-allowed',
                }}
              >
                ok <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2 */}
        {pg === 2 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '22px' }}>
              what's your area of expertise? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              e.g., Web Development, AI/ML, Hardware, Design, etc.
            </p>
            <textarea
              value={d.expertise}
              onChange={(e) => upd('expertise', e.target.value)}
              placeholder="tell us what you're good at"
              style={{
                width: '100%',
                height: '100px',
                background: '#222',
                border: '1px solid #333',
                marginTop: '10px',
                color: '#ccc',
                padding: '10px',
              }}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={bak}
                style={{ padding: '8px 16px', border: '1px solid #444', background: 'none', color: '#999', cursor: 'pointer' }}
              >
                back
              </button>
              <button
                disabled={!valid()}
                onClick={nxt}
                style={{
                  padding: '8px 16px',
                  paddingRight: '12px',
                  background: valid() ? '#537' : '#222',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: valid() ? 'pointer' : 'not-allowed',
                }}
              >
                ok <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 3 */}
        {pg === 3 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '22px' }}>
              years of experience? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Professional or hobbyist experience in tech
            </p>

            {['0-2 years', '3-5 years', '6-10 years', '10+ years'].map((val) => (
              <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="experience"
                  value={val}
                  checked={d.experience === val}
                  onChange={(e) => upd('experience', e.target.value)}
                />{' '}
                {val}
              </label>
            ))}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={bak}
                style={{ padding: '8px 16px', border: '1px solid #444', background: 'none', color: '#999', cursor: 'pointer' }}
              >
                back
              </button>
              <button
                disabled={!valid()}
                onClick={nxt}
                style={{
                  padding: '8px 16px',
                  paddingRight: '12px',
                  background: valid() ? '#537' : '#222',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: valid() ? 'pointer' : 'not-allowed',
                }}
              >
                ok <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 4 */}
        {pg === 4 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '22px' }}>
              when are you available? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Judging typically happens on Sunday afternoon
            </p>

            {['Saturday afternoon', 'Sunday afternoon', 'Both days', 'Flexible'].map((val) => (
              <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="availability"
                  value={val}
                  checked={d.availability === val}
                  onChange={(e) => upd('availability', e.target.value)}
                />{' '}
                {val}
              </label>
            ))}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={bak}
                style={{ padding: '8px 16px', border: '1px solid #444', background: 'none', color: '#999', cursor: 'pointer' }}
              >
                back
              </button>
              <button
                disabled={!valid()}
                onClick={nxt}
                style={{
                  padding: '8px 16px',
                  paddingRight: '12px',
                  background: valid() ? '#537' : '#222',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: valid() ? 'pointer' : 'not-allowed',
                }}
              >
                ok <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 5 */}
        {pg === 5 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '22px' }}>why do you want to judge?</h2>
            <textarea
              value={d.motivation}
              onChange={(e) => upd('motivation', e.target.value)}
              placeholder="share your motivation..."
              style={{
                width: '100%',
                height: '100px',
                background: '#222',
                border: '1px solid #333',
                marginTop: '10px',
                color: '#ccc',
                padding: '10px',
              }}
            />
            <h2 style={{ fontSize: '22px', marginTop: '20px' }}>LinkedIn or portfolio (optional)</h2>
            <input
              placeholder="https://linkedin.com/in/yourprofile"
              value={d.linkedIn}
              onChange={(e) => upd('linkedIn', e.target.value)}
              style={{ marginTop: '10px', background: '#222', border: '1px solid #333', padding: '10px', width: '100%', color: '#ccc' }}
            />
            {submitError && (
              <div style={{ marginTop: '10px', color: '#f44', fontSize: '14px' }}>
                {submitError}
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={bak}
                disabled={isSubmitting}
                style={{ padding: '8px 16px', border: '1px solid #444', background: 'none', color: '#999', cursor: 'pointer' }}
              >
                back
              </button>
              <button
                onClick={sub}
                disabled={isSubmitting}
                style={{
                  padding: '8px 16px',
                  background: isSubmitting ? '#222' : '#537',
                  color: '#fff',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  border: 'none',
                }}
              >
                {isSubmitting ? 'submitting...' : 'submit'}
              </button>
            </div>
            <div style={{ opacity: 0.3, marginTop: '6px' }}>cmd+enter</div>
          </div>
        )}

        {/* PAGE 6 */}
        {pg === 6 && (
          <div style={{ ...faded, textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>thank you for applying to judge!</h2>
            <p>We'll be in touch soon with more details.</p>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "I just applied to judge at UHackathon @ UWT 2026! 🎯"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#1DA1F2',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                <Twitter size={20} />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://uhackathon-uwt.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#0077B5',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}