import { useEffect, useMemo, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiSun,
  FiMoon,
  FiChevronRight,
  FiAward,
  FiServer,
  FiChevronRight as FiChevron,
  FiChevronRight as FiChevronDuplicate,
  FiChevronRight as FiChevronDuplicate2,
  FiChevronRight as FiChevronDuplicate3,
  FiChevronRight as FiChevronDuplicate4,
  FiChevronRight as FiChevronDuplicate5,
} from "react-icons/fi";
import { SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiPython, SiDjango, SiMongodb, SiMysql } from "react-icons/si";

/**
 * Responsive Portfolio — single-file React component
 * Improvements made for mobile responsiveness:
 * - Mobile hamburger menu with full-screen drawer
 * - Tighter spacing and responsive typography
 * - Cards and grids collapse cleanly on small screens
 * - Touch-friendly tappable areas
 */

// -----------------------------
// Configurable content
// -----------------------------
const PROFILE = {
  name: "Jenish Duvani",
  title: "MCA Candidate & Full‑Stack Developer",
  elevator: "I build clean, reliable web apps with a product mindset.",
  email: "jenish.duvani.work@gmail.com",
  socials: {
    github: "https://github.com/JenishDuvani",
    linkedin: "https://linkedin.com/in/jenish-duvani",
  },
};

const SKILLS = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Python", icon: SiPython },
  { name: "Django", icon: SiDjango },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: SiMysql },
  { name: "AWS", icon: FiServer },
];

const PROJECTS = [
  {
    title: "AI Chatbot Assistant",
    blurb: "Conversational AI with function-calling and vector search.",
    tech: ["React", "Node", "OpenAI", "Postgres"],
    links: { demo: "#", github: "#" },
    impact: "Improved support response speed by ~60% in tests.",
  },
  {
    title: "Dev Blog Platform",
    blurb: "Markdown CMS with tags, drafts, and code highlighting.",
    tech: ["Next.js", "Prisma", "SQLite"],
    links: { demo: "#", github: "#" },
    impact: "Shipped in 2 weeks; supports 1k+ monthly reads.",
  },
  {
    title: "Portfolio v3",
    blurb: "Fast, accessible, dark-first personal site with CI/CD.",
    tech: ["Vite", "Tailwind", "Netlify"],
    links: { demo: "#", github: "#" },
    impact: "Scored 95+ Lighthouse across the board.",
  },
];

const EDUCATION = [
  {
    degree: "MCA",
    org: "2024 – 2026",
    detail: "Master of Computer Applications",
  },
  {
    degree: "BCA",
    org: "2021 – 2024",
    detail: "Bachelor of Computer Applications",
  },
];

const EXPERIENCE = [
  {
    role: "Software Intern",
    org: "Rishvi Ltd",
    when: "May 2025 – Jul 2025",
    bullets: [
      "Built internal dashboards and REST endpoints",
      "Improved data loading latency with query optimization",
      "Collaborated with a small cross‑functional team",
    ],
  },
];

const CERTS = [
  { name: "AWS Cloud Architect", issuer: "AWS", year: "2025" },
  { name: "AWS Cloud Developing", issuer: "AWS", year: "2025" },
  { name: "OCI AI Foundations", issuer: "Oracle", year: "2025" },
];

