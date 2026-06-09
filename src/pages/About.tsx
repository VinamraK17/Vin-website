import { motion } from "motion/react";
import { MapPin, CheckCircle2, Award } from "lucide-react";

interface AboutProps {
  experiences: any[];
  isLoadingExperiences: boolean;
  certifications: Array<{ name: string; issuer: string }>;
}

export default function About({ experiences, isLoadingExperiences, certifications }: AboutProps) {
  return (
    <div className="space-y-32 pb-32 pt-12">
      {/* Bio / Summary header */}
      <section className="max-w-6xl mx-auto">
        <span className="section-label">Professional Background</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-ink)] leading-none uppercase mt-4 mb-8">
          Career Journey & <br/>
          <span className="text-[var(--color-ink)]/30 italic font-light">Credentials</span>
        </h1>
        <p className="max-w-3xl text-lg text-[var(--color-ink-faint)] font-light leading-relaxed">
          Over the past two decades, I have spearheaded large-scale digital transformations, built high-performing product organizations, and automated core business operations. My career journey transitions from high-integrity operations in Air Traffic Control to cloud microservices in civil aviation systems, and now to advanced AI-enabled consumer journey optimization.
        </p>

        {/* Leadership Philosophy Card */}
        <div className="mt-12 p-8 border border-[var(--color-border)] rounded-3xl bg-[var(--color-glass)] backdrop-blur-md max-w-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
          <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-wider mb-4 block font-bold">Leadership Philosophy</span>
          <p className="text-md text-[var(--color-ink)]/80 leading-relaxed font-light italic pl-4 border-l border-[var(--color-accent)]/30 mb-4">
            "Most digital transformations fail — not because of the technology, but because the person leading it has never felt the cost of a system breaking down at 2AM with thousands of people depending on it. I have."
          </p>
          <p className="text-sm text-[var(--color-ink-faint)] leading-relaxed font-light">
            Starting my career as an Air Traffic Controller at Delhi's IGI Airport, I was responsible for the safe movement of hundreds of aircraft daily under zero margin for error. That environment rewired how I think about systems, risk, and what operational excellence actually means. From managing aviation databases at Lufthansa Systems to deploying GenAI for millions of Sunrise customers, I bridge the world that demands absolute perfection with the world that demands execution speed.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="max-w-6xl mx-auto">
        <span className="section-label mb-12 block">Detailed Experience</span>
        <div className="space-y-6">
          {isLoadingExperiences ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid md:grid-cols-[200px_1fr] glass p-8 animate-pulse h-60" />
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

      {/* Education & Certifications */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <span className="section-label">Education</span>
            <div className="space-y-8 mt-6">
              <div className="border-l border-[var(--color-ink)]/10 pl-8">
                <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">MIT Professional Education</h4>
                <p className="text-[var(--color-ink)]/40 text-sm mb-1">Professional Certificate in Digital Transformation</p>
                <div className="text-[11px] font-mono text-[var(--color-ink-faint)]/70 space-y-1 mt-2 mb-2">
                  <p>Grade: <span className="text-[var(--color-accent)] font-bold">10/10</span></p>
                  <p className="text-[10px] leading-relaxed">Focus: Strategy & Leadership, Generative & Agentic AI, Blockchain, IoT, Cloud, Cybersecurity, and Platform/Product Family Design.</p>
                </div>
                <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2023 – 2024</p>
              </div>
              <div className="border-l border-[var(--color-ink)]/10 pl-8">
                <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">IMT India</h4>
                <p className="text-[var(--color-ink)]/40 text-sm mb-1">PGDM (IT & Marketing)</p>
                <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2011 – 2014</p>
              </div>
              <div className="border-l border-[var(--color-ink)]/10 pl-8">
                <h4 className="text-xl font-bold mb-1 text-[var(--color-ink)]">Dr. APJ Kalam University</h4>
                <p className="text-[var(--color-ink)]/40 text-sm mb-1">B.Tech (Electronics & Communication)</p>
                <p className="text-[11px] font-mono text-[var(--color-ink)]/20">2001 – 2005</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="section-label">Certifications</span>
            <div className="grid grid-cols-1 gap-4 mt-6">
              {certifications.map(cert => (
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
    </div>
  );
}
