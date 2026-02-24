"use client";
import React from "react";
import { GraduationCap, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";

export default function EducationStats() {
  // Theme Color Tokens from your palette
  const PRIMARY_BLUE = "#4A90E2"; // Button/Icon highlight
  const SECONDARY_CYAN = "#00D4FF"; // Hover/Accents
  const BG_DEEP = "#12141D"; // Main Background
  const SURFACE_CARD = "#1E212B"; // Card Surface

  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Admitted",
      description: "Guided students into reputed colleges and universities across the globe."
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Consistently high approval rate in admissions and counselling process."
    },
    {
      icon: Users,
      value: "500+",
      label: "Indian Colleges",
      description: "Direct tie-ups with premier universities and colleges across India."
    },
    {
      icon: Award,
      value: "₹40+ Cr",
      label: "Scholarships",
      description: "Merit-based and need-based scholarships secured for our students."
    }
  ];

  return (
    <section className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00D4FF]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl">
            <ShieldCheck size={14} className="text-[#4A90E2]" />
            Our Global Impact
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#F8FAFC] mb-6 tracking-tighter">
            Numbers That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Inspire</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
            Our commitment to student success is reflected in our data. 
            We turn academic dreams into reality for thousands of students.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] p-10 text-center hover:border-[#4A90E2]/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-3 flex flex-col items-center relative overflow-hidden"
            >
              {/* Subtle hover background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon Container */}
              <div className="w-16 h-16 mb-10 rounded-[20px] bg-[#12141D] text-[#4A90E2] border border-[#94A3B8]/10 flex items-center justify-center group-hover:bg-[#4A90E2] group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6 relative z-10">
                <stat.icon size={28} />
              </div>

              {/* Counter Value */}
              <div className="text-5xl font-black text-[#F8FAFC] mb-3 tracking-tighter group-hover:scale-105 transition-transform relative z-10">
                {stat.value}
              </div>

              {/* Label with Cyan Accent */}
              <div className="flex items-center gap-2 text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.15em] mb-6 relative z-10">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]" />
                {stat.label}
              </div>

              <p className="text-[#94A3B8] text-sm leading-relaxed group-hover:text-slate-300 transition-colors relative z-10">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="flex justify-center mt-24">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] px-10 py-8 shadow-2xl relative overflow-hidden group/badge">
            <div className="absolute inset-0 bg-[#4A90E2]/5 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
            
            <div className="flex -space-x-4 relative z-10">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-[#1E212B] bg-[#12141D] flex items-center justify-center text-white shadow-xl overflow-hidden"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="alumni" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#1E212B] bg-[#00D4FF] flex items-center justify-center text-[#12141D] font-black text-[10px] shadow-xl">
                +10k
              </div>
            </div>
            
            <div className="text-center md:text-left relative z-10">
              <div className="font-black text-[#F8FAFC] text-xl tracking-tight mb-1">Trusted by 10,000+ Students</div>
              <div className="text-sm text-[#94A3B8] font-medium">Empowering the next generation of Indian leaders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}