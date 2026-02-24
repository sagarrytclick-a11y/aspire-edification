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
  Zap,
  Sparkles
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function ComprehensiveServices() {
  const { openModal } = useFormModal();

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
    <section id="services" className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">

        {/* Simple Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#4A90E2] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Complete Support System
          </h2>
          <p className="text-[#64748B] text-sm max-w-2xl font-medium leading-relaxed">
            From initial counseling to post-arrival support, we provide comprehensive 
            services to ensure your study abroad journey is smooth and successful.
          </p>
        </div>

        {/* Services Grid - Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#F8FAFC] border border-slate-100 rounded-lg p-8 hover:border-[#4A90E2] transition-all flex flex-col h-full"
            >
              {/* Simple Icon Container */}
              <div className="w-12 h-12 rounded-md bg-white border border-slate-100 text-[#4A90E2] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#4A90E2] group-hover:text-white transition-all">
                <service.icon size={22} />
              </div>

              <h3 className="text-lg font-semibold text-[#1E293B] mb-3 group-hover:text-[#4A90E2] transition-colors leading-tight">
                {service.title}
              </h3>

              <p className="text-[#64748B] text-xs leading-relaxed mb-6 flex-grow font-medium">
                {service.desc}
              </p>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-200/50">
                <span className="text-xs font-bold text-[#4A90E2] flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Explore Service
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Bottom CTA Box */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-10 md:p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[#4A90E2] mb-8 shadow-sm">
            <Headphones size={28} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4 tracking-tight">
            Ready to Start Your Journey?
          </h3>
          <p className="text-[#64748B] mb-10 max-w-xl text-sm font-medium leading-relaxed">
            Get personalized guidance from our expert mentors. 
            Schedule your free session today and take the first step toward your dream.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/service"
              className="bg-[#1E293B] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-[#4A90E2] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              All Services
              <ArrowRight size={16} />
            </Link>
            <button 
              onClick={() => openModal()} 
              className="bg-white border border-slate-200 text-[#1E293B] px-8 py-3 rounded-md font-bold text-sm hover:border-[#4A90E2] hover:text-[#4A90E2] transition-all flex items-center justify-center active:scale-95"
            >
              Book Free Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}