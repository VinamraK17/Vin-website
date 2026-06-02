import { motion, AnimatePresence } from "motion/react";
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Cpu, 
  Users, 
  Award, 
  GraduationCap, 
  ArrowUpRight,
  Send,
  CheckCircle2,
  Calendar,
  Briefcase,
  Sun,
  Moon,
  Palette,
  Terminal,
  Gem
} from "lucide-react";
import React, { useState, FormEvent, useEffect, useCallback } from "react";
const trackEvent = (event: string, details: any = {}) => {
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, details, timestamp: new Date().toISOString() })
  }).catch(err => console.error("Analytics error:", err));
};

const EXPERIENCES = [
  {
    company: "Sunrise GmbH",
    role: "Manager - Digital Transformation",
    period: "03/2024 – Present",
    location: "Zurich, CH",
    description: "Orchestrating high-level digital product strategy across six cross-functional journey teams. Bridging business needs, IT architecture, and emerging tech to redefine customer engagement.",
    achievements: [
      "People Leadership: Leading 6 cross-functional journey teams (UI/UX, Dev, QA, Biz) to unify the digital experience.",
      "C-Level Engagement: Regular reporting and strategy alignment with executive leadership to drive multi-year transformation goals.",
      "Delivery: Secured 8M+ CHF in annual efficiency savings through strategic GenAI integrations and process automation.",
      "Optimized the digital log-in and authentication journey, boosting NPS from 70% to 90%."
    ]
  },
  {
    company: "Sunrise GmbH",
    role: "Product Owner (Digital Transformation)",
    period: "09/2022 – 02/2024",
    location: "Zurich, CH",
    description: "Spearheaded the 'Digital First' initiative for technical support, managing a core agile team focused on proactive service and self-care automation.",
    achievements: [
      "Delivered 2.4M CHF additional cost savings through streamlined support flows and 'Digital First' initiatives.",
      "Launched 'NEXUS', the first AI-driven troubleshooting platform, serving 5M+ customers with zero downtime delivery.",
      "Achieved a 20% year-on-year improvement in digital support resolution rates through data-driven prioritization.",
      "Led People Development for a core agile team of 15+ engineers and designers."
    ]
  },
  {
    company: "LSY AG / Lufthansa Systems",
    role: "Product Owner",
    period: "03/2018 – 08/2022",
    location: "Zurich, CH",
    description: "Led development for state-of-the-art aviation navigation systems and Data Management Suites (DMS), coordinating between Zurich and Gdansk engineering hubs.",
    achievements: [
      "Revolutionized aviation data production cycles, reducing turnaround from 5 days to 2 days (60% efficiency gain).",
      "Exceeded annual cost-saving targets by 40% through infrastructure modernization and lean product processes.",
      "Successfully navigated complex transition of legacy monoliths to cloud-ready microservices.",
      "Maintained a 0-incident record for safety-critical navigation software updates."
    ]
  },
  {
    company: "Lufthansa Systems (via External Partnership)",
    role: "Product Manager – Navigation Services",
    period: "05/2014 – 02/2018",
    location: "Zurich, CH",
    description: "Bridged the gap between airline operational requirements and technical engineering for flight navigation databases and aeronautical maps.",
    achievements: [
      "Streamlined requirement gathering processes for major European airline customers.",
      "Reduced navigation database errors by introducing automated validation checks during the PM review phase.",
      "Coordinated cross-border releases for Lufthansa Group's Lido/Navigation suite."
    ]
  },
  {
    company: "Airports Authority of India (AAI)",
    role: "Manager Operations – Air Traffic Control",
    period: "04/2005 – 04/2014",
    location: "India",
    description: "Commanded radar-based operations in safety-regulated, high-stress aviation environments. Managed mission-critical systems and led tactical decision-making.",
    achievements: [
      "People Leadership: Directed operational shifts and mentored over 50 junior controllers in mission-critical environments.",
      "Stakeholder Engagement: Coordinated with international aviation bodies and regulatory agencies for airspace design.",
      "Delivery: Led implementation of standardized procedural updates that increased runway throughput by 10%.",
      "Managed safe traffic flow for up to 60 aircraft per hour with zero-error performance under pressure."
    ]
  }
];

