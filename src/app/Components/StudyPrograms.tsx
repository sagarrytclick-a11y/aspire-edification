"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Target, BrainCircuit, Globe, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function StudyPrograms() {
  const { openModal } = useFormModal();
  
  // Theme Color Tokens
  const PRIMARY_BLUE = "#4A90E2"; 
  const SECONDARY_CYAN = "#00D4FF";
  const SURFACE_CARD = "#1E212B";
  const BG_DEEP = "#12141D";

  const programs = [
    { icon: Target, title: "Engineering Programs", description: "B.Tech, M.Tech, diploma courses, entrance exams and top colleges." },
    { icon: BrainCircuit, title: "Medical Programs", description: "MBBS, BDS, Nursing and allied medical courses with admission process." },
    { icon: BookOpen, title: "Management & MBA", description: "MBA, PGDM and management programs including CAT, XAT, CMAT details." },
    { icon: Globe, title: "Professional Courses", description: "Career-oriented certifications aligned with Indian industry requirements." },
    { icon: Target, title: "Commerce & CA", description: "CA, CS and commerce programs with top colleges and career opportunities." },
    { icon: BrainCircuit, title: "Science & Research", description: "Pure and applied sciences including research programs and PhD opportunities." },
    { icon: BookOpen, title: "Arts & Humanities", description: "UG and PG programs in arts, humanities and social sciences in India." },
    { icon: Globe, title: "Design & Architecture", description: "Design and architecture programs with NITs, IITs and top schools." },
  ];

  return (
    <section className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
            <Sparkles size={14} className="text-[#4A90E2]" />
            Academic Pathways
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#F8FAFC] mb-6 tracking-tight">
            Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Career Path</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-base">
            Choose from diverse programs designed to match your interests. 
            Get expert guidance for admissions and campus selection.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-[#1E212B] border border-[#94A3B8]/5 rounded-[32px] p-8 hover:border-[#4A90E2]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden"
            >
              {/* Subtle Card Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#12141D] border border-[#94A3B8]/10 text-[#4A90E2] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] transition-all duration-500 shadow-inner relative z-10">
                <program.icon size={26} />
              </div>

              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4 group-hover:text-[#4A90E2] transition-colors relative z-10">
                {program.title}
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 flex-grow relative z-10">
                {program.description}
              </p>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-[#94A3B8]/5 relative z-10">
                <span className="text-[11px] font-black text-[#00D4FF] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  Explore
                  <ArrowRight size={14} />
                </span>
                <div className="w-2 h-2 rounded-full bg-[#94A3B8]/20 group-hover:bg-[#4A90E2] group-hover:shadow-[0_0_8px_#4A90E2] transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="flex justify-center mt-20">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] px-10 py-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-[#4A90E2]/5 rounded-[40px] blur-xl opacity-50" />
            
            <div className="flex items-center gap-5 md:pr-8 md:border-r border-[#94A3B8]/10 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#12141D] border border-[#4A90E2]/20 flex items-center justify-center text-[#00D4FF] shadow-inner">
                <MessageCircle size={22} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.15em]">Need Expert Advice?</div>
                <div className="font-bold text-[#F8FAFC] text-sm">Talk to our Career Mentors</div>
              </div>
            </div>

            <button 
              onClick={() => openModal()} 
              className="bg-[#4A90E2] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#00D4FF] transition-all shadow-[0_10px_20px_rgba(74,144,226,0.2)] active:scale-95 relative z-10"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}