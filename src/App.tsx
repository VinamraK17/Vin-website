import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

const STATIC_PROJECTS = [
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

const STATIC_EXPERIENCES = [
  {
    company: "Sunrise GmbH",
    role: "Manager Digital Transformation",
    period: "Feb 2024 – Present",
    location: "Zurich, Switzerland",
    description: "Owning the digital product strategy for a CHF 1B+ telco, aligning 5+ cross-functional teams around a unified transformation roadmap that accelerated time-to-market across the entire portfolio.",
    achievements: [
      "Digital Leadership: Managed a multi-million franc digital product portfolio, embedding OKR and KPI frameworks that connected product delivery directly to business revenue targets.",
      "Strategic Alignment: Built and governed an ecosystem of external partners and vendors, ensuring delivery quality, cost discipline, and strategic alignment across the full product development lifecycle.",
      "Market Competitive Positioning: Led ongoing market and trend analysis, enabling the business to identify and act on digital opportunities ahead of competitors.",
      "Financial Performance: Secured 8M+ CHF in annual efficiency savings through strategic GenAI integrations and process automation."
    ]
  },
  {
    company: "Sunrise GmbH",
    role: "Product Owner Digital Transformation",
    period: "Sep 2022 – Feb 2024",
    location: "Zürich Metropolitan Area",
    description: "Architected and shipped NEXUS — an LLM-powered AI troubleshooting platform serving 5M+ customers — leading a cross-functional team of 9 from zero to full production, reducing inbound tech support call volumes.",
    achievements: [
      "NEXUS Platform Architecture: Designed the end-to-end system architecture, making core infrastructure decisions on AI model integration, scalability, and platform resilience for millions of concurrent users.",
      "Cost Optimization: Exceeded departmental cost targets by 20% in 2023 by redesigning team operating models around the customer journey.",
      "Agile Delivery: Surpassed all departmental KPIs by 20% by owning product delivery end-to-end — from vision and business case through to launch and iteration.",
      "Team Development: Led People Development for a core agile team of 15+ engineers and designers."
    ]
  },
  {
    company: "Lufthansa Systems",
    role: "Product Owner",
    period: "Mar 2018 – Aug 2022",
    location: "Zurich, Switzerland (Hybrid)",
    description: "Modernized a mission-critical internal application portfolio of 77 tools — leading a cross-functional team of 8 and driving a 60% increase in operational efficiency across international operations in Zurich and Gdansk.",
    achievements: [
      "Operational Savings: Delivered 40%+ savings against budget by replacing legacy workflows with agile, automation-first practices.",
      "Risk & Compliance Management: Ensured zero critical compliance gaps across all 77 aviation applications by building and maintaining a live risk register meeting stringent international aeronautical regulatory standards.",
      "Global Team Alignment: Unified stakeholder alignment across two international locations, eliminating release delays through structured backlog management."
    ]
  },
  {
    company: "Lufthansa Systems",
    role: "Production Manager Data Driven Maps Program Lido/Navigation",
    period: "Feb 2016 – Feb 2018",
    location: "Zurich, Switzerland",
    description: "Launched a first-of-its-kind production process for the Data Driven Maps Program from zero to full implementation — defining quality standards, securing regulatory certifications, and scaling operations on time.",
    achievements: [
      "Procurement Cost Optimization: Reduced procurement costs by conducting rigorous make-or-buy analyses, selecting the optimal mix of external partners and internal capabilities.",
      "Skill Development & Capacity Building: Future-proofed the team by identifying critical skill gaps and building targeted training plans.",
      "Risk Mitigation: Mitigated program delivery risk by designing a robust transition plan that bridged current operations with future objectives."
    ]
  },
  {
    company: "Lufthansa Systems",
    role: "Manager Production Lido/Navigation",
    period: "May 2012 – Mar 2016",
    location: "Zurich, Switzerland",
    description: "Led a multicultural production team of 19 FTE, managing the full AIRAC cycle — ensuring on-time, compliant delivery of aeronautical products to airline customers across international markets.",
    achievements: [
      "People Development: Drove team performance and retention by owning hiring, compensation decisions, and onboarding.",
      "Process Optimization: Improved cross-site coordination between Zurich and Gdansk by restructuring communication and process workflows, eliminating delays."
    ]
  },
  {
    company: "Lufthansa Systems",
    role: "Quality Assurance / Aeronautical Chart Specialist",
    period: "May 2009 – May 2012",
    location: "Zurich, Switzerland",
    description: "Maintained zero-defect delivery of aeronautical charts to airline customers by ensuring full compliance with international safety and quality standards across every AIRAC cycle.",
    achievements: [
      "Mentorship: Accelerated team capability by mentoring and training new hires, reducing onboarding time.",
      "Quality Controls: Led the testing and evaluation of new tools before production integration, protecting operational continuity."
    ]
  },
  {
    company: "Airports Authority of India (AAI)",
    role: "Air Traffic Controller",
    period: "Apr 2006 – May 2009",
    location: "Greater Delhi Area, India",
    description: "Ensured the safe and efficient movement of hundreds of aircraft and thousands of passengers daily at IGI Airport New Delhi — operating ATC (Non-Radar) services across Delhi FIR with zero margin for error.",
    achievements: [
      "Capacity Expansion: Contributed directly to airport capacity expansion by participating in the commissioning of Runway 11/29 and developing new ATC procedures.",
      "Controller Training: Developed training notes, presentations, and simulator exercises for the Area Control Centre, raising performance standards."
    ]
  }
];

const CERTIFICATIONS = [
  {
    name: "Generative AI Leader Certification",
    issuer: "Google Cloud"
  },
  {
    name: "Professional Certificate in Digital Transformation",
    issuer: "Massachusetts Institute of Technology (MIT)"
  },
  {
    name: "Certified SAFe® 6 Product Owner/Product Manager",
    issuer: "SAFe by Scaled Agile, Inc."
  },
  {
    name: "Certified SAFe® 5 Product Owner/Product Manager",
    issuer: "SAFe by Scaled Agile, Inc."
  },
  {
    name: "Certified Scrum Product Owner (CSPO)",
    issuer: "Scrum Alliance"
  },
  {
    name: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance"
  },
  {
    name: "Zertifikat Deutsch / telc Deutsch B1",
    issuer: "telc GmbH - The European Language Certificates"
  },
  {
    name: "PRINCE2® Practitioner & Foundation in Project Management",
    issuer: "AXELOS Global Best Practice"
  },
  {
    name: "PANS OPS Procedure Design",
    issuer: "airsight GmbH"
  }
];

const IMPACT_VALUES = {
  chf: "10M",
  usd: "10M",
  inr: "100Cr"
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme-mode") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    document.documentElement.setAttribute("data-theme", "studio");
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [dbStatus, setDbStatus] = useState<any>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects(STATIC_PROJECTS);
        }
        setIsLoadingProjects(false);
      })
      .catch((err) => {
        console.warn("Using fallback projects:", err);
        setProjects(STATIC_PROJECTS);
        setIsLoadingProjects(false);
      });

    fetch("/api/experiences")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setExperiences(data);
        } else {
          setExperiences(STATIC_EXPERIENCES);
        }
        setIsLoadingExperiences(false);
      })
      .catch((err) => {
        console.warn("Using fallback experiences:", err);
        setExperiences(STATIC_EXPERIENCES);
        setIsLoadingExperiences(false);
      });

    fetch("/api/db-status")
      .then(res => res.json())
      .then(data => setDbStatus(data))
      .catch(() => setDbStatus({ status: "error" }));
  }, []);

  const handleLinkClick = (label: string, url: string) => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "link_click", details: { label, url }, timestamp: new Date().toISOString() })
    }).catch(err => console.error("Analytics error:", err));
  };

  return (
    <div className="min-h-screen selection:bg-[var(--color-accent)] selection:text-white pt-[76px]">
      <Navbar mode={mode} setMode={setMode} />
      <ScrollToTop />
      
      <main className="px-6 relative z-10 copy-protected">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                projects={projects} 
                isLoadingProjects={isLoadingProjects} 
                handleLinkClick={handleLinkClick} 
                impactValues={IMPACT_VALUES} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <About 
                experiences={experiences} 
                isLoadingExperiences={isLoadingExperiences} 
                certifications={CERTIFICATIONS} 
              />
            } 
          />
          <Route 
            path="/projects" 
            element={<Projects projects={projects} isLoadingProjects={isLoadingProjects} />} 
          />
          <Route 
            path="/projects/:id" 
            element={<ProjectDetail />} 
          />
          <Route 
            path="/contact" 
            element={<Contact handleLinkClick={handleLinkClick} />} 
          />
          <Route 
            path="/privacy" 
            element={<Privacy />} 
          />
        </Routes>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-mono tracking-widest text-[var(--color-ink)] opacity-40 uppercase">© {new Date().getFullYear()} VINAMRA KUMAR™. ALL RIGHTS RESERVED.</div>
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
          <Link to="/privacy" className="text-[10px] uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">Privacy Policy</Link>
          <a href="#" className="text-[10px] uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">Swiss Professional</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