const COMPETENCIES = [
  {
    title: "Leadership & Stakeholders",
    skills: ["People Leadership", "C-Level Engagement", "Product Transformation", "Cross-Functional Synergy", "Vendor Relations"]
  },
  {
    title: "Product Management",
    skills: ["Vision & Roadmapping", "Customer Discovery", "AI-Enabled Tech Stack", "GTM Strategy", "Agile at Scale"]
  },
  {
    title: "Delivery & Execution",
    skills: ["End-to-End Delivery", "RAID & Risk Mitigation", "KPI & OKR Tracking", "Budget Management", "Change Management"]
  }
];

const SKILLS = {
  "Product Strategy": ["Product Vision", "Roadmapping", "Market Research", "Product Lifecycle", "Lean Product Development"],
  "Agile & Leadership": ["Scrum & Kanban", "SAFe 6 POPM", "Stakeholder Management", "Cross-functional Leadership", "Mentoring"],
  "Emerging Tech": ["GenAI & LLM", "Cloud-native Architecture", "IoT", "Blockchain", "Data-Driven Decision Making"]
};

const CERTIFICATIONS = [
  {
    name: "Professional Certificate in Digital Transformation",
    issuer: "Massachusetts Institute of Technology (MIT)"
  },
  {
    name: "SAFe 6 Product Owner / Product Manager",
    issuer: "Scaled Agile Academy"
  },
  {
    name: "Certified Scrum Product Owner (CSPO)",
    issuer: "Scrum Alliance"
  },
  {
    name: "Certified Scrum Master (CSM)",
    issuer: "Scrum Alliance"
  },
  {
    name: "PRINCE2 Practitioner & Foundation",
    issuer: "PeopleCert / AXELOS"
  }
];

const PROJECTS = [
  {
    title: "NEXUS: AI Troubleshooting",
    tag: "Telecom AI",
    stats: "5M+ Users",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Spearheaded the first AI-driven troubleshooting engine for technical support at Sunrise GmbH, significantly reducing support volume."
  },
  {
    title: "GenAI Strategy & MVP",
    tag: "Digital Transformation",
    stats: "8M+ CHF Saved",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "Orchestrating the GenAI roadmap to automate high-volume customer journeys, defining the convergence of LLMs and business strategy."
  },
  {
    title: "Lido Aviation DMS",
    tag: "Aviation Software",
    stats: "60% Efficiency",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800",
    description: "Led the transformation of legacy flight navigation data management systems into high-efficiency microservices for Lufthansa Systems."
  }
];

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" }
];

