"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowUpRight,
  MapPin,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Star,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

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
    <section className="relative min-h-screen bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden">
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#4A90E2]/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#00D4FF]/10 blur-[80px] md:blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-16 md:pb-24">
        {/* TOP ANNOUNCEMENT BAR - Hidden on extra small screens or simplified */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
            <span className="text-[9px] md:text-[11px] font-bold text-[#64748B] uppercase tracking-wider md:tracking-widest">
              Live: 1,240 admissions open for 2026
            </span>
            <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
            <button className="text-[9px] md:text-[11px] font-bold text-[#4A90E2] hover:underline flex items-center gap-1 shrink-0">
              View All <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="w-full lg:flex-[1.2] space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-6 bg-blue-50 text-[#4A90E2] rounded-lg text-xs font-bold">
                <ShieldCheck size={14} /> AI-VERIFIED INSTITUTIONS
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#0F172A]">
                The Smartest Way to <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#4A90E2] via-[#00D4FF] to-[#4A90E2] bg-clip-text text-transparent">
                  Pick Your College.
                </span>
              </h1>
              <p className="text-[#64748B] text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We analyze over{" "}
                <span className="text-[#1E293B] font-semibold">
                  2.5M+ data points
                </span>{" "}
                including placements and faculty expertise to find your match.
              </p>
            </div>

            {/* Search Bar Area */}
            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <div className="relative">
                <div className="flex items-center bg-white border-2 border-slate-100 rounded-xl md:rounded-2xl p-1.5 md:p-2 focus-within:border-[#4A90E2]/30 transition-all shadow-lg">
                  <Search
                    className="ml-3 md:ml-4 text-[#94A3B8] shrink-0"
                    size={20}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowResults(e.target.value.length >= 2);
                    }}
                    placeholder="Search College or Course..."
                    className="flex-1 bg-transparent py-3 md:py-4 px-3 md:px-4 text-[#1E293B] placeholder-[#94A3B8] text-sm md:text-base focus:outline-none w-full"
                  />
                  <button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all shrink-0">
                    Search
                  </button>
                </div>

                {/* Results Dropdown */}
                {showResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden text-left">
                    {isLoading ? (
                      <div className="p-6 text-center">
                        <div className="w-5 h-5 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin mx-auto" />
                      </div>
                    ) : colleges.length > 0 ? (
                      <div className="max-h-60 md:max-h-80 overflow-y-auto">
                        {colleges.map((college: any) => (
                          <Link
                            key={college._id}
                            href={`/colleges/${college.slug}`}
                            className="group flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={college.banner_url}
                                alt="college"
                                className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[#4A90E2] text-xs"
                              />
                              <div>
                                <p className="font-bold text-[#1E293B] text-sm">
                                  {college.name}
                                </p>
                                <p className="text-[10px] text-[#64748B] flex items-center gap-1">
                                  <MapPin size={10} /> {college.city}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <p className="text-[10px] font-bold text-[#94A3B8] uppercase">
                                College
                              </p>
                              <ArrowUpRight
                                size={14}
                                className="text-slate-300 group-hover:text-[#4A90E2]"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Trending Tags - Centered on mobile */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase w-full lg:w-auto mb-1 lg:mb-0">
                  Trending:
                </span>
                {["JEE", "NEET", "MBA", "B.Tech"].map((tag) => (
                  <button
                    key={tag}
                    className="text-[10px] px-3 py-1 bg-white border border-slate-200 rounded-full text-[#64748B] hover:border-[#4A90E2] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid - 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-4">
              {[
                { val: "500+", label: "Colleges", icon: Award },
                { val: "250+", label: "Exams", icon: Zap },
                { val: "12K+", label: "Reviews", icon: Star },
                { val: "98%", label: "Accuracy", icon: CheckCircle2 },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="space-y-1 border-l-2 border-slate-100 pl-3 md:pl-4 text-left"
                >
                  <div className="text-xl md:text-2xl font-black text-[#0F172A]">
                    {stat.val}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - VISUALS */}
          <div className="w-full flex-1 relative mt-10 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative z-20 mx-auto max-w-[320px] sm:max-w-[400px] lg:max-w-none">
              <div className="relative bg-white p-2 md:p-4 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 rotate-2">
                <img
                  src="/Hero.png"
                  alt="Campus"
                  className="w-full aspect-[4/5] object-cover rounded-[1.5rem] md:rounded-[2rem]"
                />
              </div>

              {/* Floating Review Card - Scaled for mobile */}
              <div className="absolute -right-4 md:-right-8 top-8 md:top-12 z-30 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-slate-50 flex items-center gap-2 md:gap-3">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                  ].map((url, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 md:w-9 md:h-9 rounded-full border-2 border-white overflow-hidden shrink-0"
                    >
                      <img
                        src={url}
                        className="w-full h-full object-cover"
                        alt="user"
                      />
                    </div>
                  ))}
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">4.9/5</span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">20k+ reviews</p>
                </div>
              </div>

              {/* Floating Placement Insight - Adjusted for mobile */}
              <div className="absolute -left-4 md:-left-12 bottom-8 md:bottom-12 z-30 bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl border border-slate-50 space-y-1 md:space-y-2 max-w-[140px] md:max-w-none">
                <div className="flex items-center gap-1 md:gap-2">
                  <TrendingUp className="text-green-500 w-4 h-4 md:w-[18px] md:h-[18px]" />
                  <span className="text-[10px] md:text-sm font-bold">
                    High Placement
                  </span>
                </div>
                <div className="w-full md:w-32 h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-green-500"></div>
                </div>
                <p className="text-[9px] md:text-[10px] text-[#64748B]">
                  85% package increase
                </p>
              </div>
            </div>

            {/* Background Circle - Hidden on small mobile to avoid layout shift */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-slate-200 rounded-full -z-10 opacity-30 hidden sm:block"></div>
          </div>
        </div>

        {/* PARTNER LOGOS - Responsive padding */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-slate-200/60">
          <p className="text-center text-black text-[9px] md:text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-10 px-4">
            Trusted by leading educational boards
          </p>
          <div className="grid grid-cols-2 md:flex md:flex-wrap text-black justify-center items-center gap-8 md:gap-20 opacity-40 grayscale px-4">
            <div className="text-sm md:text-xl font-bold italic  text-center">
              NAAC A++
            </div>
            <div className="text-sm md:text-xl font-bold italic  text-center">
              NIRF Ranked
            </div>
            <div className="text-sm md:text-xl font-bold italic  text-center uppercase">
              Aicte
            </div>
            <div className="text-sm md:text-xl font-bold italic  text-center uppercase">
              Ugc
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
