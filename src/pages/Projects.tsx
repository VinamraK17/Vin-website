import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ProjectsProps {
  projects: any[];
  isLoadingProjects: boolean;
}

export default function Projects({ projects, isLoadingProjects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const projectCategories = ["All", ...Array.from(new Set((Array.isArray(projects) ? projects : []).map(p => p.tag).filter(Boolean)))];
  const filteredProjects = selectedCategory === "All"
    ? (Array.isArray(projects) ? projects : [])
    : (Array.isArray(projects) ? projects : []).filter(project => project.tag === selectedCategory);

  return (
    <div className="space-y-12 pb-32 pt-12">
      <section className="max-w-6xl mx-auto">
        <span className="section-label">Selected Portfolio</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-ink)] leading-none uppercase mt-4 mb-6">
          Case Studies & <br/>
          <span className="text-[var(--color-ink)]/30 italic font-light">Product Roadmaps</span>
        </h1>
        <p className="max-w-3xl text-lg text-[var(--color-ink-faint)] font-light leading-relaxed">
          Explore detailed case studies outlining project backgrounds, cross-functional orchestration, technical architectures, and financial impact metrics across multiple industries.
        </p>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2.5 mt-10 mb-10">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingProjects ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[450px] rounded-[32px] bg-[var(--color-ink)]/[0.05] animate-pulse relative overflow-hidden" />
            ))
          ) : (
            filteredProjects.map((project, i) => {
              const projectIndex = projects.findIndex(p => p.title === project.title);
              const pathIndex = project.id !== undefined ? project.id : projectIndex;
              return (
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
                    <Link 
                      to={`/projects/${pathIndex}`} 
                      className="inline-flex items-center gap-1 text-[var(--color-accent)] text-xs font-mono uppercase tracking-widest hover:underline"
                    >
                      Read Case Study & Architecture →
                    </Link>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
