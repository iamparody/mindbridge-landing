import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const stats = [
  { value: 24, suffix: '/7', label: 'Emergency access' },
  { value: 90, suffix: 's', label: 'Peer escalation window' },
  { value: 2, suffix: '', label: 'Free starter credits' },
  { value: 0, suffix: '', label: 'Identity exposure by default' },
];

const modules = [
  {
    kicker: 'Peer support',
    title: 'Anonymous text and voice help',
    body: 'Members can request support without exposing names, numbers, or personal identity. If no one responds quickly, the system escalates.',
  },
  {
    kicker: 'AI companion',
    title: 'Supportive, bounded, never clinical',
    body: 'The AI layer is designed for reflection and emotional support, with hard guardrails against diagnosis, prescriptions, and unsafe advice.',
  },
  {
    kicker: 'Self-care tools',
    title: 'Journals, moods, resources, breathing',
    body: 'Daily check-ins and structured reflection create a gentle routine while keeping emergency and calming tools free.',
  },
  {
    kicker: 'Referral path',
    title: 'Bridge to qualified professionals',
    body: 'When a user needs more than peer or AI support, MindBridge routes a structured therapist referral for human follow-up.',
  },
];

const safety = [
  'Risk classifier checks journal and AI text before harm can hide in the flow.',
  'Critical language pushes users toward emergency support immediately.',
  'Admin queues receive emergency, peer timeout, risk, report, and referral signals.',
  'PII is minimized, sensitive contacts are encrypted, and deletion is user-controlled.',
];