const IMPACT_VALUES = {
  chf: "10M",
  usd: "10M",
  inr: "100Cr",
  chf_raw: "7,420,140",
  usd_raw: "8,384,750",
  inr_raw: "1,000,000,000"
};

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-mode') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-theme', 'studio');
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [emailAddress, setEmailAddress] = useState("•••••••@vinamrakumar.com");

  useEffect(() => {
    if (isEmailRevealed) {
      const timer = setTimeout(() => {
        setIsEmailRevealed(false);
        setEmailAddress("•••••••@vinamrakumar.com");
      }, 120000);
      return () => clearTimeout(timer);
    }
  }, [isEmailRevealed]);

  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const projectCategories = ["All", ...Array.from(new Set((Array.isArray(projects) ? projects : []).map(p => p.tag).filter(Boolean)))];
  const filteredProjects = selectedCategory === "All"
    ? (Array.isArray(projects) ? projects : [])
    : (Array.isArray(projects) ? projects : []).filter(project => project.tag === selectedCategory);

  useEffect(() => {
    // Fetch Projects
    fetch("/api/projects")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects(PROJECTS);
        }
        setIsLoadingProjects(false);
      })
      .catch((err) => {
        console.warn("Using fallback projects:", err);
        setProjects(PROJECTS); // Fallback to static if API fails
        setIsLoadingProjects(false);
      });

    // Fetch Experiences
    fetch("/api/experiences")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setExperiences(data);
        } else {
          setExperiences(EXPERIENCES);
        }
        setIsLoadingExperiences(false);
      })
      .catch((err) => {
        console.warn("Using fallback experiences:", err);
        setExperiences(EXPERIENCES); // Fallback to static if API fails
        setIsLoadingExperiences(false);
      });
  }, []);

  useEffect(() => {
    trackEvent("page_view", { url: window.location.pathname });
    
    // Clean URL hash on load
    if (window.location.hash) {
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname);
      }, 500);
    }
  }, []);

  const revealEmail = useCallback(async () => {
    const showEmail = (emailStr: string) => {
      setEmailAddress(emailStr);
      setIsEmailRevealed(true);
    };

    try {
      const emailRes = await fetch("/api/reveal-email");
      if (emailRes.ok) {
        const emailData = await emailRes.json();
        showEmail(emailData.email);
      } else {
        throw new Error("API error");
      }
    } catch (emailErr) {
      console.warn("Using fallback email due to:", emailErr);
      showEmail("contact@vinamrakumar.com");
    }
  }, []);

  const hideEmail = useCallback(() => {
    setIsEmailRevealed(false);
    setEmailAddress("•••••••@vinamrakumar.com");
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Ensure URL stays clean for any section
        history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const [dbStatus, setDbStatus] = useState<any>(null);
  useEffect(() => {
    fetch("/api/db-status")
      .then(res => res.json())
      .then(data => setDbStatus(data))
      .catch(() => setDbStatus({ status: "error" }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus('sending');
    setSubmitError(null);
    trackEvent("contact_form_submit_start");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();

      if (res.ok && result.success) {
        setFormStatus('sent');
        trackEvent("contact_form_submit_success");
        // Reveal email on success from server response
        setIsEmailRevealed(true);
        if (result.email) setEmailAddress(result.email);
      } else {
        throw new Error(result.error || result.message || "Failed to send");
      }
    } catch (err: any) {
      console.error(err);
      setFormStatus('idle');
      setSubmitError(`Submission failed: ${err.message}. Please try again.`);
    }
  };

  const handleLinkClick = (label: string, url: string) => {
    trackEvent("link_click", { label, url });
  };

  return (
    <div className="min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
      {/* Navigation */}
      <nav className="glass-nav px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => handleSmoothScroll(e, "#")}
              className="font-display font-bold text-xl tracking-tighter text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            >
              VK.
            </a>
            
            {/* Mode Switcher */}
            <div className="flex items-center border border-[var(--color-border)] rounded-full p-1 bg-[var(--color-ink)]/[0.03] backdrop-blur-md shadow-xl shadow-black/10">
              <button 
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-full text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-all flex items-center gap-2 px-3"
                title={mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {mode === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-[11px] uppercase tracking-widest text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-full text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all font-mono"
            >
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      <main className="px-6 relative z-10">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto pt-24 pb-32">
          <div className="grid lg:grid-cols-[1fr_350px] gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Digital Transformation Leader</span>
              <h1 className="text-7xl md:text-9xl font-bold mb-8 leading-[0.85] tracking-tighter uppercase p-2">
                Vinamra <br/>
                Kumar
              </h1>
              <p className="max-w-2xl text-xl text-[var(--color-ink-faint)] font-light leading-relaxed mb-8">
                MIT-certified Product Leader with 20+ years of experience leading complex, high-impact digital 
                products and AI strategies. Specialized in bridging business strategy with technical execution 
                to unlock multi-million dollar value in telecom and aviation sectors.
              </p>
              <p className="max-w-2xl text-sm text-[var(--color-ink-faint)]/60 font-light leading-relaxed mb-12 italic">
                Currently driving digital evolution at Sunrise GmbH, following a distinguished tenure at 
                Lufthansa Systems and early career foundations as an Air Traffic Controller in India.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className="flex items-center gap-2 group border border-[var(--color-border)] px-6 py-3 rounded-2xl hover:bg-[var(--color-accent)]/10 transition-all"
                >
                    <Mail className="w-4 h-4 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors" />
                    <span className="text-sm font-medium text-[var(--color-ink)]">Contact Me</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/vinamrakumar" 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={() => handleLinkClick("LinkedIn", "https://www.linkedin.com/in/vinamrakumar")}
                  className="flex items-center gap-2 group border border-[var(--color-border)] px-6 py-3 rounded-2xl hover:bg-[var(--color-accent)]/10 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors" />
                  <span className="text-sm font-medium text-[var(--color-ink)]">LinkedIn</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 rounded-full border-2 border-[var(--color-border)] animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-[var(--color-border)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full glass overflow-hidden border-2 border-[var(--color-border)]">
                  <div className="w-full h-full bg-[var(--color-glass)] flex items-center justify-center">
                    <img 
                      src="/hero_hq.jpg" 
                      alt="Vinamra Kumar" 
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-10 right-0 w-16 h-16 glass rounded-2xl flex items-center justify-center border border-[var(--color-border)] animate-bounce">
                <Award className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Deep Dive */}
        <section id="about" className="max-w-6xl mx-auto pb-32">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <span className="section-label">Professional Bio</span>
              <h2 className="text-4xl font-bold text-[var(--color-ink)] tracking-tight leading-tight">
                20+ Years of <br/>
                <span className="text-[var(--color-ink)]/30 italic font-light">Product Leadership.</span>
              </h2>
            </div>
            <div className="space-y-12">
              <div className="text-lg text-[var(--color-ink)]/60 font-light leading-relaxed space-y-6">
                  <p>
                    Product Manager with a proven track record of owning product vision, 
                    driving cross-functional execution, and delivering measurable outcomes in 
                    ambiguous and evolving contexts. I specialize in AI-driven product development, 
                    including GenAI-powered customer assistance platforms.
                  </p>
                  <p>
                    My experience spans highly regulated, large-scale environments like telecom 
                    (Sunrise GmbH) and aviation (Lufthansa Systems), where I lead teams across IT, 
                    engineering, and business to design and validate MVPs from concept to rollout.
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="max-w-6xl mx-auto pb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                label: "Financial Impact", 
                value: `CHF ${IMPACT_VALUES.chf}`, 
                detail: (
                  <div className="flex flex-col gap-0.5">
                    <span>{IMPACT_VALUES.usd} USD</span>
                    <span>{IMPACT_VALUES.inr} INR</span>
                  </div>
                )
              },
              { 
                label: "Cost Reduction", 
                value: "20%+", 
                detail: "CAPEX & OPEX" 
              },
              { label: "Leadership", value: "20+ Yrs", detail: "Industry Experience" },
              { label: "Customer Base", value: "5M+", detail: "Users Impacted" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l border-[var(--color-border)] pl-6"
              >
                <div className="text-3xl md:text-5xl font-display font-medium mb-1 tracking-tighter text-[var(--color-ink)]">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)] mb-1">{stat.label}</div>
                <div className="text-[11px] text-[var(--color-ink-faint)] italic opacity-40 leading-tight">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trusted By & Endorsements Section */}
        <section id="credibility" className="max-w-6xl mx-auto pb-32">
          <div className="text-center mb-16">
            <span className="section-label inline-block">Strategic Trust & Career Credentials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ink)] tracking-tight leading-tight mt-3">
              Credibility in <span className="text-[var(--color-ink)]/30 italic font-light">High-Impact Environments</span>
            </h2>
            <p className="text-[var(--color-ink-faint)] mt-4 max-w-xl mx-auto text-sm">
              Demonstrated leadership and verified execution across Swiss telecommunications, aviation safety, and global systems.
            </p>
          </div>

          {/* Clean Corporate Typography Grid */}
          <div className="glass p-8 md:p-12 rounded-[32px] border border-[var(--color-border)]">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]/50 font-mono font-bold">Landmark Organizations & Credentials</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-center">
              {/* Sunrise */}
              <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
                <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">Sunrise GmbH</span>
                <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Switzerland</span>
              </div>

              {/* Lufthansa Systems */}
              <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
                <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">Lufthansa Systems</span>
                <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">LSY AG</span>
              </div>

              {/* Airports Authority of India */}
              <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
                <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">AAI</span>
                <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Airports Authority of India</span>
              </div>

              {/* MIT Professional */}
              <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
                <span className="font-serif font-bold text-base italic text-[var(--color-ink)] tracking-tight">MIT Professional</span>
                <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Digital Transformation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="max-w-6xl mx-auto pb-32">
          <span className="section-label">Featured Projects & Designs</span>
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5 mt-6 mb-10">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all border ${
                  selectedCategory === category
                    ? "bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)] shadow-md"
                    : "bg-transparent text-[var(--color-ink-faint)] border-[var(--color-border)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingProjects ? (
              // Skeleton Loader for Projects
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[450px] rounded-[32px] bg-[var(--color-ink)]/[0.05] animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 space-y-4">
                    <div className="h-4 w-24 bg-[var(--color-ink)]/10 rounded-full" />
                    <div className="h-8 w-3/4 bg-[var(--color-ink)]/10 rounded-lg" />
                    <div className="h-16 w-full bg-[var(--color-ink)]/10 rounded-lg" />
                  </div>
                </div>
              ))
            ) : (
              filteredProjects.map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-[450px] overflow-hidden rounded-[32px] glass"
                >
                  <img 
                    referrerPolicy="no-referrer"
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-20 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest text-[var(--color-accent)] font-bold">{project.tag}</span>
                      <span className="text-[10px] font-mono bg-[var(--color-ink)] text-[var(--color-surface)] px-3 py-1 rounded-full uppercase tracking-widest font-bold">{project.stats}</span>
                    </div>
                    <h3 className="text-3xl font-display font-medium text-[var(--color-ink)] mb-4">{project.title}</h3>
                    <p className="text-[var(--color-ink)]/60 text-sm leading-relaxed max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Core Competencies Bento */}
        <section id="expertise" className="max-w-6xl mx-auto pb-32">
          <span className="section-label mb-12 block">Core Competencies</span>
          <div className="grid md:grid-cols-3 gap-6">
            {COMPETENCIES.map((cat, i) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[32px] hover:bg-[var(--color-ink)]/[0.05] transition-all border border-[var(--color-ink)]/5"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6">
                  {i === 0 && <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />}
                  {i === 1 && <Cpu className="w-6 h-6 text-[var(--color-accent)]" />}
                  {i === 2 && <Users className="w-6 h-6 text-[var(--color-accent)]" />}
                </div>
                <h3 className="text-xl font-bold mb-6 text-[var(--color-ink)]">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.skills.map(s => (
                    <li key={s} className="flex items-center gap-3 text-sm text-[var(--color-ink-faint)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Expert Toolkit */}
        <section className="max-w-6xl mx-auto pb-32">
          <span className="section-label">Management Toolkit</span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["JIRA", "Confluence", "Miro", "FigJam", "Trello", "Mural", "ALM Octane", "SurveyMonkey", "MentiMeter", "MS Office", "PowerBI", "Azure DevOps"].map(tool => (
              <div key={tool} className="glass p-4 text-center rounded-xl border border-[var(--color-ink)]/5 hover:border-[var(--color-ink)]/20 transition-all">
                <span className="text-[11px] font-mono tracking-widest text-[var(--color-ink)]/60">{tool}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="max-w-6xl mx-auto pb-32">
          <span className="section-label text-center mb-16">Selected Professional Path</span>
          <div className="space-y-6">
            {isLoadingExperiences ? (
              // Skeleton Loader for Experiences
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="grid md:grid-cols-[200px_1fr] glass p-8 animate-pulse">
                  <div className="space-y-4">
                    <div className="h-3 w-24 bg-[var(--color-ink)]/10 rounded-full" />
                    <div className="h-4 w-32 bg-[var(--color-ink)]/10 rounded-full" />
                  </div>
                  <div className="space-y-6">
                    <div className="h-8 w-1/2 bg-[var(--color-ink)]/10 rounded-lg" />
                    <div className="h-16 w-full bg-[var(--color-ink)]/10 rounded-lg" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="h-4 w-full bg-[var(--color-ink)]/5 rounded-full" />
                      <div className="h-4 w-full bg-[var(--color-ink)]/5 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              experiences.map((exp, i) => (
                <motion.div 
                  key={exp.role + exp.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative grid md:grid-cols-[200px_1fr] glass p-8 hover:bg-[var(--color-ink)]/[0.08] transition-all"
                >
                  <div className="mb-6 md:mb-0">
                    <span className="text-[11px] font-mono text-[var(--color-ink)]/30 block mb-2">{exp.period}</span>
                    <div className="flex items-center gap-2 text-[var(--color-ink)]/40 text-sm mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-semibold text-[var(--color-ink)] group-hover:translate-x-1 transition-transform">{exp.role}</h3>
                        <p className="text-[var(--color-ink)]/40 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-[var(--color-ink)]/60 leading-relaxed mb-8 max-w-3xl">
                      {exp.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(exp.achievements as string[] || []).map((achievement, idx) => (
                        <div key={idx} className="flex gap-3 text-sm text-[var(--color-ink)]/50 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-ink)]/20 shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Credentials */}
        <section id="credentials" className="max-w-6xl mx-auto pb-32">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <span className="section-label">Education</span>
              <div className="space-y-8">
                <div className="border-l border-[var(--color-ink)]/10 pl-8">
                  <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">MIT Professional Education</h4>
                  <p className="text-[var(--color-ink)]/40 text-sm mb-1">Digital Transformation Certificate</p>
                  <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2023 – 2024</p>
                </div>
                <div className="border-l border-[var(--color-ink)]/10 pl-8 opacity-60">
                  <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">IMT India</h4>
                  <p className="text-[var(--color-ink)]/40 text-sm mb-1">PGDM (IT & Marketing)</p>
                  <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2011 – 2014</p>
                </div>
                <div className="border-l border-[var(--color-ink)]/10 pl-8 opacity-60">
                  <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">Dr. APJ Kalam University</h4>
                  <p className="text-[var(--color-ink)]/40 text-sm mb-1">B.Tech (Electronics & Communication)</p>
                  <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2001 – 2005</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <span className="section-label">Certifications</span>
              <div className="grid grid-cols-1 gap-4">
                {CERTIFICATIONS.map(cert => (
                  <div key={cert.name} className="flex items-center gap-4 p-4 border border-[var(--color-ink)]/5 rounded-2xl bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.02] hover:border-[var(--color-ink)]/10 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-ink)]/[0.02] border border-[var(--color-ink)]/5 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[var(--color-accent)] opacity-80" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[var(--color-ink)]/80 leading-snug">{cert.name}</span>
                      <span className="text-[11px] text-[var(--color-ink-faint)] mt-0.5">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-6xl mx-auto pb-32">
          <div className="glass p-8 md:p-20 overflow-hidden relative bg-[var(--color-glass)] rounded-[48px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-ink)]/5 blur-[120px] -mr-48 -mt-48 rounded-full" />
            
            {/* Header: Full Width */}
            <div className="mb-16 relative z-10">
              <span className="section-label">Get in touch</span>
              <h2 className="text-5xl font-bold mt-4 mb-8 tracking-tighter text-[var(--color-ink)] leading-none uppercase">
                Let's discuss <br/>
                your next project.
              </h2>
              <p className="text-[var(--color-ink-faint)] max-w-2xl text-lg">
                Have a project in mind? Let's discuss how we can work together to build something exceptional. Open for leadership roles and advisory on digital products and AI strategy.
              </p>
            </div>

            {/* Content Split: 2 Columns */}
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      if (isEmailRevealed) {
                        window.location.href = `mailto:${emailAddress}`;
                      } else {
                        // Scroll to contact form if not revealed
                        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center text-left gap-4 group p-3 rounded-2xl transition-all focus:outline-none cursor-pointer hover:bg-[var(--color-ink)]/[0.02]"
                  >
                    <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-all group-hover:shadow-[0_0_15px_rgba(78,204,163,0.2)]">
                      <Mail className={`w-5 h-5 ${isEmailRevealed ? "text-[var(--color-accent)]" : "text-[var(--color-ink-faint)]"}`} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)]">Email (Personal)</div>
                      <div className={`font-medium transition-all duration-500 font-mono ${isEmailRevealed ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]"}`}>
                        {emailAddress}
                      </div>
                      <div className="text-[9px] text-[var(--color-accent)] opacity-60 font-mono tracking-tighter">
                        {isEmailRevealed ? "Verified & Accessible" : "Verify via Form to Access"}
                      </div>
                    </div>
                  </button>

                  <a 
                    href="https://www.linkedin.com/in/vinamrakumar" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => handleLinkClick("LinkedIn", "https://www.linkedin.com/in/vinamrakumar")}
                    className="flex items-center gap-4 group p-3 rounded-2xl transition-all hover:bg-[var(--color-ink)]/[0.02]"
                  >
                    <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-all group-hover:shadow-[0_0_15px_rgba(78,204,163,0.2)]">
                      <Linkedin className="w-5 h-5 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)]">LinkedIn</div>
                      <div className="font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        vinamrakumar
                      </div>
                      <div className="text-[9px] text-[var(--color-ink-faint)] opacity-40 font-mono tracking-tighter">
                        Connect professionally
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {formStatus === 'sent' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8 bg-[var(--color-ink)]/5 border border-[var(--color-ink)]/10 rounded-[32px]"
                    >
                      <div className="w-16 h-16 rounded-full bg-[var(--color-ink)]/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-[var(--color-ink)]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-[var(--color-ink)]">Verification Successful</h3>
                      <p className="text-[var(--color-ink)]/40 text-sm">Thank you. The personal email <br/>has been successfully revealed.</p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="mt-8 text-xs font-mono uppercase tracking-widest text-[var(--color-ink)]/30 hover:text-[var(--color-ink)]"
                      >
                        Verify again
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink)]/30 ml-2">Name</label>
                          <input required name="name" type="text" className="w-full bg-[var(--color-glass)] border border-[var(--color-ink)]/10 rounded-2xl px-5 py-4 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]/50 transition-all font-mono" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink)]/30 ml-2">Email</label>
                          <input required name="email" type="email" className="w-full bg-[var(--color-glass)] border border-[var(--color-ink)]/10 rounded-2xl px-5 py-4 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]/50 transition-all font-mono" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink)]/30 ml-2">Message (Verification Requirement)</label>
                        <textarea required name="message" className="w-full bg-[var(--color-glass)] border border-[var(--color-ink)]/10 rounded-2xl px-5 py-4 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]/50 transition-all font-mono h-24 resize-none" placeholder="Purpose of contact..." />
                      </div>
                      {submitError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl px-5 py-4 text-xs font-mono">
                          {submitError}
                        </div>
                      )}
                      <button 
                        disabled={formStatus === 'sending'}
                        className="w-full py-5 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[24px] font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 font-mono shadow-lg shadow-[var(--color-accent)]/20"
                      >
                        <div className="flex items-center gap-3">
                          {formStatus === 'sending' ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <>
                              Quick Connect
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </div>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-mono tracking-widest text-[var(--color-ink)] opacity-40 uppercase">© 2024 VINAMRA KUMAR. ALL RIGHTS RESERVED.</div>
          {dbStatus && (
            <div className="flex items-center gap-2 group cursor-help" title={`Storage: ${dbStatus.persistence || "Local"}`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${dbStatus.status === 'active' ? 'bg-[#4ECC9F]' : 'bg-red-500'}`} />
              <span className="text-[9px] font-mono uppercase tracking-tighter text-[var(--color-ink)] opacity-30">
                {dbStatus.type || "DB"} {dbStatus.status === 'active' ? 'Persistent' : 'Storage Offline'}
                <span className="hidden group-hover:inline ml-1">- {dbStatus.persistence}</span>
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-8 opacity-40">
          <a href="#" className="text-[10px] uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">Swiss Professional</a>
        </div>
      </footer>
    </div>
  );
}
