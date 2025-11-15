'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

type VolunteerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  availability: string[];
  interests: string[];
  experience: string;
  shirtSize: string;
  dietary: string;
};

export default function VolunteerForm() {
  const [pg, setPg] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [d, setD] = useState<VolunteerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    availability: [],
    interests: [],
    experience: '',
    shirtSize: '',
    dietary: '',
  });

  const t = 8;

  function nxt() {
    if (pg < t - 1) setPg(pg + 1);
  }

  function bak() {
    if (pg > 0) setPg(pg - 1);
  }

  function upd<K extends keyof VolunteerFormData>(k: K, v: VolunteerFormData[K]) {
    setD((old) => ({
      ...old,
      [k]: v,
    }));
  }

  function toggleArray(key: 'availability' | 'interests', value: string) {
    setD((old) => {
      const arr = old[key];
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...old, [key]: newArr };
    });
  }

  function valid() {
    switch (pg) {
      case 1:
        return d.firstName && d.lastName && d.email && d.school;
      case 2:
        return d.availability.length > 0;
      case 3:
        return d.interests.length > 0;
      case 5:
        return d.shirtSize !== '';
      default:
        return true;
    }
  }

  async function sub() {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_VOLUNTEER_SHEETS_URL!, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          school: d.school,
          availability: d.availability.join(', '),
          interests: d.interests.join(', '),
          experience: d.experience,
          shirtSize: d.shirtSize,
          dietary: d.dietary,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Volunteer form submitted:', d);
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
        if (pg === 6 && !isSubmitting) sub();
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
              background: '#387',
              width: ((pg + 1) / t) * 100 + '%',
              transition: 'width .2s',
            }}
          ></div>
        </div>

        {/* PAGE 0 */}
        {pg === 0 && (
          <div style={faded}>
            <h1 style={{ fontSize: '28px', color: '#7dffb9', marginBottom: '10px' }}>Volunteer!</h1>
            <p style={{ fontSize: '18px' }}>Help make UHackathon @ UWT 2026 amazing</p>
            <div style={{ opacity: 0.6, marginTop: '10px' }}>join the discord: discord.gg/FUhmBsn2Ew</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={nxt}
                style={{
                  marginTop: '25px',
                  marginBottom: '10px',
                  padding: '12px 20px',
                  background: '#365',
                  color: '#fff',
                  border: '1px solid #244',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                start <ChevronRight size={18} />
              </button>
            </div>
            <div style={{ fontSize: '12px', opacity: 0.4 }}>takes around 45 seconds</div>
          </div>
        )}

        {/* PAGE 1 */}
        {pg === 1 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', margin: '10px 0' }}>
              who are you? <span style={{ color: 'red' }}>*</span>
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
                placeholder="school or company"
                value={d.school}
                onChange={(e) => upd('school', e.target.value)}
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
                  background: valid() ? '#357' : '#222',
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
              when are you available? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Select all that apply</p>

            {['Saturday morning', 'Saturday afternoon', 'Saturday evening', 'Sunday morning', 'Sunday afternoon'].map((val) => (
              <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={d.availability.includes(val)}
                  onChange={() => toggleArray('availability', val)}
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
                  background: valid() ? '#357' : '#222',
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
              what would you like to help with? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Select all that interest you</p>

            {['Event setup', 'Registration desk', 'Food & refreshments', 'Tech support', 'Social media', 'Photography', 'Cleanup'].map(
              (val) => (
                <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={d.interests.includes(val)}
                    onChange={() => toggleArray('interests', val)}
                  />{' '}
                  {val}
                </label>
              )
            )}

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
                  background: valid() ? '#357' : '#222',
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
            <h2 style={{ fontSize: '22px' }}>previous volunteer experience?</h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Optional - tell us about any related experience</p>
            <textarea
              value={d.experience}
              onChange={(e) => upd('experience', e.target.value)}
              placeholder="e.g., volunteered at hackathons, events, etc."
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
                onClick={nxt}
                style={{
                  padding: '8px 16px',
                  paddingRight: '12px',
                  background: '#357',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
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
            <h2 style={{ fontSize: '22px' }}>
              shirt size? <span style={{ color: 'red' }}>*</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              {['S', 'M', 'L', 'XL'].map((z) => (
                <label key={z} style={{ background: '#222', padding: '10px', cursor: 'pointer' }}>
                  <input type="radio" value={z} checked={d.shirtSize === z} onChange={(e) => upd('shirtSize', e.target.value)} />{' '}
                  {z}
                </label>
              ))}
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
                  background: valid() ? '#357' : '#222',
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

        {/* PAGE 6 */}
        {pg === 6 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '22px' }}>dietary restrictions?</h2>
            <input
              placeholder="vegan? allergic?"
              value={d.dietary}
              onChange={(e) => upd('dietary', e.target.value)}
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
                  background: isSubmitting ? '#222' : '#357',
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

        {/* PAGE 7 */}
        {pg === 7 && (
          <div style={{ ...faded, textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>thank you for volunteering!</h2>
            <p>We'll send you more details soon. You're awesome! 🎉</p>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "I just signed up to volunteer at UHackathon @ UWT 2026! 🙌"
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
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://uhackathon-uwt.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#4267B2',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                <Facebook size={20} />
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