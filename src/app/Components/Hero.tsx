"use client";

import React, { useState } from "react";
import { Search, Building2, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"; // Changed to next/link for standard Next.js behavior

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: collegesData, isLoading } = useQuery({
    queryKey: ["colleges-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: { colleges: [] } };
      const response = await fetch(`/api/colleges?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];

  const featuredColleges = [
    { name: "Harvard University", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1600" },
    { name: "IIT Bombay", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600" },
    { name: "Stanford University", img: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=1600" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-white font-sans">
      
      {/* --- BACKGROUND SLIDER LAYER --- */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          speed={2000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          className="h-full w-full"
        >
          {featuredColleges.map((college, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[7000ms] scale-105"
                style={{ backgroundImage: `url(${college.img})` }}
              >
                {/* DARK TINT LAYER: Ye images ko thoda dark karega taaki images ki details dikhen */}
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* IMPROVED GRADIENT OVERLAY: 
            Left side (Text area) is white for readability.
            Right side is transparent so images are visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-20">
        <div className="max-w-3xl text-left">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-white/80 backdrop-blur-md border border-slate-100 rounded-md shadow-sm">
            <Sparkles size={14} className="text-[#4A90E2]" />
            <span className="text-[10px] font-bold tracking-widest text-[#4A90E2] uppercase">
              Premium Admission Intelligence 2026
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E293B] mb-6 tracking-tight leading-tight">
            Elevate Your <br />
            <span className="text-[#4A90E2]">Academic Journey</span>
          </h1>

          <p className="text-sm md:text-base text-[#475569] font-semibold mb-10 max-w-xl leading-relaxed">
            Navigate the landscape of 500+ elite global universities. Get data-driven insights for JEE, NEET, and MBA admissions with Aspire Edification.
          </p>

          {/* Search Section */}
          <div className="relative max-w-2xl mb-12">
            <div className="relative bg-white rounded-lg border border-slate-200 shadow-2xl p-1.5 transition-all focus-within:border-[#4A90E2] focus-within:ring-4 focus-within:ring-[#4A90E2]/10">
              <div className="flex items-center">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search size={20} />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(e.target.value.length >= 2);
                  }}
                  placeholder="Search elite institutions..."
                  className="flex-1 bg-transparent py-3 text-[#1E293B] font-bold placeholder-slate-400 text-base focus:outline-none"
                />

                <button className="hidden md:block bg-[#1E293B] hover:bg-[#4A90E2] text-white px-8 py-3 rounded-md font-bold text-sm transition-all shadow-sm active:scale-95">
                  Find Now
                </button>
              </div>
            </div>

            {/* Dropdown Results */}
            {showResults && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-slate-100 max-h-[350px] overflow-y-auto z-50">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#4A90E2] mx-auto mb-3"></div>
                    <span className="text-xs text-[#64748B] font-medium">Analyzing Database...</span>
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="py-1">
                    {colleges.map((college: any) => (
                      <Link
                        key={college._id}
                        href={`/colleges/${college.slug}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-colors border-b border-slate-50 last:border-none group"
                      >
                        <div className="bg-[#F8FAFC] p-2 rounded-md text-[#4A90E2] group-hover:bg-[#4A90E2] group-hover:text-white transition-all">
                          <Building2 size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[#1E293B] text-sm">{college.name}</div>
                          <div className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5 font-bold uppercase tracking-tight">
                            <MapPin size={12} className="text-[#4A90E2]" /> {college.state}
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-[#4A90E2]" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-[#64748B] font-bold uppercase tracking-widest">
                    No matching results found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-8 md:gap-12 border-t border-slate-100 pt-10">
            {[
              { val: "15k+", label: "Students" },
              { val: "500+", label: "Universities" },
              { val: "Top 1%", label: "Mentors" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-[#1E293B]">{stat.val}</div>
                <div className="text-[9px] text-[#4A90E2] font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;