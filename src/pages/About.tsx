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
                <p className="text-[var(--color-ink)]/40 text-sm mb-1">Digital Transformation Certificate</p>
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
