import React, { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

/* ─────────────────────────────────────────────────────────────
   ★  THINGS TO FILL IN — search for  ★  throughout this file
   ─────────────────────────────────────────────────────────────
   1. YOUR_PUBLIC_KEY / YOUR_SERVICE_ID / YOUR_TEMPLATE_ID
      → https://emailjs.com (free)
   2. GITHUB_URL          → your GitHub profile URL
   3. LINKEDIN_URL        → your LinkedIn profile URL
   4. RESUME_URL          → direct link to your hosted PDF resume
                            (upload to Google Drive → "Anyone with link"
                             → use direct download link)
   5. Project githubUrl / liveUrl  → per project links
──────────────────────────────────────────────────────────────── */

/* ── EMAILJS ── */
const EMAILJS_PUBLIC_KEY = "vyMQqmwPjDnvszRRL"; /* ★ */
const EMAILJS_SERVICE_ID = "gmail_portfolio";
const EMAILJS_TEMPLATE_ID = "template_x5qutm8"; /* ★ */

/* ── PERSONAL LINKS ── */
const GITHUB_URL = "https://github.com/Petchimuthu1227";
const LINKEDIN_URL = "https://www.linkedin.com/in/petchimuthu-s-28314a370";
const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=1NbGgDeEU0XRXuJuStuVOcI8w4kWWemdh";
/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const SKILLS = [
  {
    name: "React.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "MongoDB",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    express: true,
  },
  {
    name: "MySQL",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "JavaScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "HTML5",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
];

const CONCEPTS = [
  "CRUD Operations",
  "State Management",
  "REST API Integration",
  "JWT Authentication",
  "MVC Architecture",
  "Responsive Design",
  "Database Integration",
  "RESTful API Design",
];

const TOOLS = ["Git", "GitHub", "VS Code", "Postman"];

const PROJECTS = [
  {
    num: "01",
    title: "Library Management System",
    badges: ["Full Stack", "JWT Auth", "REST API"],
    desc: "Developed a full-stack web application to manage books, users, and borrowing records. Implemented CRUD operations, issue/return tracking, and JWT-based authentication. Designed RESTful APIs and built a responsive user interface for efficient data handling.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    githubUrl: "https://github.com/YOUR_USERNAME/library-management" /* ★ */,
    liveUrl: "" /* ★ leave empty string "" if no live demo */,
  },
  {
    num: "02",
    title: "E-Commerce Web Application",
    badges: ["Full Stack", "E-Commerce", "Backend API"],
    desc: "Built a responsive e-commerce application with product listing and cart functionality. Implemented dynamic product views and smooth navigation. Integrated backend APIs for product management and data storage.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/YOUR_USERNAME/ecommerce-app" /* ★ */,
    liveUrl: "" /* ★ */,
  },
];

const STRENGTHS = [
  {
    icon: "🧠",
    text: "Strong analytical and problem-solving abilities that help break down complex technical challenges",
  },
  {
    icon: "⚡",
    text: "Quick learner with the ability to adapt to new technologies and development environments",
  },
  {
    icon: "🤝",
    text: "Strong communication and teamwork skills, able to collaborate effectively in a team",
  },
  {
    icon: "📅",
    text: "Effective time management and organizational skills for delivering projects on schedule",
  },
  {
    icon: "✨",
    text: "Ability to write clean, maintainable, and well-documented code following best practices",
  },
  {
    icon: "🚀",
    text: "Motivated self-starter eager to contribute to real-world projects and grow professionally",
  },
];

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useTypewriter(words, speed = 100) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const delay = deleting ? 60 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), 1500);
        else setCi(ci + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi((wi + 1) % words.length);
          setCi(0);
        } else setCi(ci - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [ci, wi, deleting, words, speed]);

  return display;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("pf-vis");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".pf-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ══════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════ */
const SendIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
function ProjectCard({ proj }) {
  const cardRef = useRef(null);
  const handleMove = useCallback((e) => {
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--mx",
      (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%",
    );
    cardRef.current.style.setProperty(
      "--my",
      (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%",
    );
  }, []);

  return (
    <div
      className="pf-proj-card pf-reveal"
      ref={cardRef}
      onMouseMove={handleMove}
    >
      <div className="pf-proj-glow" />
      <div className="pf-proj-num">{proj.num}</div>

      <div className="pf-proj-badges">
        {proj.badges.map((b) => (
          <span key={b} className="pf-proj-badge">
            {b}
          </span>
        ))}
      </div>

      <h3 className="pf-proj-h">{proj.title}</h3>
      <p className="pf-proj-p">{proj.desc}</p>

      <div className="pf-proj-stack">
        <div className="pf-proj-stack-lbl">Tech Stack</div>
        <div className="pf-stack-tags">
          {proj.stack.map((s) => (
            <span key={s} className="pf-stack-tag">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Project links */}
      <div className="pf-proj-links">
        {proj.githubUrl && (
          <a
            href={proj.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="pf-proj-link"
          >
            <GithubIcon /> Source Code
          </a>
        )}
        {proj.liveUrl && (
          <a
            href={proj.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="pf-proj-link pf-proj-link-live"
          >
            <ExternalIcon /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const typed = useTypewriter([
    "MERN Stack",
    "React.js",
    "Node.js",
    "MongoDB",
    "Express.js",
  ]);
  useReveal();

  const blob1 = useRef(null);
  const blob2 = useRef(null);
  const blob3 = useRef(null);

  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [formMsg, setFormMsg] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    /* Cabinet Grotesk (Fontshare) */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,600,700,800&display=swap";
    document.head.appendChild(link);

    /* EmailJS */
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
    };
    document.head.appendChild(script);

    /* Parallax blobs */
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (blob1.current)
        blob1.current.style.transform = `translate(${x * 35}px,${y * 35}px)`;
      if (blob2.current)
        blob2.current.style.transform = `translate(${-x * 25}px,${-y * 25}px)`;
      if (blob3.current)
        blob3.current.style.transform = `translate(${x * 18}px,${y * 18}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormMsg(null);

    const ready = EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && window.emailjs;

    if (!ready) {
      await new Promise((r) => setTimeout(r, 1500));
      setFormMsg({
        type: "ok",
        text: "✓ Message received! (Demo mode — configure EmailJS to enable real sending)",
      });
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
      setSending(false);
      return;
    }

    try {
      await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
      );
      setFormMsg({
        type: "ok",
        text: "✓ Message sent! I'll get back to you very soon.",
      });
      setTimeout(() => {
        setFormMsg(null);
      }, 10000);
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch {
      setFormMsg({
        type: "err",
        text: "✗ Couldn't send. Please email me at petchimuthuram1234@gmail.com",
      });
      setTimeout(() => {
        setFormMsg(null);
      }, 10000);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Blobs ── */}
      <div className="pf-blob pf-blob1" ref={blob1} />
      <div className="pf-blob pf-blob2" ref={blob2} />
      <div className="pf-blob pf-blob3" ref={blob3} />

      {/* ════════════════════
          NAV
      ════════════════════ */}
      <nav className="pf-nav">
        <a href="#hero" className="pf-logo">
          Portfolio
        </a>
        <ul className="pf-nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="pf-nav-icon"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="pf-nav-icon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a href="#contact" className="pf-nav-cta">
              Hire Me
            </a>
          </li>
        </ul>
      </nav>

      {/* ════════════════════
          HERO
      ════════════════════ */}
      <section className="pf-hero" id="hero">
        <div className="pf-badge">
          <span className="pf-badge-dot" />
          Available for Work · Fresher · Open to Opportunities
        </div>

        <p className="pf-hero-eyebrow">Full Stack Developer — MERN Stack</p>

        <h1 className="pf-hero-h1">
          <span className="pf-name">Petchimuthu</span>
          <span className="pf-role">"Where creativity meets clean code"</span>
        </h1>

        <div className="pf-hero-divider" />

        <p className="pf-hero-sub">
          Crafting scalable applications with&nbsp;
          <span className="pf-typed-word">{typed}</span>
          <span className="pf-cursor" />
        </p>

        <div className="pf-hero-btns">
          <a href="#projects" className="pf-btn-pri">
            View My Work
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="pf-btn-gold"
          >
            <DownloadIcon /> Download Resume
          </a>
          <a href="#contact" className="pf-btn-out">
            Let's Talk
          </a>
        </div>

        {/* Social links under hero buttons */}
        <div className="pf-hero-socials">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="pf-social-pill"
          >
            <GithubIcon /> GitHub
          </a>
          <span className="pf-social-sep">·</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="pf-social-pill"
          >
            <LinkedinIcon /> LinkedIn
          </a>
        </div>

        <div className="pf-scroll-hint">
          <div className="pf-scroll-line" />
          scroll
        </div>
      </section>

      {/* ════════════════════
          ABOUT
      ════════════════════ */}
      <section className="pf-section" id="about">
        <div className="pf-container">
          <div className="pf-label">Who I Am</div>
          <h2 className="pf-title">
            About <em>Me</em>
          </h2>
          <div className="pf-divider" />

          <div className="pf-about-grid pf-reveal">
            <div>
              <p className="pf-about-p">
                I'm Petchimuthu, a passionate MERN Stack Developer experienced
                in building full-stack web applications using MongoDB,
                Express.js, React.js, and Node.js.
              </p>
              <p className="pf-about-p">
                I specialize in creating responsive user interfaces, developing
                RESTful APIs, and implementing CRUD operations using clean,
                maintainable code — with a solid understanding of database
                integration, authentication, and complete end-to-end application
                flow.
              </p>
              <p className="pf-about-p">
                As a quick learner and natural problem solver, I'm eager to
                contribute to real-world projects and grow continuously as a
                professional developer.
              </p>

              {/* About action links */}
              <div className="pf-about-actions">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-btn-gold"
                  style={{ fontSize: "0.78rem", padding: "0.65rem 1.5rem" }}
                >
                  <DownloadIcon /> Resume
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-btn-out"
                  style={{ fontSize: "0.78rem", padding: "0.65rem 1.5rem" }}
                >
                  <GithubIcon /> GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-btn-out"
                  style={{ fontSize: "0.78rem", padding: "0.65rem 1.5rem" }}
                >
                  <LinkedinIcon /> LinkedIn
                </a>
              </div>
            </div>

            <div className="pf-stats">
              <div className="pf-stat">
                <div className="pf-stat-num">3+</div>
                <div className="pf-stat-lbl">Projects Built</div>
              </div>
              <div className="pf-stat">
                <div className="pf-stat-num">MERN</div>
                <div className="pf-stat-lbl">Core Stack</div>
              </div>
              <div className="pf-stat">
                <div className="pf-stat-num">8+</div>
                <div className="pf-stat-lbl">Technologies</div>
              </div>
              <div className="pf-stat">
                <div className="pf-stat-num">2025</div>
                <div className="pf-stat-lbl">CS Graduate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════
          EDUCATION
      ════════════════════ */}
      <section className="pf-section pf-section-alt" id="education">
        <div className="pf-container">
          <div className="pf-label">Background</div>
          <h2 className="pf-title">
            <em>Education</em>
          </h2>
          <div className="pf-divider" />
          <div className="pf-reveal">
            <div className="pf-edu-card">
              <div className="pf-edu-icon">🎓</div>
              <div>
                <h3 className="pf-edu-h">Bachelor of Computer Science</h3>
                <p className="pf-edu-p">Thiruvalluvar College, Papanasam</p>
                <p
                  className="pf-edu-p"
                  style={{ fontSize: "0.82rem", marginTop: "0.1rem" }}
                >
                  Batch 2022 – 2025
                </p>
                {/* <span className="pf-edu-badge">
                  MERN Stack Development Course
                </span> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="pf-divider" /> */}
        <div className="pf-reveal">
          <div className="pf-edu-card">
            <div className="pf-edu-icon">🎓</div>
            <div>
              <h3 className="pf-edu-h">MERN Stack Development</h3>
              <p className="pf-edu-p">CloudSpaceDesign</p>
              <p
                className="pf-edu-p"
                style={{ fontSize: "0.82rem", marginTop: "0.1rem" }}
              >
                June 2025 – December 2025
              </p>
              {/* <span className="pf-edu-badge">
                MERN Stack Development Course
              </span> */}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════
          SKILLS
      ════════════════════ */}
      <section className="pf-section" id="skills">
        <div className="pf-container">
          <div className="pf-label">What I Use</div>
          <h2 className="pf-title">
            Technical <em>Skills</em>
          </h2>
          <div className="pf-divider" />

          <div className="pf-skills-grid pf-reveal">
            {SKILLS.map((sk) => (
              <div className="pf-skill" key={sk.name}>
                {sk.express ? (
                  <div className="pf-express-wrap">
                    <img src={sk.img} alt={sk.name} />
                  </div>
                ) : (
                  <img src={sk.img} alt={sk.name} />
                )}
                <p className="pf-skill-name">{sk.name}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "4rem" }}>
            <div
              className="pf-label"
              style={{ marginBottom: "0.75rem", fontSize: "1em" }}
            >
              Concepts & Practices
            </div>
            <div className="pf-tags-wrap pf-reveal">
              {CONCEPTS.map((c) => (
                <span key={c} className="pf-tag">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "4rem" }}>
            <div
              className="pf-label"
              style={{ marginBottom: "0.75rem", fontSize: "1rem" }}
            >
              Tools
            </div>
            <div className="pf-tools-wrap pf-reveal">
              {TOOLS.map((t) => (
                <div key={t} className="pf-tool">
                  <span className="pf-tool-dot" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════
          PROJECTS
      ════════════════════ */}
      <section className="pf-section pf-section-alt" id="projects">
        <div className="pf-container">
          <div className="pf-label">What I've Built</div>
          <h2 className="pf-title">
            Selected <em>Projects</em>
          </h2>
          <div className="pf-divider" />
          <div className="pf-proj-grid">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.num} proj={p} />
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="pf-proj-more pf-reveal">
            <p>More projects on my GitHub →</p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="pf-btn-out"
              style={{ fontSize: "0.8rem", padding: "0.65rem 1.6rem" }}
            >
              <GithubIcon /> View All on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════
          STRENGTHS
      ════════════════════ */}
      <section className="pf-section">
        <div className="pf-container">
          <div className="pf-label">What Drives Me</div>
          <h2 className="pf-title">
            Core <em>Strengths</em>
          </h2>
          <div className="pf-divider" />
          <div className="pf-str-grid pf-reveal">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="pf-str">
                <span className="pf-str-ico">{s.icon}</span>
                <p className="pf-str-txt">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════
          CONTACT
      ════════════════════ */}
      <section className="pf-section pf-section-alt" id="contact">
        <div className="pf-container">
          <div className="pf-label">Get In Touch</div>
          <h2 className="pf-title">
            Let's Work <em>Together</em>
          </h2>
          <div className="pf-divider" />

          <div className="pf-contact-wrap">
            {/* Left info */}
            <div className="pf-reveal">
              <h3 className="pf-contact-info-h">
                Have a project or opportunity?
              </h3>
              <p className="pf-contact-info-p">
                I'm actively looking for full-time roles and freelance
                opportunities. Whether it's a quick question or a long-term
                collaboration — my inbox is always open.
              </p>

              <div className="pf-ci">
                <div className="pf-ci-icon">📧</div>
                <a href="mailto:petchimuthuram1234@gmail.com">
                  petchimuthuram1234@gmail.com
                </a>
              </div>
              <div className="pf-ci">
                <div className="pf-ci-icon">📱</div>
                <a href="tel:+916381412607">+91 6381412607</a>
              </div>
              <div className="pf-ci">
                <div className="pf-ci-icon">📍</div>
                <span style={{ color: "var(--mist)" }}>
                  Kallidaikurichi, Tirunelveli, Tamil Nadu
                </span>
              </div>

              {/* Social links in contact */}
              <div className="pf-contact-socials">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-social-btn"
                >
                  <GithubIcon /> GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-social-btn"
                >
                  <LinkedinIcon /> LinkedIn
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pf-social-btn pf-social-btn-gold"
                >
                  <DownloadIcon /> Resume
                </a>
              </div>
            </div>

            {/* Right form */}
            <div className="pf-reveal">
              <form className="pf-form" onSubmit={handleSubmit} ref={formRef}>
                <div className="pf-form-row">
                  <div className="pf-fg">
                    <label htmlFor="from_name">Your Name</label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      placeholder="Jane Smith"
                      required
                      value={form.from_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pf-fg">
                    <label htmlFor="from_email">Your Email</label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                      value={form.from_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pf-fg">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Job Opportunity / Project Inquiry"
                    required
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="pf-fg">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, role, or anything you'd like to discuss..."
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="pf-send-btn"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send Message"}
                  {!sending && <SendIcon />}
                </button>
                {formMsg && (
                  <div
                    className={
                      formMsg.type === "ok"
                        ? "pf-msg pf-msg-ok"
                        : "pf-msg pf-msg-err"
                    }
                  >
                    {formMsg.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════
          FOOTER
      ════════════════════ */}
      <footer className="pf-footer">
        <div className="pf-footer-socials">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a href="mailto:petchimuthuram1234@gmail.com" aria-label="Email">
            📧
          </a>
        </div>
        <p style={{ marginTop: "1rem" }}>
          © 2026 &nbsp;<span className="pf-footer-gold">Petchimuthu</span>
          &nbsp;· Full Stack Developer · Crafted with care
        </p>
        <p style={{ marginTop: "0.4rem" }}>
          <a href="mailto:petchimuthuram1234@gmail.com">
            petchimuthuram1234@gmail.com
          </a>
          &nbsp;·&nbsp;
          <a href="tel:+916381412607">+91 6381412607</a>
        </p>
      </footer>
    </>
  );
}
