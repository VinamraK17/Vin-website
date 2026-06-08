import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, EyeOff, Lock, FileText, ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen pb-32 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors mb-12 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-6 mb-16">
          <span className="section-label">Legal & Compliance</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-ink)] leading-none uppercase">
            Privacy Policy & <br/>
            <span className="text-[var(--color-ink)]/30 italic font-light">Terms of Use</span>
          </h1>
          <p className="text-lg text-[var(--color-ink-faint)] font-light leading-relaxed max-w-2xl">
            This policy outlines how data is handled on this site, GDPR compliance details, and the intellectual property protection (copyright and design) governing the contents.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="grid md:grid-cols-3 gap-6 p-8 border border-[var(--color-border)] rounded-[32px] mb-16 bg-[var(--color-ink)]/[0.01]">
          <div className="flex flex-col gap-2">
            <ShieldCheck className="w-6 h-6 text-[var(--color-accent)]" />
            <h4 className="font-bold text-[var(--color-ink)] mt-2">Self-Hosted Security</h4>
            <p className="text-xs text-[var(--color-ink-faint)]">All data is stored locally on a secure private Synology NAS in Switzerland, with no third-party cloud hosting.</p>
          </div>
          <div className="flex flex-col gap-2">
            <EyeOff className="w-6 h-6 text-indigo-500/80" />
            <h4 className="font-bold text-[var(--color-ink)] mt-2">Zero Tracking Cookies</h4>
            <p className="text-xs text-[var(--color-ink-faint)]">This site does not use third-party analytics cookies (such as Google Analytics). Link clicks are tracked locally and anonymously.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Lock className="w-6 h-6 text-emerald-500/80" />
            <h4 className="font-bold text-[var(--color-ink)] mt-2">Strict Data Privacy</h4>
            <p className="text-xs text-[var(--color-ink-faint)]">Contact information is used solely to verify identity and communicate with you. It is never sold or shared.</p>
          </div>
        </div>

        <div className="space-y-12 text-[var(--color-ink)]/80 font-light leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--color-accent)]" />
              1. Data Collection & Usage
            </h2>
            <p className="pl-8">
              We collect minimal personal data to ensure communication security and operational integrity:
            </p>
            <ul className="list-disc pl-14 space-y-2 text-sm">
              <li><strong>Contact Information:</strong> When you fill out the contact form, we collect your name, email address, and the content of your message. This data is used solely to verify the request and enable professional communication.</li>
              <li><strong>Usage Analytics:</strong> We track interactive events (such as button/link clicks) to measure site engagement. This data is stored locally, containing no personal identifiers.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
              2. GDPR & Swiss FADP Compliance
            </h2>
            <p className="pl-8">
              As the site is hosted in Switzerland, we align with the Swiss Federal Act on Data Protection (FADP) and the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-14 space-y-2 text-sm">
              <li><strong>Right to Access:</strong> You have the right to request a copy of any personal data stored about you.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> You may request the permanent deletion of your contact submissions at any time by contacting us directly.</li>
              <li><strong>Data Retention:</strong> We store messages only for as long as necessary to fulfill professional communication purposes.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] flex items-center gap-3">
              <Lock className="w-5 h-5 text-[var(--color-accent)]" />
              3. Intellectual Property & Copy Protection
            </h2>
            <p className="pl-8">
              All content on this website, including but not limited to text, graphics, project case studies, visual design, and source code, is the exclusive intellectual property of <strong>Vinamra Kumar</strong> and is protected under global copyright and intellectual property laws.
            </p>
            <p className="pl-8 text-sm italic border-l-2 border-[var(--color-border)] pl-4">
              Permission is NOT granted to copy, reproduce, modify, distribute, or scrape any content or layout from this website for commercial or portfolio replication purposes. Unauthorized duplication is strictly prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--color-accent)]" />
              4. Contact for Legal Inquiries
            </h2>
            <p className="pl-8">
              For any questions regarding data privacy, rights requests, or intellectual property permissions, please contact:
            </p>
            <p className="pl-8 font-mono text-sm text-[var(--color-accent)] font-semibold">
              contact@vinamrakumar.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
