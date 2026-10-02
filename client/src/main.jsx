import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects, skills } from './data/portfolio';
import './styles.css';

const emptyForm = { name: '', email: '', subject: '', message: '' };
const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ message: '', error: false });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-in');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ message: '', error: false });

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not send your message.');

      setForm(emptyForm);
      setStatus({ message: 'Thanks for reaching out. Your message has been sent.', error: false });
    } catch (error) {
      setStatus({
        message: error.message || 'Could not send your message. Please try again later.',
        error: true,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="noise" aria-hidden="true" />
      <header className="nav">
        <a className="brand" href="#home" aria-label="Raviteja Kolluru home">RK<span>.</span></a>
        <button
          className="menu"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)}>
              {section}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">Let’s talk ↗</a>
      </header>

      <main id="home">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Available for opportunities</p>
            <h1>Building digital<br /><em>experiences</em> that matter.</h1>
            <p className="lead">{profile.tagline}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">View my work <span>↗</span></a>
              <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            </div>
            <div className="mini-stats" aria-label="A few quick facts">
              <div><b>{profile.cgpa}</b><span>Current CGPA</span></div>
              <div><b>2027</b><span>Graduation</span></div>
              <div><b>12+</b><span>Technologies</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Code illustration">
            <div className="orb" />
            <div className="code-card">
              <div className="dots" aria-hidden="true">● ● ●</div>
              <pre>{`const raviteja = {
  role: "Full Stack Developer",
  focus: ["Web", "Data", "AI"],
  mindset: "Build. Learn. Ship."
}`}</pre>
            </div>
            <div className="float-tag">React.js <b>×</b></div>
            <div className="float-tag second">Java <b>×</b></div>
          </div>
        </section>

        <section id="about" className="section wrap animate-in">
          <div className="section-head"><span>01</span><h2>About me</h2></div>
          <div className="about-grid">
            <div>
              <p className="big-copy">I’m <strong>{profile.name}</strong>, a Computer Science Engineering student specializing in Data Science at Mohan Babu University.</p>
              <p>I enjoy turning ideas into working products — from responsive interfaces and REST APIs to data-driven and AI-powered applications. My current toolkit combines JavaScript, React, Node.js, Java, PHP, SQL/MySQL and modern AI technologies.</p>
              <p>My approach is simple: understand the problem, build cleanly, test the workflow, and ship something people can actually use.</p>
            </div>
            <aside className="profile-card">
              <span>Currently</span>
              <h3>B.Tech CSE — Data Science</h3>
              <p>{profile.education}</p>
              <hr />
              <span>Based in</span>
              <h3>{profile.location}</h3>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a>
            </aside>
          </div>
        </section>

        <section id="skills" className="section alt animate-in">
          <div className="wrap">
            <div className="section-head"><span>02</span><h2>Skills &amp; toolkit</h2></div>
            <div className="skill-grid">
              {['Frontend', 'Backend', 'Database', 'Tools'].map((group) => (
                <div className="skill-group" key={group}>
                  <h3>{group}</h3>
                  <div className="chips">
                    {skills.filter((skill) => skill[1] === group).map(([name]) => <span key={name}>{name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section wrap animate-in">
          <div className="section-head"><span>03</span><h2>Selected work</h2></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project" key={project.title}>
                <div className="project-num">0{index + 1}</div>
                <div>
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <small>{project.stack}</small>
                  <a href={project.link} target={project.link.startsWith('#') ? undefined : '_blank'} rel="noreferrer">
                    {project.link.startsWith('#') ? 'Ask me about this project ↗' : 'Explore project ↗'}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="quote animate-in">
          <div className="wrap">
            <p>“Good software is not just code that works. It is a clear idea turned into an experience people can trust.”</p>
            <span>— Raviteja</span>
          </div>
        </section>

        <section id="contact" className="section wrap animate-in">
          <div className="section-head"><span>04</span><h2>Let’s build something.</h2></div>
          <div className="contact-grid">
            <div>
              <p className="big-copy">Have a project, internship opportunity, or idea? Send me a message.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><span className="icon" aria-hidden="true">✉</span>{profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="icon" aria-hidden="true">in</span>LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noreferrer"><span className="icon" aria-hidden="true">⌘</span>GitHub</a>
              </div>
            </div>
            <form onSubmit={submit}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" maxLength="80" required value={form.name} onChange={updateField} />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" maxLength="160" required value={form.email} onChange={updateField} />
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" maxLength="160" required value={form.subject} onChange={updateField} />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" maxLength="3000" required value={form.message} onChange={updateField} />
              <button className="btn primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message ↗'}
              </button>
              <p className={`status${status.error ? ' error' : ''}`} role="status" aria-live="polite">
                {status.message}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; built with purpose.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
