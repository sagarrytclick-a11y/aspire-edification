"use client"
import React from "react";
import { GraduationCap, ShieldCheck, Globe, CheckCircle2, ArrowRight, Star, Sparkles } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function AdmissionCampusAdvantage() {
  const { openModal } = useFormModal();

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
    <section id="about" className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div>
            <div className="flex items-center gap-2 text-[#4A90E2] mb-4">
              <Sparkles size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Why Choose Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
              Trusted Indian College Consultants
            </h2>
            
            <p className="text-[#64748B] text-sm leading-relaxed mb-10 max-w-xl font-medium">
              We help students secure admissions in top Indian engineering and medical colleges 
              through expert guidance, transparent processes, and strong institutional partnerships.
            </p>

            {/* Stats Grid - Simple Light Style */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#F8FAFC] border border-slate-100 p-6 rounded-lg group hover:border-[#4A90E2] transition-colors">
                  <div className="text-2xl font-bold text-[#1E293B] tracking-tight group-hover:text-[#4A90E2] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-[#64748B] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => openModal()} 
              className="bg-[#1E293B] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-[#4A90E2] transition-colors flex items-center gap-2 active:scale-95 group shadow-sm"
            >
              Get Started Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Feature Vertical Cards */}
          <div className="space-y-4">
            {points.map((item, i) => (
              <div
                key={i}
                className="group bg-[#F8FAFC] border border-slate-100 p-6 rounded-lg hover:border-[#4A90E2] transition-all flex items-start gap-6"
              >
                <div className="shrink-0 w-12 h-12 bg-white text-[#4A90E2] border border-slate-100 flex items-center justify-center rounded-md group-hover:bg-[#4A90E2] group-hover:text-white transition-all shadow-sm">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2 group-hover:text-[#4A90E2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Verification Strip */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-8 md:gap-12">
          {['IIT/JEE Specialized', 'NEET Counseling', 'Direct College Tie-ups'].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-[#64748B] text-[10px] font-bold uppercase tracking-widest">
              <CheckCircle2 size={16} className="text-[#4A90E2]" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}