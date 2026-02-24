"use client"
import React from "react";
import { GraduationCap, ShieldCheck, Globe, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function AdmissionCampusAdvantage() {
  const { openModal } = useFormModal();

  // Brand Theme Tokens
  const PRIMARY_BLUE = "#4A90E2"; 
  const SECONDARY_CYAN = "#00D4FF";
  const BG_DEEP = "#12141D";
  const SURFACE_CARD = "#1E212B";

  const stats = [
    { label: "IITs Guided", value: "500+" },
    { label: "NEET Success", value: "95%" },
    { label: "Scholarships", value: "₹5 Cr+" },
    { label: "Partner Colleges", value: "150+" },
  ];

  const points = [
    {
      icon: GraduationCap,
      title: "IIT/JEE Experts",
      desc: "Specialized counseling for IITs, NITs, and top engineering colleges with proven admission strategies."
    },
    {
      icon: Globe,
      title: "Medical College Network",
      desc: "Direct partnerships with top medical colleges including AIIMS, JIPMER, and state medical universities."
    },
    {
      icon: ShieldCheck,
      title: "Counseling Excellence",
      desc: "Expert guidance for JoSAA, NEET counseling, and state-level admission processes with high success rates."
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A90E2]/5 blur-[150px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4FF]/5 blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Content */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
              <Star size={14} className="text-[#4A90E2] fill-[#4A90E2]" />
              Why Choose Us
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-[#F8FAFC] mb-8 tracking-tighter leading-[1.05]">
              Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Indian College</span> Consultants
            </h2>
            
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-xl">
              We help students secure admissions in top Indian engineering and medical colleges 
              through expert guidance, transparent processes, and strong institutional partnerships.
            </p>

            {/* Stats Grid - Modern Dark Style */}
            <div className="grid grid-cols-2 gap-5 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#1E212B] border border-[#94A3B8]/10 p-7 rounded-[32px] group hover:border-[#4A90E2]/30 transition-all duration-500 shadow-xl">
                  <div className="text-3xl font-black text-[#F8FAFC] tracking-tighter group-hover:text-[#00D4FF] transition-colors mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-[#94A3B8]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => openModal()} 
              className="bg-[#4A90E2] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center gap-3 hover:bg-[#00D4FF] transition-all shadow-[0_15px_35px_rgba(74,144,226,0.3)] active:scale-95 group"
            >
              Get Started Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Feature Vertical Cards */}
          <div className="space-y-6">
            {points.map((item, i) => (
              <div
                key={i}
                className="group bg-[#1E212B] border border-[#94A3B8]/5 p-8 md:p-10 rounded-[40px] hover:border-[#4A90E2]/20 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col md:flex-row items-start gap-8 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 h-full w-1 bg-[#4A90E2] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="shrink-0 w-16 h-16 bg-[#12141D] text-[#4A90E2] border border-[#94A3B8]/10 flex items-center justify-center rounded-2xl group-hover:bg-[#4A90E2] group-hover:text-white transition-all duration-500 shadow-inner">
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Verification Strip */}
        <div className="mt-24 pt-12 border-t border-[#94A3B8]/5 flex flex-wrap justify-center gap-8 md:gap-16">
          {['IIT/JEE Specialized', 'NEET Counseling', 'Direct College Tie-ups'].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.2em]">
              <CheckCircle2 size={18} className="text-[#00D4FF]" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}