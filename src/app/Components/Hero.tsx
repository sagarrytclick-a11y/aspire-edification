"use client";

import React, { useState } from "react";
import { Search, GraduationCap, BookOpen, Building2, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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

  return (
    <section className="relative bg-[#12141D] pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Premium Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A90E2] opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D4FF] opacity-10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Tagline with Icon */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-[#4A90E2]/30 bg-[#4A90E2]/5 rounded-full backdrop-blur-sm">
            <Sparkles size={16} className="text-[#00D4FF]" />
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#F8FAFC] uppercase">
              Premium Admission Intelligence 2026
            </span>
          </div>

          {/* Main Heading - Refined for "Aspire" */}
          <h1 className="text-5xl md:text-7xl font-black text-[#F8FAFC] mb-8 tracking-tight leading-[1.1]">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Academic Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] mb-12 max-w-3xl mx-auto leading-relaxed">
            Navigate the landscape of 500+ elite global universities. Get data-driven insights for JEE, NEET, and MBA admissions with Aspire Edification.
          </p>

          {/* Search Section - Redesigned as a Floating Surface */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-[#1E212B] rounded-2xl border border-[#94A3B8]/10 shadow-2xl p-2 transition-all duration-300 focus-within:border-[#4A90E2]/50 focus-within:ring-1 focus-within:ring-[#4A90E2]/50">
              <div className="flex items-center">
                <div className="pl-5 pr-3 text-[#94A3B8]">
                  <Search size={22} />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(e.target.value.length >= 2);
                  }}
                  placeholder="Search elite institutions (e.g. IIT, IIM, Harvard...)"
                  className="flex-1 bg-transparent py-4 text-[#F8FAFC] placeholder-[#94A3B8]/50 text-lg focus:outline-none"
                />

                <button className="hidden md:flex items-center gap-2 bg-[#4A90E2] hover:bg-[#00D4FF] text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#4A90E2]/20">
                  Find Now
                </button>
              </div>
            </div>

            {/* Dropdown Results - Styled for Dark Theme */}
            {showResults && (
              <div className="absolute left-0 right-0 mt-4 bg-[#1E212B] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#4A90E2]/20 max-h-[450px] overflow-y-auto z-50 backdrop-blur-xl">
                {isLoading ? (
                  <div className="p-10 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00D4FF] mx-auto mb-4"></div>
                    <span className="text-[#94A3B8]">Analyzing Database...</span>
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="py-2">
                    <div className="px-6 py-3 border-b border-[#94A3B8]/10 flex justify-between items-center">
                      <p className="text-xs font-bold text-[#4A90E2] uppercase tracking-widest">Matching Institutions</p>
                      <span className="text-[10px] px-2 py-1 bg-[#4A90E2]/10 text-[#00D4FF] rounded-md">{colleges.length} Results</span>
                    </div>
                    {colleges.map((college: any) => (
                      <Link
                        key={college._id}
                        href={`/colleges/${college.slug}`}
                        className="flex items-center gap-4 px-6 py-5 hover:bg-[#4A90E2]/5 transition-all duration-200 border-b border-[#94A3B8]/5 last:border-none group"
                      >
                        <div className="bg-[#12141D] p-3 rounded-lg border border-[#94A3B8]/10 text-[#4A90E2] group-hover:border-[#00D4FF] transition-colors">
                          <Building2 size={20} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-[#F8FAFC] text-lg group-hover:text-[#00D4FF] transition-colors">
                            {college.name}
                          </div>
                          <div className="text-sm text-[#94A3B8] flex items-center gap-2 mt-1">
                            <MapPin size={14} className="text-[#4A90E2]" />
                            {college.state}
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-[#94A3B8] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-[#F8FAFC] font-semibold mb-1">No matching results</p>
                    <p className="text-[#94A3B8] text-sm">Refine your search for better results.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Categories - Sleek Minimalism */}
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {[
              { label: "Engineering", icon: <GraduationCap size={18} /> },
              { label: "Medical Sciences", icon: <BookOpen size={18} /> },
              { label: "Business Management", icon: <Building2 size={18} /> },
            ].map((cat, i) => (
              <button key={i} className="flex items-center gap-3 px-6 py-3 bg-[#1E212B] border border-[#94A3B8]/10 rounded-xl text-[#F8FAFC] font-semibold hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all group">
                <span className="text-[#4A90E2] group-hover:text-[#00D4FF]">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stats Section - High Contrast Cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { val: "15k+", label: "Success Stories" },
              { val: "500+", label: "Partner Universities" },
              { val: "100+", label: "Entrance Exams" },
              { val: "Top 1%", label: "Expert Mentors" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#1E212B]/50 border border-[#94A3B8]/5 backdrop-blur-sm">
                <div className="text-3xl font-black text-[#F8FAFC] mb-1">{stat.val}</div>
                <div className="text-[10px] md:text-xs text-[#4A90E2] font-bold uppercase tracking-[2px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;