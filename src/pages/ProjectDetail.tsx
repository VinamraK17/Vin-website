import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, ShieldAlert, Award, TrendingUp, CheckCircle, Server } from "lucide-react";
import { motion } from "motion/react";

interface CaseStudy {
  title: string;
  tag: string;
  stats: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  role: string;
  timeline: string;
  impactMetric: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  "nexus": {
    title: "NEXUS: AI Troubleshooting",
    tag: "Telecom AI",
    stats: "5M+ Users",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    description: "Spearheaded the first AI-driven troubleshooting engine for technical support at Sunrise GmbH, significantly reducing support volume and improving user experience.",
    challenge: "Support agents were overwhelmed with repetitive Wi-Fi and network diagnostics calls. Traditional diagnostic tools were fragmented, resulting in high average handling times and low customer satisfaction.",
    solution: "Designed and launched 'NEXUS', a proactive, automated diagnostics portal. NEXUS interfaces directly with device telemetry APIs, runs automated line checks, and uses rule-based and predictive models to guide customers through self-resolution steps.",
    results: [
      "Secured 2.4M CHF in annual operational savings.",
      "Achieved a 20% year-on-year improvement in digital self-care resolution.",
      "Optimized authentication and connection flow, boosting customer NPS from 70% to 90%."
    ],
    techStack: ["React", "TypeScript", "Node.js", "GraphQL", "Telemetry APIs", "Kubernetes", "Splunk"],
    role: "Lead Product Owner (Digital Support Automation)",
    timeline: "18 Months (2022 - 2024)",
    impactMetric: "2.4M CHF Saved"
  },
  "genai": {
    title: "GenAI Strategy & MVP",
    tag: "Digital Transformation",
    stats: "8M+ CHF Saved",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    description: "Orchestrated the multi-year GenAI roadmap to automate high-volume customer journeys, defining the convergence of LLMs and business strategy.",
    challenge: "Traditional IVRs and chatbots had rigid decision trees, leading to poor customer experiences. Implementing LLMs required solving issues related to hallucinations, GDPR compliance, and complex integration with legacy billing platforms.",
    solution: "Devised a comprehensive GenAI roadmap, aligning C-level executives. Launched safe MVP trials utilizing Retrieval-Augmented Generation (RAG) and custom LLM gateway guardrails for privacy and safety.",
    results: [
      "Delivered 8M+ CHF in annual efficiency savings through automated process execution.",
      "Successfully automated 6 high-volume, multi-turn customer care journeys.",
      "Maintained a near-zero hallucination rate using strict contextual embeddings and deterministic fallbacks."
    ],
    techStack: ["OpenAI API", "LangChain", "Vector Databases", "Python", "React", "GDPR Guardrails", "Azure Cloud"],
    role: "Manager - Digital Transformation Strategy",
    timeline: "Ongoing (Launched 2024)",
    impactMetric: "8M+ CHF Value"
  },
  "lido": {
    title: "Lido Aviation DMS",
    tag: "Aviation Software",
    stats: "60% Efficiency",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1200",
    description: "Led the transformation of legacy flight navigation data management systems (DMS) into high-efficiency microservices for Lufthansa Systems (LSY AG).",
    challenge: "Safety-critical flight navigation databases were produced using monolithic legacy applications. The cycle time to process and package worldwide aeronautical updates was 5 days, leaving no room for operational flexibility.",
    solution: "Led a cross-border agile team of 15+ engineers to rebuild the data pipeline. Transitioned the monolith to cloud-native microservices, automated GIS verification layers, and created a unified navigation console.",
    results: [
      "Reduced navigation database turnaround cycle from 5 days to 2 days (60% efficiency gain).",
      "Achieved zero data incidents across critical global airline update releases.",
      "Exceeded annual cost-saving targets by 40% through infrastructure modernization."
    ],
    techStack: ["Java / Spring Boot", "Docker", "Kafka", "PostgreSQL", "GIS Engine", "React Admin Portal"],
    role: "Product Owner (Navigation Services)",
    timeline: "4 Years (2018 - 2022)",
    impactMetric: "60% Turnaround Gain"
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  let slug = id || "nexus";
  
  // Mapping fallback for legacy numeric routes (if any)
  if (slug === "0" || slug === "1") slug = "nexus";
  else if (slug === "2") slug = "genai";
  else if (slug === "3") slug = "lido";

  const caseStudy = CASE_STUDIES[slug] || CASE_STUDIES["nexus"];

  return (
    <div className="min-h-screen pb-32 pt-6">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors mb-12 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono border border-[var(--color-border)] px-3 py-1 rounded-full uppercase tracking-widest text-[var(--color-accent)] font-bold">
              {caseStudy.tag}
            </span>
            <span className="text-[10px] font-mono bg-[var(--color-ink)] text-[var(--color-surface)] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
              {caseStudy.stats}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-ink)] leading-none uppercase">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-[var(--color-ink-faint)] font-light leading-relaxed">
            {caseStudy.description}
          </p>
        </div>

        <div className="h-[400px] rounded-[32px] overflow-hidden mb-16 relative">
          <img 
            referrerPolicy="no-referrer"
            src={caseStudy.image} 
            alt={caseStudy.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-8 border border-[var(--color-border)] rounded-3xl mb-16 bg-[var(--color-ink)]/[0.01]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">Role Played</span>
            <p className="text-sm font-semibold text-[var(--color-ink)] mt-1">{caseStudy.role}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">Timeline</span>
            <p className="text-sm font-semibold text-[var(--color-ink)] mt-1">{caseStudy.timeline}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">Business Impact</span>
            <p className="text-sm font-semibold text-[var(--color-accent)] mt-1">{caseStudy.impactMetric}</p>
          </div>
        </div>

        <div className="space-y-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--color-ink)]">
              <ShieldAlert className="w-6 h-6 text-red-500/70" />
              The Challenge
            </h2>
            <p className="text-md text-[var(--color-ink)]/70 font-light leading-relaxed pl-9">
              {caseStudy.challenge}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--color-ink)]">
              <Cpu className="w-6 h-6 text-[var(--color-accent)]" />
              The Strategy & Solution
            </h2>
            <p className="text-md text-[var(--color-ink)]/70 font-light leading-relaxed pl-9">
              {caseStudy.solution}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--color-ink)]">
              <TrendingUp className="w-6 h-6 text-emerald-500/70" />
              Key Deliverables & Outcomes
            </h2>
            <div className="pl-9 space-y-4">
              {caseStudy.results.map((result, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-[var(--color-ink)]/[0.02] p-4 rounded-2xl border border-[var(--color-border)]">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--color-ink)]/80 leading-normal">{result}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--color-ink)]">
              <Server className="w-6 h-6 text-blue-500/70" />
              Technical Stack & Tools
            </h2>
            <div className="pl-9 flex flex-wrap gap-2.5">
              {caseStudy.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-[var(--color-ink)]/[0.04] text-[var(--color-ink)] rounded-xl text-xs font-mono border border-[var(--color-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
