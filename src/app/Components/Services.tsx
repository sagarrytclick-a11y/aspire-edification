"use client";
import React from "react";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  GraduationCap,
  Users,
  ArrowRight,
  Headphones,
  Zap
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function ComprehensiveServices() {
  const { openModal } = useFormModal();

  // Theme Palette Tokens
  const PRIMARY_BLUE = "#4A90E2"; 
  const SECONDARY_CYAN = "#00D4FF";
  const BG_DEEP = "#12141D";
  const SURFACE_CARD = "#1E212B";

  const services = [
    {
      icon: Settings,
      title: "Career & Course Counseling",
      desc: "Personalized guidance to help students choose the right course and university."
    },
    {
      icon: ShieldCheck,
      title: "Visa & Admission Assistance",
      desc: "End-to-end admission and visa support with a high success rate."
    },
    {
      icon: GraduationCap,
      title: "University Applications",
      desc: "Applications to top universities across USA, UK, Canada, Australia & Europe."
    },
    {
      icon: Wallet,
      title: "Scholarships & Financial Aid",
      desc: "Support in securing scholarships and managing education finances."
    },
    {
      icon: Globe,
      title: "IELTS / TOEFL / GRE Prep",
      desc: "Expert coaching and preparation for international entrance exams."
    },
    {
      icon: Users,
      title: "Pre & Post Departure Support",
      desc: "Accommodation, travel, and student support even after admission."
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A90E2]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
            <Zap size={14} className="text-[#4A90E2] animate-pulse" />
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#F8FAFC] mb-8 tracking-tighter">
            Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Support System</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
            From initial counseling to post-arrival support, we provide comprehensive 
            services to ensure your study abroad journey is smooth and successful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#1E212B] border border-[#94A3B8]/5 rounded-[40px] p-10 hover:border-[#4A90E2]/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-3 flex flex-col h-full relative overflow-hidden"
            >
              {/* Subtle Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#12141D] border border-[#94A3B8]/10 text-[#4A90E2] flex items-center justify-center group-hover:bg-[#4A90E2] group-hover:text-white group-hover:border-[#4A90E2] group-hover:rotate-[10deg] transition-all duration-500 shadow-inner mb-8 relative z-10">
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-bold text-[#F8FAFC] mb-4 group-hover:text-[#00D4FF] transition-colors leading-tight relative z-10">
                {service.title}
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 flex-grow relative z-10">
                {service.desc}
              </p>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-8 border-t border-[#94A3B8]/5 relative z-10">
                <span className="text-[11px] font-black text-[#4A90E2] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                  Explore Service
                  <ArrowRight size={16} />
                </span>
                <div className="w-2 h-2 rounded-full bg-[#94A3B8]/20 group-hover:bg-[#00D4FF] group-hover:shadow-[0_0_8px_#00D4FF] transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box - Elite Glassmorphism style */}
        <div className="relative bg-[#1E212B] border border-[#94A3B8]/10 rounded-[50px] p-10 md:p-20 overflow-hidden shadow-2xl">
          {/* Internal Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00D4FF]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#12141D] border border-[#4A90E2]/20 rounded-3xl flex items-center justify-center text-[#00D4FF] mb-10 shadow-inner">
              <Headphones size={36} />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-[#F8FAFC] mb-6 tracking-tight">
              Ready to Start Your Journey?
            </h3>
            <p className="text-[#94A3B8] mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Get personalized guidance from our expert mentors. 
              Schedule your free session today and take the first step toward your dream.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link
                href="/service"
                className="bg-[#4A90E2] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#00D4FF] transition-all shadow-[0_10px_30px_rgba(74,144,226,0.3)] flex items-center justify-center gap-3"
              >
                All Services
                <ArrowRight size={18} />
              </Link>
              <button 
                onClick={() => openModal()} 
                className="bg-transparent border-2 border-[#94A3B8]/20 text-[#F8FAFC] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#F8FAFC] hover:text-[#12141D] hover:border-[#F8FAFC] transition-all flex items-center justify-center shadow-lg active:scale-95"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}