// -----------------------------
// UI helpers (responsive tweaks)
// -----------------------------
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-xs text-pink-300">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  // smaller padding on mobile, slightly larger on md+
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 sm:px-5 sm:py-4 ${className}`}>
      {children}
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-20">
      {title && (
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-zinc-400 text-sm">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

// -----------------------------
// Main component
// -----------------------------
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navIds = ["home", "about", "skills", "projects", "experience", "education", "certs", "blog", "resume", "contact"];
  const contactEndpoint = "/api/contact";

  useEffect(() => {
    try {
      console.assert(SKILLS.every((s) => typeof s.icon === "function"), "Every SKILL.icon should be a React component");
      console.assert(Array.isArray(PROJECTS) && PROJECTS.length >= 3, "Expect at least 3 projects");
      console.assert(typeof PROFILE.name === "string" && PROFILE.name.length > 0, "Profile name should be a non-empty string");
    } catch (e) {
      console.error("Dev self-test failed:", e);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -50% 0px" }
    );
    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await new Promise((r) => setTimeout(r, 500));
      alert("Thanks! Your message has been sent.");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please email me directly.");
    }
  };

  const skills = useMemo(() => SKILLS, []);
  const projects = useMemo(() => PROJECTS, []);

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} relative min-h-screen scroll-smooth`}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_80%_10%,rgba(236,72,153,0.14),transparent_40%),radial-gradient(600px_circle_at_20%_90%,rgba(217,70,239,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(to_right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to_bottom, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <header className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 md:px-6">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold tracking-wide">
              <span className="bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent">JenishOS</span>
            </div>
            <div className="hidden md:block text-xs text-zinc-400">MCA • Full‑Stack</div>
          </div>

          {/* Desktop nav */}
          <ul className="hidden gap-4 md:flex">
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setMobileOpen(false)} className={`relative pb-1 text-xs uppercase tracking-wider text-zinc-400 transition hover:text-zinc-100 ${active === id ? "text-zinc-100" : ""}`}>
                  {id}
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-pink-400 to-fuchsia-500 transition-transform duration-300 ${active === id ? "scale-x-100" : "group-hover:scale-x-100"}`} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => setDark(!dark)} className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 md:p-2 md:rounded-lg">
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden rounded-lg p-2 text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500">
              {/* simple hamburger icon using spans for lighter dependency */}
              <div className="space-y-1">
                <span className={`block h-0.5 w-5 ${mobileOpen ? "transform rotate-45 translate-y-1.5" : ""} bg-zinc-200 transition-all`} />
                <span className={`block h-0.5 w-5 ${mobileOpen ? "opacity-0" : ""} bg-zinc-200 transition-all`} />
                <span className={`block h-0.5 w-5 ${mobileOpen ? "transform -rotate-45 -translate-y-1" : ""} bg-zinc-200 transition-all`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-60 flex">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative z-50 w-11/12 max-w-sm animate-slide-in-left rounded-2xl border border-white/10 bg-white/6 p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div className="font-semibold">Menu</div>
                <button onClick={() => setMobileOpen(false)} className="rounded p-1 text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500">Close</button>
              </div>
              <nav className="flex flex-col gap-3">
                {navIds.map((id) => (
                  <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-white/5">
                    {id}
                  </a>
                ))}
              </nav>
              <div className="mt-6 flex gap-3">
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
                  <FiGithub className="mr-2" /> GitHub
                </a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
                  <FiLinkedin className="mr-2" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto flex min-h-[68vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <FiServer className="text-pink-400" /> Open to roles & freelance
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-50 bg-clip-text text-transparent">{PROFILE.name}</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">{PROFILE.title}</p>
          <p className="mt-3 max-w-xl text-sm text-zinc-400">{PROFILE.elevator}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:scale-[1.02]">
              View Work <FiChevronRight className="ml-2" />
            </a>
            <a href="#resume" className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-100">
              <FiDownload className="mr-2" /> Resume
            </a>
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
              <FiGithub />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
              <FiLinkedin />
            </a>
          </div>

          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[{ k: "Projects", v: "10+" }, { k: "Core", v: "React • Node" }, { k: "Focus", v: "Web • AI" }].map((s) => (
              <Card key={s.k} className="text-center">
                <div className="text-zinc-400 text-xs">{s.k}</div>
                <div className="text-lg font-semibold">{s.v}</div>
              </Card>
            ))}
          </div>
        </section>

        <Section id="about" title="About" subtitle="Who I am & how I work">
          <div className="grid items-start gap-4 md:grid-cols-2">
            <Card>
              <p className="text-zinc-300 text-sm">
                I’m an MCA student who loves building performant, accessible products. I enjoy clean architecture, good DX, and shipping delightful UI.
              </p>
            </Card>
            <Card>
              <p className="text-zinc-300 text-sm">
                I collaborate well with product & design, document as I go, and automate repetitive tasks. Strong bias to action; pragmatic about trade‑offs.
              </p>
            </Card>
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="No progress bars — just what I use">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {skills.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.name} className="flex flex-col items-center gap-2 py-4">
                  <Icon className="h-7 w-7 text-pink-400" />
                  <div className="text-sm text-zinc-200">{s.name}</div>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section id="projects" title="Projects" subtitle="Selected work in a bento layout">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[1fr]">
            {projects.map((p, i) => (
              <Card key={p.title} className={`${i === 0 ? "md:col-span-2" : ""}`}>
                <div className="mb-2 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-zinc-50">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{p.blurb}</p>
                <p className="mt-2 text-xs text-zinc-500">{p.impact}</p>
                <div className="mt-3 flex gap-3 text-sm">
                  {p.links.demo && (
                    <a href={p.links.demo} className="text-pink-300 hover:underline">Demo</a>
                  )}
                  {p.links.github && (
                    <a href={p.links.github} className="text-pink-300 hover:underline">GitHub</a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" subtitle="Internships & roles">
          <div className="relative ml-0 md:ml-3 border-l border-white/10 pl-0 md:pl-6">
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="mb-6">
                <div className="-ml-0 mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  <span className="text-xs text-zinc-400">{e.when}</span>
                </div>
                <h4 className="text-base font-semibold text-zinc-100">{e.role} · {e.org}</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education" subtitle="Academic journey">
          <div className="grid gap-4 md:grid-cols-2">
            {EDUCATION.map((ed) => (
              <Card key={ed.degree}>
                <div className="text-sm text-zinc-400">{ed.org}</div>
                <div className="text-base font-semibold text-zinc-100">{ed.degree}</div>
                <div className="text-sm text-zinc-300">{ed.detail}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="certs" title="Achievements & Certifications" subtitle="Things I’ve earned along the way">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CERTS.map((c) => (
              <Card key={c.name}>
                <div className="mb-2 inline-flex items-center gap-2 text-pink-300"><FiAward /> {c.year}</div>
                <div className="text-base font-semibold text-zinc-100">{c.name}</div>
                <div className="text-sm text-zinc-400">{c.issuer}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="blog" title="Articles" subtitle="Latest thoughts and notes (coming soon)">
          <Card>
            <p className="text-sm text-zinc-300">No posts yet. When ready, we’ll pull the latest 3 here.</p>
          </Card>
        </Section>

        <Section id="resume" title="Resume" subtitle="Grab a copy or request via email">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:scale-[1.02]">
              <FiDownload className="mr-2" /> Download PDF
            </a>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-100">
              <FiMail className="mr-2" /> Request latest
            </a>
          </div>
        </Section>

        <Section id="contact" title="Contact" subtitle="Send a message — wired for AWS later">
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <Card>
              <label className="text-xs text-zinc-400">Name</label>
              <input name="name" required className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-pink-500/50" />
            </Card>
            <Card>
              <label className="text-xs text-zinc-400">Email</label>
              <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-pink-500/50" />
            </Card>
            <Card className="md:col-span-2">
              <label className="text-xs text-zinc-400">Message</label>
              <textarea name="message" rows={4} required className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-pink-500/50" />
            </Card>
            <div className="md:col-span-2">
              <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:scale-[1.02]">
                Send
              </button>
              <span className="ml-3 text-xs text-zinc-500">(Will integrate AWS API Gateway + Lambda + SES for free-tier email.)</span>
            </div>
          </form>
          <div className="mt-6 flex gap-3">
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
              <FiGithub />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-100">
              <FiLinkedin />
            </a>
          </div>
        </Section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {PROFILE.name} • jenishduvani.space — Built with React & Tailwind‑style utilities.
      </footer>

      {/* small animation helper styles (tailwind plugin or your global css) */}
      <style jsx>{`
        @keyframes slide-in-left {
          from { transform: translateX(-12px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 220ms ease-out; }
      `}</style>
    </div>
  );
}
