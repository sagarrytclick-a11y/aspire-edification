"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Typewriter from "typewriter-effect"; // You may need to run: npm install typewriter-effect

const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const bgImages = [
    "https://static-bestcolleges.tosshub.com/2025/News/pNaO02SgV0ZKGrxFJfCmrq0prMSQUz97jsdEkPzi.jpg",
    "https://www.nmrec.edu.in/wp-content/uploads/2024/11/Batukamma-Celebrations-1.jpg",
    "https://citycollege.ac.in/wp-content/uploads/2025/10/1700x900-College-1024x542-1.jpg",
  ];

  const { data: collegesData, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(`/api/colleges?search=${query}`);
      return res.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#12141D] text-[#F8FAFC] overflow-hidden">

      {/* BACKGROUND IMAGE SLIDER LAYER */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBg ? "opacity-40" : "opacity-0"
              }`}
          >
            <img
              src={src}
              alt="Campus"
              className={`w-full h-full object-cover ${index === currentBg ? "animate-kenburns" : ""
                }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141D]/60 via-[#12141D]/80 to-[#12141D] z-[1]"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center py-20">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 mt-10 tracking-tight leading-[1.1]">
          The Smartest Way to <br />
          <span className="text-[#4A90E2] inline-block">
            <Typewriter
              options={{
                strings: ['Pick Your College.', 'Build Your Future.', 'Find Your Match.'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                wrapperClassName: "text-[#4A90E2]",
                cursorClassName: "text-[#4A90E2] animate-pulse"
              }}
            />
          </span>
        </h1>
        <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Find your ideal campus match powered by
          <span className="text-white font-medium ml-1">verified placement records</span> and
          <span className="text-white font-medium ml-1">vetted faculty insights.</span>
        </p>

        {/* SEARCH BAR AREA */}
        <div className="max-w-2xl mx-auto mb-8 relative z-50">
          <div className="flex items-center bg-[#1E212B]/90 border border-white/10 backdrop-blur-md rounded-full p-1.5 shadow-2xl focus-within:border-[#4A90E2]/60 transition-all">
            <Search className="ml-5 text-[#94A3B8]" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length >= 2);
              }}
              placeholder="Search College or Course..."
              className="flex-1 bg-transparent py-4 px-4 text-[#F8FAFC] placeholder-[#94A3B8] text-base focus:outline-none"
            />
            <button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95">
              Search
            </button>
          </div>

          {/* RESULTS DROPDOWN */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#1E212B] border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden text-left backdrop-blur-xl">
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                {isLoading ? (
                  <div className="p-8 text-center text-[#4A90E2] animate-pulse">
                    Searching colleges...
                  </div>
                ) : colleges.length > 0 ? (
                  colleges.map((college: any) => (
                    <Link
                      key={college._id}
                      href={`/colleges/${college.slug}`}
                      className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-[#12141D]">
                          <img
                            src={college.banner_url || "/api/placeholder/40/40"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#F8FAFC] text-sm group-hover:text-[#4A90E2] transition-colors">
                            {college.name}
                          </p>
                          <p className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                            <MapPin size={10} /> {college.city}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-all"
                      />
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-[#94A3B8] text-sm italic">
                    No matches found for "{query}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* TRENDING TAGS */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mr-2">Trending:</span>
          {["JEE", "NEET", "IIT", "IIM"].map((item, index) => (
            <button
              key={index}
              className="px-4 py-1.5 bg-[#1E212B]/80 border border-white/5 rounded-full text-xs text-[#94A3B8] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all active:scale-95"
            >
              {item}
            </button>
          ))}
        </div>

        {/* STATS BAR */}
        <div className="flex justify-center gap-6 md:gap-16 max-w-3xl mx-auto border-t border-white/10 pt-8">
          {[
            { val: "500+", label: "Colleges" },
            { val: "10+", label: "Exams" },
            { val: "1K+", label: "Reviews" },
            { val: "98%", label: "Accuracy" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-xl md:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#4A90E2] transition-colors">{stat.val}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-kenburns {
          animation: kenburns 10s linear infinite alternate;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4A90E2;
          border-radius: 10px;
        }
        /* Fix to ensure the typewriter cursor doesn't wrap weirdly */
        .Typewriter__cursor {
          display: inline-block;
          margin-left: 2px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
