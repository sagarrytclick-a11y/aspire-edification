"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import { PhoneCall, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  // Theme Color Tokens
  const PRIMARY_BLUE = "#4A90E2";
  const SECONDARY_CYAN = "#00D4FF";
  const BG_DEEP = "#12141D";
  const SURFACE_CARD = "#1E212B";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#12141D] py-24 border-t border-[#94A3B8]/5"
    >
      {/* High-End Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(74,144,226,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(0,212,255,0.05),transparent_50%)]" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-24 text-center z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/20 text-[#00D4FF] px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-12 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
          <Sparkles size={14} className="animate-spin-slow" />
          Start Your Future Today
        </div>

        {/* Hero Heading */}
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-[#F8FAFC] mb-8 leading-[0.95] uppercase">
          Ready to Step Into Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">
            Dream University?
          </span>
        </h2>

        {/* Persuasive Subtext */}
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-[#94A3B8] leading-relaxed mb-16 font-medium">
          Don't leave your career to chance. Join 10,000+ students who have already secured their future with our expert admission roadmap.
        </p>

        {/* Benefit Cards - Surface Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Admits",
              desc: "100% transparent process with direct university tie-ups."
            },
            {
              icon: GraduationCap,
              title: "Expert Mentors",
              desc: "Personalized coaching from Ivy League & IIT alumni."
            },
            {
              icon: PhoneCall,
              title: "Priority Support",
              desc: "24/7 assistance from documentation to hostel arrival."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#1E212B]/50 backdrop-blur-md border border-[#94A3B8]/10 rounded-[40px] p-8 group hover:bg-[#1E212B] hover:border-[#4A90E2]/40 transition-all duration-500">
              <div className="w-14 h-14 bg-[#12141D] rounded-2xl flex items-center justify-center text-[#4A90E2] mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(74,144,226,0.3)] transition-all duration-500">
                <item.icon size={28} />
              </div>
              <h4 className="text-[#F8FAFC] font-bold text-lg mb-3 uppercase tracking-tight">
                {item.title}
              </h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Primary CTA Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={openModal}
            className="group relative w-full sm:w-auto overflow-hidden bg-[#4A90E2] text-white px-12 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(74,144,226,0.3)] hover:shadow-[0_25px_50px_rgba(74,144,226,0.4)] hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Book Free Counseling <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <Link
            href="/colleges"
            className="w-full sm:w-auto rounded-2xl border border-[#94A3B8]/20 bg-white/5 backdrop-blur-sm px-12 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#F8FAFC] transition-all duration-500 hover:bg-white hover:text-[#12141D] flex items-center justify-center"
          >
            Browse Colleges
          </Link>
        </div>

        {/* Micro-Trust Indicators */}
        <div className="mt-16 pt-10 border-t border-[#94A3B8]/5 flex flex-wrap justify-center gap-8 text-[#94A3B8] text-[10px] font-bold uppercase tracking-[0.25em]">
          <span className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> No Service Fees
          </span>
          <span className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> Verified Universities
          </span>
          <span className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> 99% Visa Success
          </span>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;