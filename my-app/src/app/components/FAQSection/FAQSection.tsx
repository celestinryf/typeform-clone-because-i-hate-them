"use client";

import { useState } from 'react';

export default function FAQSection() {
  const leftColumnFaqs = [
    {
      question: "What is a hackathon?",
      answer: "A hackathon is an event where students come together to build creative projects over a short period of time. It's a great opportunity to learn new skills, meet other developers, and bring your ideas to life!"
    },
    {
      question: "When do applications close?",
      answer: "Applications close on [date]. Make sure to submit your application before the deadline!"
    },
    {
      question: "Is attending DubHacks free?",
      answer: "Yes! Attending DubHacks is completely free. We provide meals, snacks, and swag throughout the event."
    },
    {
      question: "How big are the teams? Can I apply as a team?",
      answer: "Teams can be up to 4 people. You can apply individually and form teams at the event, or apply as a pre-formed team."
    },
    {
      question: "Do I have to select a track for my project?",
      answer: "No, tracks are optional! You can choose to submit your project to a specific track or compete in the general category."
    },
    {
      question: "What will I eat?",
      answer: "We'll provide breakfast, lunch, dinner, and snacks throughout the event. Dietary restrictions will be accommodated."
    },
    {
      question: "What if I need special accommodations?",
      answer: "Please let us know in your application or email us at [email] and we'll do our best to accommodate your needs."
    },
    {
      question: "Does DubHacks offer travel reimbursement?",
      answer: "Travel reimbursement information will be provided to accepted participants."
    },
    {
      question: "I haven't heard back about my application!",
      answer: "Decisions are sent out in waves. If you haven't heard back yet, please be patient! You can email us at [email] if you have concerns."
    }
  ];

  const rightColumnFaqs = [
    {
      question: "Am I eligible to attend?",
      answer: "All current college and university students are eligible to attend, regardless of major or experience level!"
    },
    {
      question: "Is DubHacks fully in-person this year?",
      answer: "Yes, DubHacks will be fully in-person this year at [location]."
    },
    {
      question: "What if I don't know how to code?",
      answer: "That's okay! Hackathons are for everyone. We'll have workshops and mentors to help you learn. Many successful projects combine coding with design, business, and other skills."
    },
    {
      question: "Do I have to submit a project if I attend?",
      answer: "No! While we encourage everyone to submit a project, it's not required. You can attend workshops, network, and learn without submitting."
    },
    {
      question: "Are we allowed to build on past projects?",
      answer: "All code must be written during the hackathon. However, you can use existing APIs, libraries, and frameworks."
    },
    {
      question: "Is sleeping space provided?",
      answer: "Yes, we'll have designated quiet spaces for sleeping. Bring a sleeping bag and pillow if you plan to stay overnight!"
    },
    {
      question: "What is the code of conduct?",
      answer: "All participants must follow the MLH Code of Conduct. We're committed to providing a safe and inclusive environment for everyone."
    },
    {
      question: "What's the difference between the priority application and the regular application?",
      answer: "Priority applications are reviewed first and receive earlier admission decisions. Regular applications are reviewed after the priority deadline."
    },
    {
      question: "404: Question Not Found",
      answer: "Can't find what you're looking for? Email us at [email] and we'll help you out!"
    }
  ];

  return (
    <section id="faq" style={{ 
      padding: '80px 20px', 
      backgroundColor: '#2d4059', 
      minHeight: '100vh' 
    }}>
      <h2 style={{ 
        fontSize: '64px', 
        fontWeight: '700',
        marginBottom: '20px', 
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: '2px'
      }}>
        FAQs
      </h2>
      
      <p style={{
        fontSize: '24px',
        color: '#e8e8e8',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        Questions? Explore some answers below
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        gap: '40px',
        padding: '0 40px'
      }}>
        <div>
          {leftColumnFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div>
          {rightColumnFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      paddingBottom: '20px',
      marginBottom: '20px'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: '400',
          textAlign: 'left',
          cursor: 'pointer',
          padding: '8px 0',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <span>{question}</span>
        <span style={{ 
          fontSize: '14px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          marginLeft: '12px'
        }}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div style={{
          marginTop: '16px',
          fontSize: '16px',
          color: '#d0d0d0',
          lineHeight: '1.6',
          paddingRight: '20px'
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}