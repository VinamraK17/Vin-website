import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, CheckCircle2, Send } from "lucide-react";

interface ContactProps {
  handleLinkClick: (label: string, url: string) => void;
}

export default function Contact({ handleLinkClick }: ContactProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [emailAddress, setEmailAddress] = useState("•••••••@vinamrakumar.com");

  const trackEvent = (event: string, details: any = {}) => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, details, timestamp: new Date().toISOString() })
    }).catch(err => console.error("Analytics error:", err));
  };

  useEffect(() => {
    if (isEmailRevealed) {
      const timer = setTimeout(() => {
        setIsEmailRevealed(false);
        setEmailAddress("•••••••@vinamrakumar.com");
      }, 120000);
      return () => clearTimeout(timer);
    }
  }, [isEmailRevealed]);

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

  return (
    <div className="pb-32 pt-12">
      <section className="max-w-6xl mx-auto">
        <div className="glass p-8 md:p-20 overflow-hidden relative bg-[var(--color-glass)] rounded-[48px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-ink)]/5 blur-[120px] -mr-48 -mt-48 rounded-full" />
          
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

          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    if (isEmailRevealed) {
                      window.location.href = `mailto:${emailAddress}`;
                    } else {
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
    </div>
  );
}
