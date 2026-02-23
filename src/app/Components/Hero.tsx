"use client";

import React, { useState } from "react";
import { Search, GraduationCap, BookOpen, Building2, MapPin, ChevronRight } from "lucide-react";
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
    <section className="relative bg-slate-50 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full">
            India's Most Trusted Admission Portal
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find Your Dream College & <br />
            <span className="text-blue-600">Secure Your Future</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore 500+ top-rated universities, compare courses, and get expert guidance for JEE, NEET, and CAT admissions.
          </p>

          {/* Search Section */}
          <div className="relative max-w-4xl mx-auto group">
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-blue-200 overflow-hidden transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-200 focus-within:shadow-blue-200/50">
              <div className="flex items-center">
                {/* Search Icon */}
                <div className="pl-6 pr-2 py-4 text-blue-600">
                  <Search size={24} />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(e.target.value.length >= 2);
                  }}
                  placeholder="Search colleges like IIT Delhi, AIIMS, NITs..."
                  className="flex-1 py-4 px-2 text-slate-800 placeholder-slate-400 text-lg font-medium focus:outline-none"
                />

                {/* Search Button */}
                <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 font-bold transition-all duration-300 shadow-lg">
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              <Search size={20} />
              Search Colleges
            </button>

            {/* Enhanced Dropdown Results */}
            {showResults && (
              <div className="absolute left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-blue-100 max-h-[450px] overflow-y-auto z-50">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center gap-3 text-blue-600">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="font-medium">Searching colleges...</span>
                    </div>
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="py-2">
                    <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
                      <p className="text-sm font-semibold text-blue-800">Found {colleges.length} colleges</p>
                    </div>
                    {colleges.map((college: any) => (
                      <Link
                        key={college._id}
                        href={`/colleges/${college.slug}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition-all duration-200 border-b border-slate-50 last:border-none group"
                      >
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                          <Building2 size={20} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-700 transition-colors">
                            {college.name}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                            <MapPin size={14} className="text-blue-500" />
                            {college.state}
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium mb-2">No colleges found</p>
                    <p className="text-slate-400 text-sm">Try searching for different colleges or locations</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Categories */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { label: "Engineering", icon: <GraduationCap size={16} /> },
              { label: "Medical", icon: <BookOpen size={16} /> },
              { label: "Management", icon: <Building2 size={16} /> },
            ].map((cat, i) => (
              <button key={i} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-slate-900">15k+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Colleges</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">100+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Exams Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Expert Advice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;