"use client";

import React, { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Simple Search Fetch
  const { data: collegesData, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(`/api/colleges?search=${query}`);
      return res.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center bg-white text-[#1E293B] overflow-hidden">
       
      {/* 1. LEFT CONTENT: Focus on Readability */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 z-10 order-2 lg:order-1">
        <div className="max-w-2xl w-full space-y-8">
          
          {/* Professional Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-full backdrop-blur-sm">
            <span className="text-[#4A90E2] font-bold tracking-[0.2em] text-xs uppercase">
              Admission Intelligence 2026
            </span>
          </div>

          {/* Enhanced Typography */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Find Your <br />
              <span className="bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] bg-clip-text text-transparent">Future Campus.</span>
            </h1>

            <p className="text-[#64748B] text-lg leading-relaxed max-w-lg">
              Data-driven insights for 500+ elite universities. Start your journey to JEE, NEET, and MBA success today.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative group">
            <div className="flex items-center bg-white border-2 border-slate-200 rounded-2xl p-1.5 focus-within:border-[#4A90E2] focus-within:shadow-[0_0_20px_rgba(74,144,226,0.3)] transition-all shadow-xl">
              <Search className="ml-4 text-[#64748B]" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(e.target.value.length >= 2);
                }}
                placeholder="Search college or course..."
                className="flex-1 bg-transparent py-4 px-4 text-[#1E293B] placeholder-[#64748B] text-sm focus:outline-none"
              />
              <button className="bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] hover:from-[#00D4FF] hover:to-[#4A90E2] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg">
                Search <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {isLoading ? (
                  <div className="p-6 text-center text-[#64748B]">
                    <div className="w-6 h-6 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {colleges.slice(0, 5).map((college: any) => (
                      <Link key={college._id} href={`/colleges/${college.slug}`} className="block p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
                        <p className="font-bold text-[#1E293B] text-sm mb-1">{college.name}</p>
                        <p className="text-[10px] text-[#64748B] uppercase tracking-wider">{college.city || 'Global Campus'}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-[#64748B] text-sm">
                    No colleges found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Stats */}
          <div className="flex gap-12 pt-8 border-t border-slate-100">
            {[
              { val: "50K+", label: "Students Guided" },
              { val: "500+", label: "Partner Colleges" },
              { val: "95%", label: "Success Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-[#4A90E2] mb-1">{stat.val}</div>
                <div className="text-[10px] text-[#64748B] uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. RIGHT IMAGE: Professional & Full */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative order-1 lg:order-2">
        <img 
          src="/Hero.png" 
          alt="Campus" 
          className="w-full h-full object-cover lg:rounded-l-[80px]"
        />
        {/* Enhanced gradient overlay */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
        
        {/* Logo overlay on image */}
        <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
          <div className="flex items-center gap-3 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg">
            <img 
              src="/logo.png" 
              alt="Aspire Edification Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="text-[#1E293B]">
              <h3 className="font-bold text-lg">Aspire Edification</h3>
              <p className="text-xs text-[#64748B]">Excellence in Education</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;