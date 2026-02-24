"use client";

import React, { useState } from "react";
import { Search, ChevronRight, Sparkles, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-white font-sans">
      
      {/* --- BACKGROUND / IMAGE SECTION (RIGHT SIDE) --- */}
      <div className="absolute top-0 right-0 w-full lg:w-[45%] h-full z-0 hidden lg:block">
        <Swiper
          modules={[Autoplay, EffectFade]}
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          className="h-full w-full"
        >
          {featuredColleges.map((college, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${college.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- CONTENT SECTION (LEFT SIDE) --- */}
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="max-w-2xl lg:text-left text-center">
          
          {/* Subtle Tagline */}
          <div className="inline-flex mt-4 items-center gap-2 px-3 py-1 mb-8 bg-[#4A90E2]/5  border border-[#4A90E2]/10 rounded-full">
            <Sparkles size={12} className="text-[#4A90E2]" />
            <span className="text-[10px] font-bold tracking-widest  text-[#4A90E2] uppercase">
              Admission Intelligence 2026
            </span>
          </div>

          {/* Clean Typography */}
          <h1 className="text-5xl md:text-5xl font-bold text-[#1E293B] mb-6 tracking-tighter leading-[1.1]">
            Find Your <br />
            <span className="text-[#4A90E2]">Future Campus.</span>
          </h1>

          <p className="text-base md:text-lg text-[#64748B] font-medium mb-10 max-w-lg lg:mx-0 mx-auto leading-relaxed">
            Direct access to data-driven insights for 500+ elite universities. Your journey to JEE, NEET, and MBA success starts here.
          </p>

          {/* Sleek Search Bar */}
          <div className="relative max-w-xl mb-12 lg:mx-0 mx-auto group">
            <div className="relative bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-2 transition-all group-focus-within:shadow-[0_20px_50px_rgba(74,144,226,0.1)] group-focus-within:border-[#4A90E2]/30">
              <div className="flex items-center">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search size={18} />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(e.target.value.length >= 2);
                  }}
                  placeholder="Search by college, course or exam..."
                  className="flex-1 bg-transparent py-3 text-[#1E293B] font-medium placeholder-slate-400 text-sm focus:outline-none"
                />

                <button className="bg-[#1E293B] text-white px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 hover:bg-[#4A90E2] active:scale-95">
                  Search
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Dropdown Results */}
            {showResults && (
              <div className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-50 max-h-[380px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {isLoading ? (
                  <div className="p-10 text-center">
                    <div className="w-5 h-5 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="py-2 overflow-y-auto max-h-[380px]">
                    {colleges.map((college: any) => (
                      <Link
                        key={college._id}
                        href={`/colleges/${college.slug}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                          <img 
                            src={college.banner_url || "/api/placeholder/100/100"} 
                            alt={college.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[#1E293B] text-sm group-hover/item:text-[#4A90E2] transition-colors">{college.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{college.city || 'Global Campus'}</div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover/item:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="flex items-center lg:justify-start justify-center flex-wrap gap-12 pt-10 border-t border-slate-50">
            {[
              { val: "15k+", label: "Aspirants" },
              { val: "500+", label: "Institutes" },
              { val: "Top 1%", label: "Insights" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl font-bold text-[#1E293B] group-hover:text-[#4A90E2] transition-colors">{stat.val}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;