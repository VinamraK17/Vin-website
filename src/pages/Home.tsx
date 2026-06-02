import { motion } from "motion/react";
import { Mail, Linkedin, Award, Briefcase, Cpu, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const getSlug = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("nexus")) return "nexus";
  if (t.includes("genai") || t.includes("strategy")) return "genai";
  if (t.includes("lido") || t.includes("aviation")) return "lido";
  return "nexus";
};

interface HomeProps {
  projects: any[];
  isLoadingProjects: boolean;
  handleLinkClick: (label: string, url: string) => void;
  impactValues: { chf: string; usd: string; inr: string };
}

export default function Home({ projects, isLoadingProjects, handleLinkClick, impactValues }: HomeProps) {
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

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto pt-24">
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
              <Link 
                to="/contact" 
                className="flex items-center gap-2 group border border-[var(--color-border)] px-6 py-3 rounded-2xl hover:bg-[var(--color-accent)]/10 transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors" />
                <span className="text-sm font-medium text-[var(--color-ink)]">Contact Me</span>
              </Link>
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
      <section className="max-w-6xl mx-auto">
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
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                Explore Full Career Timeline & Credentials →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { 
              label: "Financial Impact", 
              value: `CHF ${impactValues.chf}`, 
              detail: (
                <div className="flex flex-col gap-0.5">
                  <span>{impactValues.usd} USD</span>
                  <span>{impactValues.inr} INR</span>
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

      {/* Strategic Trust */}
      <section className="max-w-6xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-[32px] border border-[var(--color-border)]">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]/50 font-mono font-bold">Landmark Organizations & Credentials</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-center">
            <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
              <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">Sunrise GmbH</span>
              <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Switzerland</span>
            </div>
            <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
              <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">Lufthansa Systems</span>
              <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">LSY AG</span>
            </div>
            <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
              <span className="font-sans font-bold text-base text-[var(--color-ink)] tracking-tight">AAI</span>
              <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Airports Authority of India</span>
            </div>
            <div className="flex flex-col justify-center p-6 bg-[var(--color-ink)]/[0.01] hover:bg-[var(--color-ink)]/[0.03] rounded-2xl border border-[var(--color-border)] transition-all w-full h-24 text-center">
              <span className="font-serif font-bold text-base italic text-[var(--color-ink)] tracking-tight">MIT Professional</span>
              <span className="text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-1">Digital Transformation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="section-label">Portfolio Highlights</span>
            <h2 className="text-4xl font-bold text-[var(--color-ink)] tracking-tight leading-tight mt-2">
              Transformative Projects
            </h2>
          </div>
          <Link 
            to="/projects" 
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] hover:opacity-80 transition-opacity"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingProjects ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[400px] rounded-[32px] bg-[var(--color-ink)]/[0.05] animate-pulse relative overflow-hidden" />
            ))
          ) : (
            projects.slice(0, 3).map((project, i) => (
              <motion.div 
                key={project.id || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[400px] overflow-hidden rounded-[32px] glass"
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
                  <h3 className="text-2xl font-display font-medium text-[var(--color-ink)] mb-4">{project.title}</h3>
                  <p className="text-[var(--color-ink)]/60 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  <Link 
                    to={`/projects/${getSlug(project.title)}`} 
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    View Case Study →
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Core Competencies Bento */}
      <section className="max-w-6xl mx-auto">
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
      <section className="max-w-6xl mx-auto">
        <span className="section-label">Management Toolkit</span>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["JIRA", "Confluence", "Miro", "FigJam", "Trello", "Mural", "ALM Octane", "SurveyMonkey", "MentiMeter", "MS Office", "PowerBI", "Azure DevOps"].map(tool => (
            <div key={tool} className="glass p-4 text-center rounded-xl border border-[var(--color-ink)]/5 hover:border-[var(--color-ink)]/20 transition-all">
              <span className="text-[11px] font-mono tracking-widest text-[var(--color-ink)]/60">{tool}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
