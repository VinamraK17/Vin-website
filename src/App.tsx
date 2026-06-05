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
          <div className="text-[11px] font-mono tracking-widest text-[var(--color-ink)] opacity-40 uppercase">© 2024 VINAMRA KUMAR™. ALL RIGHTS RESERVED.</div>
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
