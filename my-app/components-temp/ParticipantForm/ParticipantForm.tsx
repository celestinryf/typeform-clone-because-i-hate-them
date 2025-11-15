'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  concerns: string;
  hours: string;
  division: string;
  shirtSize: string;
  dietary: string;
};

export default function RegistrationForm() {
  const [pg, setPg] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [d, setD] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    concerns: '',
    hours: '',
    division: '',
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

  function upd<K extends keyof FormData>(k: K, v: FormData[K]) {
    setD((old) => ({
      ...old,
      [k]: v,
    }));
  }

  function valid() {
    switch (pg) {
      case 1:
        return d.firstName && d.lastName && d.email && d.company;
      case 3:
        return d.hours !== '';
      case 4:
        return d.division !== '';
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
      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL!, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          company: d.company,
          concerns: d.concerns,
          hours: d.hours,
          division: d.division,
          shirtSize: d.shirtSize,
          dietary: d.dietary,
          timestamp: new Date().toISOString(),
        }),
      });

      // With no-cors, we can't read the response, so we assume success
      console.log('Form submitted:', d);
      nxt(); // Move to success page
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const faded = { animation: 'fadeIn .25s ease-out' };

  // Handle Enter key
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
        {/* Progress Bar relative to form */}
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
              background: '#378',
              width: ((pg + 1) / t) * 100 + '%',
              transition: 'width .2s',
            }}
          ></div>
        </div>

        {/* PAGE 0 */}
        {pg === 0 && (
          <div style={faded}>
            <h1 style={{ fontSize: '28px', color: '#7dbaff', marginBottom: '10px' }}>Hi!</h1>
            <p style={{ fontSize: '18px' }}>Complete this form to register for UHackathon @ UWT 2026</p>
            <div style={{ opacity: 0.6, marginTop: '10px' }}>join the discord: discord.gg/FUhmBsn2Ew</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={nxt}
                style={{
                  marginTop: '25px',
                  marginBottom: '10px',
                  padding: '12px 20px',
                  background: '#356',
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
            <div style={{ fontSize: '12px', opacity: 0.4 }}>takes around 30 seconds</div>
          </div>
        )}

        {/* PAGE 1 */}
        {pg === 1 && (
          <div style={{ ...faded, textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', margin: '10px 0' }}>
              help us remember you! <span style={{ color: 'red' }}>*</span>
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                placeholder="first"
                value={d.firstName}
                onChange={(e) => upd('firstName', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="last"
                value={d.lastName}
                onChange={(e) => upd('lastName', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="email"
                value={d.email}
                onChange={(e) => upd('email', e.target.value)}
                style={{ background: '#222', border: '1px solid #333', padding: '10px', color: '#ccc' }}
              />
              <input
                placeholder="company or university"
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
                  background: valid() ? '#357' : '#222',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center',
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
            <h2 style={{ fontSize: '22px' }}>do you have any concerns about the event?</h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Time, location, judging, etc.</p>
            <textarea
              value={d.concerns}
              onChange={(e) => upd('concerns', e.target.value)}
              placeholder="write something"
              style={{
                width: '100%',
                height: '120px',
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
                  justifyContent: 'center',
                  cursor: 'pointer',
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
              6 hours or 24 hours? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Would you rather stay only Sat? or Sat + Sun?</p>

            {['6 hours', '24 hours'].map((val) => (
              <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="hours"
                  value={val}
                  checked={d.hours === val}
                  onChange={(e) => upd('hours', e.target.value)}
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
                  justifyContent: 'center',
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
              division? <span style={{ color: 'red' }}>*</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              D1: 125% (larger) prizes. For those more experienced
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              D2: 100% (smaller) prizes. For the less experienced
            </p>

            {['D1', 'D2'].map((val) => (
              <label key={val} style={{ display: 'block', marginTop: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="div"
                  value={val}
                  checked={d.division === val}
                  onChange={(e) => upd('division', e.target.value)}
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
                  justifyContent: 'center',
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
            <h2 style={{ fontSize: '22px' }}>
              shirt size? <span style={{ color: 'red' }}>*</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              {['S', 'M', 'L', 'XL'].map((z) => (
                <label key={z} style={{ background: '#222', padding: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value={z}
                    checked={d.shirtSize === z}
                    onChange={(e) => upd('shirtSize', e.target.value)}
                  />{' '}
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
                  justifyContent: 'center',
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
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>thank you for supporting UHackathon!</h2>
            <p>We can't wait to see you in April!</p>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "I just registered for UHackathon @ UWT 2026! Can't wait! 🚀"
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
                  transition: 'transform 0.2s',
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
                  transition: 'transform 0.2s',
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
                  transition: 'transform 0.2s',
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