const faqs = [
  {
    q: 'Is MindBridge a medical service?',
    a: 'No. MindBridge is a mental health support and referral platform. It does not diagnose, prescribe, or replace professional care.',
  },
  {
    q: 'Why anonymity first?',
    a: 'Stigma is one of the biggest access barriers. Alias-first interaction lowers the threshold for asking for help while protecting users in peer spaces.',
  },
  {
    q: 'What makes it safety-first?',
    a: 'Safety is built into the architecture: risk classification, emergency routing, escalation logs, admin queues, consent, encryption, and data deletion workflows.',
  },
  {
    q: 'Why is it built for Kenya?',
    a: 'MindBridge is shaped around local crisis resources, mobile-first access, familiar payment habits, and low-cost peer support that can work beyond major cities.',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function CountUp({ value, suffix }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCurrent(value);
      return undefined;
    }

    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const duration = 1100;

      const tick = (time) => {
        const progress = Math.min((time - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      observer.disconnect();
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

function ProductPhone() {
  return (
    <div className="phone-shell" aria-label="MindBridge product preview">
      <div className="phone-top">
        <span>9:41</span>
        <span>MindBridge</span>
      </div>
      <div className="mood-orb">
        <span className="orb-face"> calm </span>
      </div>
      <div className="phone-card active">
        <span>Today</span>
        <strong>You showed up. That counts.</strong>
      </div>
      <div className="phone-grid">
        <span>Peer</span>
        <span>AI</span>
        <span>Journal</span>
        <span className="danger">Emergency</span>
      </div>
    </div>
  );
}

function SystemMap() {
  return (
    <div className="system-map" aria-label="MindBridge care system diagram">
      <div className="system-node center">User</div>
      <div className="system-node n1">AI companion</div>
      <div className="system-node n2">Peer help</div>
      <div className="system-node n3">Journal</div>
      <div className="system-node n4">Safety plan</div>
      <div className="system-node n5">Referral</div>
      <div className="system-node n6">Emergency</div>
    </div>
  );
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button type="button" onClick={() => setOpen((next) => !next)}>
        <span>{item.q}</span>
        <span aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

function App() {
  useReveal();

  const readiness = useMemo(
    () => ['Kenya-first', 'Mobile-first', 'Anonymous by default', 'Safety tested'],
    [],
  );

  return (
    <main>
      <section className="hero">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <nav className="nav hero-rise">
          <div className="brand">MindBridge</div>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-rise delay-1">Anonymous support infrastructure</p>
            <h1 className="hero-rise delay-2">
              Mental health support that meets people before the waiting list.
            </h1>
            <p className="hero-text hero-rise delay-3">
              MindBridge is a mobile-first platform for Kenya, combining anonymous peer support,
              bounded AI companionship, structured self-care, professional referral, and emergency
              escalation in one safety-first system.
            </p>
            <div className="readiness-row hero-rise delay-4">
              {readiness.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual hero-rise delay-3">
            <ProductPhone />
            <div className="floating-note note-one">
              <strong>AI is not a clinician</strong>
              <span>Boundaries are server-side, not cosmetic.</span>
            </div>
            <div className="floating-note note-two">
              <strong>Emergency never paywalled</strong>
              <span>Befrienders Kenya and in-app support stay visible.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" data-reveal>
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>
              <CountUp value={stat.value} suffix={stat.suffix} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="split-section problem">
        <div data-reveal>
          <p className="eyebrow">The access gap</p>
          <h2>In distress, people need a first step that is private, immediate, and affordable.</h2>
        </div>
        <div className="copy-stack" data-reveal>
          <p>
            Mental health support in Kenya remains expensive, concentrated in urban centres, and
            difficult to seek without stigma. MindBridge is designed for the moment before formal
            care becomes reachable.
          </p>
          <p>
            The platform does not pretend peer support or AI is therapy. It creates a safer bridge:
            someone to talk to, tools to regulate, and clear escalation when risk rises.
          </p>
        </div>
      </section>

      <section className="modules">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Product system</p>
          <h2>One calm surface, multiple paths to support.</h2>
        </div>

        <div className="module-grid">
          {modules.map((module, index) => (
            <article className="module-card" data-reveal key={module.title} style={{ '--delay': `${index * 90}ms` }}>
              <span>{module.kicker}</span>
              <h3>{module.title}</h3>
              <p>{module.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="safety-section">
        <div className="safety-panel" data-reveal>
          <div>
            <p className="eyebrow">Safety architecture</p>
            <h2>Safety is not a feature layer. It is the product logic.</h2>
            <p>
              MindBridge treats care, privacy, and escalation as core infrastructure. Every high-risk
              path has an explicit handoff, log, or boundary.
            </p>
          </div>
          <ul>
            {safety.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="africa-section">
        <div className="map-wrap" data-reveal>
          <SystemMap />
        </div>
        <div className="copy-stack" data-reveal>
          <p className="eyebrow">Built for Kenya, shaped for scale</p>
          <h2>Private, familiar, and affordable support for everyday access.</h2>
          <p>
            MindBridge is designed around how people already live and seek help: mobile-first,
            anonymous by default, affordable enough for regular use, and clear about what remains
            free in moments of distress.
          </p>
        </div>
      </section>

      <section className="experience-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Experience</p>
          <h2>The interface is quiet because the user may not be.</h2>
        </div>
        <div className="experience-grid" data-reveal>
          <div className="journal-card">
            <span>Journal</span>
            <p>Write freely. If risk appears, the system notices without turning reflection into surveillance theatre.</p>
          </div>
          <div className="chat-card">
            <span>AI Companion</span>
            <p>I can sit with you in this moment. I cannot diagnose you, but I can help you slow down and choose a next step.</p>
          </div>
          <div className="emergency-card">
            <span>Emergency</span>
            <strong>You are not alone.</strong>
            <p>Befrienders Kenya: 0800 723 253</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Questions judges may ask</p>
          <h2>Clear boundaries build trust.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((item, index) => (
            <FaqItem item={item} index={index} key={item.q} />
          ))}
        </div>
      </section>

      <footer>
        <div className="brand">MindBridge</div>
        <p>
          MindBridge is a mental health support platform, not a medical service. In an emergency,
          users should contact local emergency services or Befrienders Kenya.
        </p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
