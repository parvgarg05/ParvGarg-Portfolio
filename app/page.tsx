"use client";

import { type FormEvent, type MouseEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Atom,
  Braces,
  Code2,
  Cpu,
  Database,
  FileText,
  Github,
  GraduationCap,
  Mail,
  Moon,
  Puzzle,
  Rocket,
  Server,
  Sparkles,
  Workflow,
  SunMedium,
  Terminal,
  Users,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const stackGroups = [
  {
    title: 'Languages',
    items: [
      { label: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { label: 'JavaScript (ES6+)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { label: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { label: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { label: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { label: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { label: 'REST APIs', icon: Server },
      { label: 'JWT', icon: Terminal },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { label: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { label: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { label: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'Databases & Tools',
    items: [
      { label: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { label: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { label: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { label: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
  {
    title: 'Soft Skills',
    items: [
      { label: 'Problem Solving', icon: Puzzle },
      { label: 'Adaptability', icon: Sparkles },
      { label: 'Collaboration', icon: Users },
    ],
  },
] as const;

const projects = [
  {
    name: 'Rakshak',
    kicker: '1st Prize Winner at Hackin\' Winter 2.0',
    description:
      'A distress management platform built to handle rapid alert distribution, route emergencies clearly, and reduce response friction when every second matters.',
    details:
      'Architecture centered on urgent signal handling, fast event propagation, and a response-oriented flow that keeps the system legible under pressure.',
    tags: ['Incident routing', 'Rapid alerts', 'Disaster response'],
    skills: ['React', 'Node.js', 'MongoDB'],
    repo: 'https://github.com/parvgarg05/Rakshak-ResQ',
    demo: 'https://rakshaksindoorui.onrender.com/',
    image: '/profile/2.jpg',
    reverse: false,
  },
  {
    name: 'Hubify',
    kicker: 'Campus engagement system',
    description:
      'A campus coordination layer powered by FastAPI and SQLite, designed to make announcements, participation, and engagement feel simple and reliable.',
    details:
      'Backend logic focuses on routing updates, organizing participation flows, and keeping the data model compact enough for easy iteration.',
    tags: ['FastAPI', 'SQLite', 'Campus systems'],
    skills: ['FastAPI', 'SQLite', 'Next.js'],
    repo: 'https://github.com/parvgarg05/Hubify-EventFlow',
    demo: 'https://github.com/parvgarg05',
    image: '/profile/3.jpg',
    reverse: true,
  },
  // {
  //   name: 'Farmer\'s Smart Assistant',
  //   kicker: 'Agricultural monitoring logic',
  //   description:
  //     'Built in C++ with Tries and Max Heaps to prioritize agricultural signals, search patterns quickly, and support smarter decision making.',
  //   details:
  //     'The core logic is tuned around efficient retrieval and prioritization so the assistant can surface the right signal without unnecessary overhead.',
  //   tags: ['C++', 'Tries', 'Max Heaps'],
  //   skills: ['C++', 'AI/ML', 'Data Structures'],
  //   repo: 'https://github.com/parvgarg05/Smart-Farmer-Assistant-System',
  //   demo: 'https://github.com/parvgarg05',
  //   image: '/profile/4.jpg',
  //   reverse: false,
  // },
  {
    name: 'Retail E-Commerce Platform',
    kicker: 'Full-stack retail platform · Client project',
    description:
      'A production-ready e-commerce platform deployed on Vercel with Neon PostgreSQL and Razorpay payments for a retail client.',
    details:
      'Includes an admin dashboard for managing products, categories, orders, pricing, and delivery, plus phone-based customer order tracking without account registration.',
    tags: ['E-commerce', 'Admin dashboard', 'Razorpay'],
    skills: ['JavaScript', 'Node.js', 'PostgreSQL'],
    repo: 'https://github.com/parvgarg05/roshan',
    demo: 'https://roshanlal.vercel.app/',
    image: '/profile/5.jpeg',
    reverse: true,
  },
] as const;

const metrics = [
  { value: '300+', label: 'LeetCode Problems' },
  { value: '1447', label: 'Max Rating' },
  { value: 'GDG-128', label: 'Core Team' },
] as const;

const timeline = [
  {
    title: 'Education',
    meta: 'B.Tech in Information Technology',
    detail: 'Jaypee Institute of Information Technology (JIIT), Noida · Expected 2028',
    icon: GraduationCap,
  },
  {
    title: 'Leadership',
    meta: 'Core Team Member',
    detail: 'GDG JIIT · community execution, technical sessions, and student engagement',
    icon: BriefcaseBusiness,
  },
] as const;

const skillsNav = [
  { label: 'React', icon: Atom, tone: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25' },
  // { label: 'Next.js', icon: Globe, tone: 'text-violet-400 bg-violet-400/10 border-violet-400/25' },
  { label: 'Node.js', icon: Server, tone: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25' },
  { label: 'Python', icon: Code2, tone: 'text-sky-400 bg-sky-400/10 border-sky-400/25' },
  { label: 'MongoDB', icon: Database, tone: 'text-lime-400 bg-lime-400/10 border-lime-400/25' },
  { label: 'PostgreSQL', icon: Database, tone: 'text-blue-400 bg-blue-400/10 border-blue-400/25' },
  { label: 'C++', icon: Braces, tone: 'text-orange-400 bg-orange-400/10 border-orange-400/25' },
  { label: 'FastAPI', icon: Workflow, tone: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/25' },
  { label: 'AI/ML', icon: Cpu, tone: 'text-rose-400 bg-rose-400/10 border-rose-400/25' },
] as const;

function ImageTile({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative min-h-[220px] overflow-hidden border border-zinc-800 bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center font-mono text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
          {alt}
          <div className="mt-2 text-[10px] tracking-[0.22em] text-zinc-600">Drop {src.split('/').pop()} into /public/profile</div>
        </div>
      </div>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/8 to-transparent" />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:max-w-[20rem] md:max-w-[22rem]">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
        <div>
          <div>Profile Photo</div>
          <div className="mt-2 text-[10px] tracking-[0.22em] text-zinc-600">Drop 1.jpg into /public/profile</div>
        </div>
      </div>
      <img
        src="/profile/1.jpg"
        alt="Parv Garg profile photo"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          const target = event.currentTarget;
          target.style.opacity = '0';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/8 to-transparent" />
    </div>
  );
}

type ProjectItem = (typeof projects)[number];

function ProjectCarousel({ projects }: { projects: ReadonlyArray<ProjectItem> }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const total = projects.length;

  function prev() {
    setActive((s) => (s - 1 + total) % total);
  }

  function next() {
    setActive((s) => (s + 1) % total);
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-visible py-0" ref={containerRef}>
        <button
          type="button"
          onClick={prev}
          className="carousel-arrow absolute left-0 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition-transform duration-200 hover:scale-105 md:inline-flex"
          aria-label="Previous project"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </button>
        <div className="relative mx-auto w-full overflow-visible px-12 [perspective:1600px] md:px-20">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) prev();
              else if (info.offset.x < -80) next();
            }}
            className="relative mx-auto flex h-[34rem] items-center justify-center md:h-[36rem]"
            style={{ touchAction: 'pan-y', transformStyle: 'preserve-3d' }}
          >
            {projects.map((p, i) => {
              let pos = i - active;
              if (pos > total / 2) pos -= total;
              if (pos < -total / 2) pos += total;
              const abs = Math.abs(pos);
              const rotateY = pos * -14;
              const translateX = pos * 250;
              const scale = pos === 0 ? 1 : pos === -1 || pos === 1 ? 0.86 : 0.72;
              const z = pos === 0 ? 40 : 20 - abs;
              const blur = pos === 0 ? 0 : 2.5 * abs;
              const saturation = pos === 0 ? 1 : 0.35;
              const opacity = pos === 0 ? 1 : 0.36;

              return (
                <div
                  key={p.name}
                  className="absolute left-1/2 top-1/2 w-[20rem] -translate-x-1/2 -translate-y-1/2 md:w-[23rem]"
                  style={{ zIndex: z }}
                >
                  <motion.div
                    onClick={() => setActive(i)}
                    animate={{ x: translateX, rotateY, scale, opacity, filter: `blur(${blur}px) saturate(${saturation})` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                    className="cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex h-40 items-center justify-center bg-zinc-900/40 md:h-48">
                      <img
                        src={p.image}
                        alt={`${p.name} image`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="space-y-3 p-4 md:p-5">
                      <p className="font-mono text-[11px] tracking-[0.22em] text-blue-400 uppercase">{p.kicker}</p>
                      <h3 className="text-2xl text-zinc-100">{p.name}</h3>
                      <p className="text-sm leading-6 text-zinc-400">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.skills.map((skill) => (
                          <span
                            key={skill}
                            className="project-chip rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] tracking-[0.18em] transition-colors duration-200"
                        >
                          GitHub Repo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] tracking-[0.18em] transition-colors duration-200"
                        >
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
        <button
          type="button"
          onClick={next}
          className="carousel-arrow absolute right-0 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition-transform duration-200 hover:scale-105 md:inline-flex"
          aria-label="Next project"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
    </div>
  );
}

export default function Page() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSwitching, setIsSwitching] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });
  const [transitionTheme, setTransitionTheme] = useState<'dark' | 'light' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    const initialTheme = storedTheme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleThemeToggle(event: MouseEvent<HTMLButtonElement>) {
    if (isSwitching) {
      return;
    }

    const targetTheme = theme === 'dark' ? 'light' : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setTransitionTheme(targetTheme);
    setIsSwitching(true);
    window.setTimeout(() => {
      setTheme(targetTheme);
    }, 380);
    window.setTimeout(() => {
      setIsSwitching(false);
      setTransitionTheme(null);
    }, 2000);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setContactStatus('sending');
    setContactMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not send message.');
      }

      setContactStatus('success');
      setContactMessage('Message sent. I will get back to you soon.');
      form.reset();
    } catch (error) {
      setContactStatus('error');
      setContactMessage(error instanceof Error ? error.message : 'Could not send message.');
    }
  }

  return (
    <main className="min-h-screen bg-base text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-7xl flex-col px-6 py-8 md:px-10 lg:px-12"
      >
        <header
          className={`site-header sticky top-3 z-40 mb-6 self-center rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300 ease-out ${
            isScrolled
              ? 'translate-y-[-2px] border-zinc-800/80 bg-zinc-950/90 shadow-[0_16px_40px_rgba(0,0,0,0.24),0_0_24px_rgba(37,99,235,0.1)]'
              : 'border-zinc-800/60 bg-zinc-950/75 shadow-[0_18px_52px_rgba(0,0,0,0.26),0_0_22px_rgba(124,58,237,0.1)]'
          }`}
        >
          <nav className="flex flex-wrap items-center justify-center gap-4 text-[11px] tracking-[0.22em] uppercase text-zinc-300">
              {[
                ['Home', '#home'],
                ['Skills', '#skills'],
                ['Projects', '#projects'],
                ['Experience', '#experience'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full bg-zinc-950/45 px-4 py-2 transition-colors duration-200 hover:bg-zinc-900/80 hover:text-blue-300"
                >
                  {label}
                </a>
              ))}
            </nav>
        </header>

        <button
          type="button"
          onClick={handleThemeToggle}
          className="theme-dock-button fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
          aria-label="Switch between dark and white theme"
        >
          {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {isSwitching ? (
          <div
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
            aria-hidden="true"
          >
            <div className={`theme-ray-burst ${transitionTheme === 'light' ? 'theme-ray-burst--light' : 'theme-ray-burst--dark'}`} style={{ left: burstOrigin.x, top: burstOrigin.y }}>
              <span className="theme-ray-rings" />
              <span className="theme-ray-core" />
              <span className="theme-ray-stars" />
            </div>
          </div>
        ) : null}

        {theme === 'dark' ? (
          <div className="theme-starfield pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <span className="theme-starfield-layer theme-starfield-layer-a" />
            <span className="theme-starfield-layer theme-starfield-layer-b" />
          </div>
        ) : null}

        <section id="home" className="relative z-10 min-h-[78vh] py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-4xl">
              <p className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.24em] text-blue-400 uppercase">
                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.95)]" />
                Full-Stack Developer
                <span>•</span>
                AI/ML
              </p>
              <h1 className="text-balance text-6xl font-black uppercase leading-[0.92] tracking-[0.08em] text-zinc-100 sm:text-7xl md:text-8xl">
                Parv <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">Garg</span>
              </h1>
              <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tighter text-zinc-100 md:text-4xl">
                Building AI Products
                <br />
                That Solve Real Problems<span className="text-blue-400">.</span>
              </h2>
              <p className="mt-7 max-w-xl border-l border-blue-400/45 pl-6 text-base leading-8 text-zinc-400">
                I develop full-stack applications, AI systems, and automation tools using React, Node.js, Python and modern cloud technologies.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md border border-blue-500 bg-blue-600 px-5 py-3 font-mono text-xs tracking-[0.18em] text-white shadow-[0_12px_34px_rgba(37,99,235,0.28)] transition-colors duration-200 hover:bg-blue-500"
                >
                  <Rocket className="h-4 w-4" />
                  Explore Projects
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="/Resume_Parv_Dev_2305.pdf"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/60 px-5 py-3 font-mono text-xs tracking-[0.18em] text-zinc-100 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <FileText className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>

            <aside className="relative hidden min-h-[18rem] items-center justify-center lg:flex">
              <div className="absolute h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
              <HeroImage />
            </aside>
          </div>

          <div className="mt-16">
            <p className="mb-5 font-mono text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
              Technologies I work with
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-zinc-300">
              {skillsNav.slice(0, 6).map(({ label, icon: Icon, tone }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${tone.split(' ').find((part) => part.startsWith('text-')) ?? 'text-blue-400'}`} />
                  <span>{label}</span>
                </div>
              ))}
              <span className="font-mono text-zinc-500">...</span>
              <span className="text-zinc-500">and more</span>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 md:py-32">
          <h2 className="mb-10 text-5xl font-semibold tracking-tighter text-zinc-100 md:text-6xl">
            Technical Skills
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.title} className="skill-card border border-zinc-800 bg-zinc-950/55 px-6 py-6">
                <div className="text-2xl font-semibold tracking-tighter text-zinc-100">
                  {group.title}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.label}
                      className="skill-chip inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3.5 py-2 text-sm text-zinc-300"
                    >
                      {'logo' in item ? (
                        <img src={item.logo} alt="" className="skill-logo h-5 w-5 object-contain" loading="lazy" />
                      ) : (
                        <item.icon className="h-4 w-4 text-blue-400" />
                      )}
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-14 md:py-18">
          <h2 className="mb-8 text-5xl font-semibold tracking-tighter text-zinc-100 md:text-6xl">
            Projects
          </h2>

          <div className="py-0">
            <ProjectCarousel projects={projects} />
          </div>
        </section>

        <section id="experience" className="py-16 md:py-20">
          <h2 className="mb-10 text-5xl font-semibold tracking-tighter text-zinc-100 md:text-6xl">
            Experience &amp; Education
          </h2>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {timeline.map(({ title, meta, detail, icon: Icon }) => (
                <div
                  key={title}
                  className="group border border-zinc-800 bg-zinc-950/70 p-5 transition-colors duration-200 hover:border-blue-400/45"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-400/10 text-blue-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] tracking-[0.22em] text-blue-400 uppercase">
                        {title}
                      </div>
                      <div className="mt-2 text-xl tracking-tighter text-zinc-100">
                        {meta}
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                        {detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="border border-zinc-800 bg-zinc-950/70 px-5 py-6"
                >
                  <div className={`text-4xl tracking-tighter md:text-5xl ${
                    index === 0 ? 'text-cyan-300' : index === 1 ? 'text-violet-300' : 'text-emerald-300'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="mt-3 font-mono text-xs tracking-[0.22em] text-zinc-500 uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 md:py-32">
          <div className="mb-8">
            <p className="font-mono text-xs tracking-[0.24em] text-blue-400 uppercase">Contact</p>
            <h2 className="mt-3 text-3xl tracking-tighter text-zinc-100 md:text-4xl">Get in touch</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">Prefer email? Drop a message here and I’ll get back within a few days.</p>
          </div>

          <div className="contact-card p-6 md:p-8">
            <form onSubmit={handleContactSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="sr-only">Name</label>
                <input name="name" placeholder="Your Name" className="contact-input w-full" />
              </div>
              <div>
                <label className="sr-only">Email</label>
                <input name="email" placeholder="Your E-Mail" className="contact-input w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="sr-only">Subject</label>
                <input name="subject" placeholder="Your Subject" className="contact-input w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="sr-only">Message</label>
                <textarea name="message" placeholder="Your Message" className="contact-input contact-textarea w-full" />
              </div>
              <div className="md:col-span-2 flex items-center justify-between gap-4">
                <div className="text-sm text-zinc-400">
                  {contactMessage ? (
                    <span className={contactStatus === 'error' ? 'text-rose-400' : 'text-blue-400'}>
                      {contactMessage}
                    </span>
                  ) : (
                    <>
                      Or email me at <a href="mailto:parvag2305@gmail.com" className="text-blue-400">parvag2305@gmail.com</a>
                    </>
                  )}
                </div>
                <button type="submit" className="contact-submit disabled:cursor-not-allowed disabled:opacity-60" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="py-32 md:py-40">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-blue-400 uppercase">
                Call to Action
              </p>
              <h2 className="mt-4 max-w-4xl text-balance text-5xl leading-[0.9] tracking-tighter text-zinc-100 sm:text-6xl md:text-7xl lg:text-[6rem]">
                Let&apos;s build something scalable.
              </h2>
            </div>

            <div className="space-y-4 lg:justify-self-end">
              <a
                href="mailto:parvag2305@gmail.com"
                className="flex items-center justify-between border border-zinc-800 px-5 py-4 text-zinc-100 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase">Email</span>
                <Mail className="h-4 w-4 text-zinc-400" />
              </a>
              <a
                href="https://github.com/parvgarg05"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-zinc-800 px-5 py-4 text-zinc-100 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase">GitHub</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/parvgarg23/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-zinc-800 px-5 py-4 text-zinc-100 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase">LinkedIn</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 pt-8 text-xs tracking-[0.2em] text-zinc-500 uppercase md:flex-row md:items-center md:justify-between">
            <span>Parv Garg</span>
            <span>Full-Stack Developer</span>
            <span>{currentYear}</span>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
