"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Clock, Banknote, FileText, ArrowRight, Sparkles, CalendarDays } from 'lucide-react';
import {
  MapPin
} from "lucide-react";
import { useState, useEffect, useRef } from 'react';

// Brand Color Constants - Strictly using #1A4AB2
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  
const SOFT_SLATE = "#64748B";

const COLLEGES_PER_PAGE = 6;

/* =======================
   UNIVERSITY CARD
======================= */

const UniversityCard = ({
  name,
  image,
  slug,
  country = "India",
  ranking,
  fees,
  duration,
  establishment_year,
  about,
  overview,
  exams,
  annual_tuition_fee,
  courses,
  accreditation
}: any) => {

  return (
    <Link href={`/colleges/${slug}`} className="block group h-full">
      <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden hover:border-[#1A4AB2]/30 hover:shadow-[0_20px_50px_-12px_rgba(26,74,178,0.15)] transition-all duration-500 flex flex-col h-full">
        
        {/* Image Section - Scaled Down */}
        <div className="h-48 bg-slate-100 relative overflow-hidden">
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          
          {ranking && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
              <p className="text-[10px] font-black text-[#1A4AB2] uppercase tracking-tighter">
                Rank #{ranking}
              </p>
            </div>
          )}

          {accreditation && (
            <div className="absolute top-4 right-4 bg-[#1A4AB2] text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
              {accreditation}
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
            <MapPin size={12} className="text-[#FACC15]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{country}</span>
          </div>
        </div>

        {/* Content Section - Compact Layout */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-black text-slate-950 leading-[1.2] mb-2 group-hover:text-[#1A4AB2] transition-colors line-clamp-2 uppercase tracking-tight">
              {name}
            </h3>
            <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed">
              {overview || about || "Explore world-class education and career opportunities."}
            </p>
          </div>

          {/* Combined Data Points - More Compact */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Banknote size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Tuition</span>
              </div>
              <p className="text-[11px] font-bold text-slate-900 truncate">
                {annual_tuition_fee || fees || "Enquire"}
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Clock size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Period</span>
              </div>
              <p className="text-[11px] font-bold text-slate-900">{duration || "4"} Years</p>
            </div>
          </div>

          {/* Tags - Unified Area */}
          <div className="space-y-3 mb-6">
            {courses && (
              <div className="flex flex-wrap gap-1.5">
                {courses.slice(0, 2).map((course: any, i: number) => (
                  <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tight">
                    {typeof course === 'string' ? course : course.course_name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Minimal */}
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#1A4AB2]">
                <GraduationCap size={14} />
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-0.5">Established</p>
                <p className="text-[10px] font-bold text-slate-700">{establishment_year || "---"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1A4AB2] font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
              View Profile
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   UPCOMING EXAMS SECTION
======================= */

const UpcomingExamsSection = ({ exams, loading }: { exams: any[]; loading: boolean }) => {
  // Theme Palette
  const PRIMARY_BLUE = "#4A90E2"
  const SECONDARY_CYAN = "#00D4FF"
  const BG_DEEP = "#12141D"
  const SURFACE_CARD = "#1E212B"

  return (
    <section className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4A90E2]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
            <CalendarDays size={14} className="text-[#4A90E2]" />
            Entrance Calendar 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F8FAFC] mb-6 tracking-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Exam Dates</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-[#1E212B]/50 rounded-[40px] animate-pulse border border-[#94A3B8]/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {exams.slice(0, 8).map((exam, idx) => (
              <Link 
                key={idx} 
                href={`/exams/${exam.slug}`} 
                className="group bg-[#1E212B] border border-[#94A3B8]/5 rounded-[40px] p-8 hover:border-[#4A90E2]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-[#12141D] text-[#4A90E2] border border-[#94A3B8]/10 flex items-center justify-center group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] transition-all shadow-inner mb-6">
                  <FileText size={24} />
                </div>

                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#00D4FF] transition-colors line-clamp-1">
                  {exam.short_name || exam.name}
                </h3>

                <div className="flex items-center gap-2 text-[10px] text-[#4A90E2] font-black uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF] animate-pulse"></span> 
                  Live Registration
                </div>

                <div className="mt-4 pt-6 border-t border-[#94A3B8]/5 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-widest mb-1">Exam Date</p>
                    <p className="text-sm font-black text-[#F8FAFC]">{exam.next_date || "Coming Soon"}</p>
                  </div>
                  <div className="text-[#94A3B8] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Floating CTA Bar */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center bg-[#1E212B] border border-[#94A3B8]/10 text-white rounded-[40px] pl-6 md:pl-10 pr-4 py-4 md:py-5 shadow-2xl relative">
            {/* Subtle glow behind CTA */}
            <div className="absolute inset-0 bg-[#4A90E2]/5 blur-xl rounded-[40px]" />
            
            <div className="flex -space-x-3 mr-6 md:mr-8 relative z-10">
              {[1, 2, 3].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-[#1E212B]" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#1E212B] bg-[#4A90E2] text-white text-[10px] font-black flex items-center justify-center shadow-lg">+10k</div>
            </div>

            <p className="text-sm font-bold mr-12 hidden lg:block tracking-tight text-[#94A3B8] relative z-10">
              Join <span className="text-[#F8FAFC]">10,000+ students</span> tracking exam schedules
            </p>

            <Link href="/exams" className="bg-[#4A90E2] hover:bg-[#00D4FF] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(74,144,226,0.2)] active:scale-95 relative z-10">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =======================
   MAIN SECTION
======================= */



export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();
  const [displayedColleges, setDisplayedColleges] = useState(COLLEGES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedUniversities = universities.slice(0, displayedColleges);
  const hasMoreColleges = displayedColleges < universities.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedColleges(prev => Math.min(prev + COLLEGES_PER_PAGE, universities.length));
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="space-y-32 py-32 bg-[#12141D] relative overflow-hidden">
      {/* Background Glows for Premium Look */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A90E2]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

      {/* Universities Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
            <Sparkles size={14} className="animate-pulse" />
            Partner Institutions
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#F8FAFC] mb-8 tracking-tighter">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Indian Colleges</span>
          </h2>
          <p className="text-[#94A3B8] max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Detailed guides on admissions, course structures, and placement records for India's elite academic universities.
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedUniversities.map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              about={u.about_content}
              fees={u.fees_structure?.courses?.[0]?.annual_tuition_fee}
              duration={u.fees_structure?.courses?.[0]?.duration}
              establishment_year={u.establishment_year}
              ranking={u.ranking?.country_ranking || u.ranking}
              courses={u.popular_courses || ["Engineering", "Medicine", "Management"]}
              accreditation={u.accreditation || "AICTE"}
            />
          ))}
        </div>

        {/* Load More & Navigation */}
        <div className="flex flex-col items-center justify-center py-20 mt-12 border-t border-[#94A3B8]/5">
          <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.4em] text-center mb-8">
            Displaying <span className="text-[#F8FAFC]">{displayedColleges}</span> of <span className="text-[#F8FAFC]">{universities.length}</span> institutions
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {hasMoreColleges && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="group bg-transparent hover:bg-[#1E212B] text-[#F8FAFC] border-2 border-[#94A3B8]/20 px-10 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <div className="w-5 h-5 border-2 border-[#94A3B8]/20 border-t-[#00D4FF] rounded-full animate-spin" />
                ) : (
                  <>
                    Explore More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
            
            <Link 
              href="/colleges" 
              className="bg-[#4A90E2] hover:bg-[#00D4FF] text-white px-10 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(74,144,226,0.2)] active:scale-95"
            >
              View All Colleges <ArrowRight size={18} />
            </Link>
          </div>
          
          {!hasMoreColleges && universities.length > 0 && (
            <div className="mt-8 px-6 py-2 bg-[#1E212B] rounded-full border border-[#94A3B8]/10">
              <p className="text-[#00D4FF] text-[10px] font-bold uppercase tracking-widest">
                All institutions have been loaded
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Secondary Section */}
      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}

const useFeaturedData = () => {
  const colleges = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => (await fetch("/api/colleges")).json(),
  });
  const exams = useQuery({
    queryKey: ["exams"],
    queryFn: async () => (await fetch("/api/admin/exams")).json(),
  });

  return {
    universities: colleges.data?.data?.colleges || [],
    exams: exams.data?.data || [],
    loading: colleges.isLoading || exams.isLoading,
  };
};