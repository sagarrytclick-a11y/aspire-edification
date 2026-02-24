'use client'

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  TrendingUp,
  Compass,
} from 'lucide-react';

const ExplorePrograms = () => {
  // Theme Color Tokens from your saved palette
  const PRIMARY_BLUE = "#4A90E2"; // Buttons & Highlights
  const SECONDARY_CYAN = "#00D4FF"; // Hover states
  const BG_DEEP = "#12141D"; // Main background
  const SURFACE_CARD = "#1E212B"; // Card background
  const TEXT_PRIMARY = "#F8FAFC";
  const TEXT_MUTED = "#94A3B8";

  const cards = [
    {
      title: "Entrance Exams",
      description: "Deep insights into exam dates, syllabus, and pro-strategies for national level competitive tests.",
      icon: <FileText className="w-7 h-7 text-[#00D4FF]" />,
      tags: ["JEE Main", "NEET", "CAT"],
      links: ["Download Sample Papers", "Mock Test Series"],
      footerAction: "Explore all Exams",
      href: "/exams"
    },
    {
      title: "Top Colleges",
      description: "Discover premier institutions ranked by placements, global exposure, and campus infrastructure.",
      icon: <Building2 className="w-7 h-7 text-[#00D4FF]" />,
      list: ["Top IITs in India", "Top NITs in India"],
      footerAction: "Browse All Colleges",
      href: "/colleges"
    },
    {
      title: "Admission Guidance",
      description: "Evaluate your admission chances in top colleges based on your scores with our AI predictor.",
      icon: <GraduationCap className="w-7 h-7 text-[#00D4FF]" />,
      tags: ["College Predictor", "Cut-off 2026"],
      links: ["JEE College Predictor", "NEET College Predictor"],
      footerAction: "Get Guidance Now",
      href: "/blogs"
    }
  ];

  return (
    <div className={`bg-[#12141D] py-24 px-6 md:px-12 lg:px-24 font-sans relative overflow-hidden`}>
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A90E2]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#4A90E2]/10 border border-[#4A90E2]/20 text-[#00D4FF] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              <Compass size={14} />
              Discover Your Path
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tight leading-tight">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Campus</span> Programs
            </h2>
            <p className="mt-4 text-[#94A3B8] text-lg max-w-xl">
              Navigate the Indian education landscape with expert guidance and data-driven insights.
            </p>
          </div>
          
          <Link href="/colleges" className="hidden md:block">
             <span className="text-[#00D4FF] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform cursor-pointer">
               View All Resources <ArrowRight size={20} />
             </span>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] p-10 flex flex-col hover:border-[#4A90E2]/40 hover:-translate-y-3 transition-all duration-500 relative"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[40px] transition-opacity" />

              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#12141D] border border-[#94A3B8]/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:border-[#00D4FF] transition-all duration-500">
                {card.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 group-hover:text-[#4A90E2] transition-colors">
                {card.title}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                {card.description}
              </p>

              {/* Content Area */}
              <div className="flex-grow relative z-10">
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-2 bg-[#12141D] text-[#F8FAFC] text-[10px] font-black px-4 py-2.5 rounded-2xl border border-[#94A3B8]/10 group-hover:border-[#00D4FF]/30 transition-colors">
                        <TrendingUp size={12} className="text-[#4A90E2]" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {card.links && (
                  <ul className="space-y-5 mb-8">
                    {card.links.map((link) => (
                      <li key={link} className="text-[#94A3B8] text-xs font-bold flex items-center gap-3 hover:text-[#F8FAFC] cursor-pointer transition-colors group/link">
                        <span className="w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF] group-hover/link:scale-125 transition-transform" /> 
                        {link}
                      </li>
                    ))}
                  </ul>
                )}

                {card.list && (
                  <ul className="space-y-5 mb-8">
                    {card.list.map((item) => (
                      <li key={item} className="text-[#F8FAFC] text-xs font-black flex items-center gap-4 group/item">
                        <div className="w-7 h-7 rounded-xl bg-[#12141D] border border-[#94A3B8]/10 flex items-center justify-center text-[#4A90E2] group-hover/item:bg-[#4A90E2] group-hover/item:text-white transition-all">
                          <ArrowRight size={14} />
                        </div> 
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer Button */}
              <Link href={card.href} className="mt-6">
                <button className="w-full bg-[#12141D] border border-[#4A90E2] hover:bg-[#4A90E2] text-white font-bold py-4 px-6 rounded-[24px] text-xs flex items-center justify-center gap-3 transition-all duration-300 group/btn shadow-xl active:scale-95">
                  {card.footerAction}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePrograms;