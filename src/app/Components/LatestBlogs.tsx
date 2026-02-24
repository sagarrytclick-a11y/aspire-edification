"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Theme Color Tokens
const PRIMARY_BLUE = "#4A90E2"; 
const SECONDARY_CYAN = "#00D4FF";
const BG_DEEP = "#12141D";
const SURFACE_CARD = "#1E212B";

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  image?: string;
  createdAt: string;
};

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const extractDescription = (content: string) => {
  const plainText = content.replace(/<[^>]*>/g, "");
  return plainText.length > 110 ? plainText.substring(0, 110) + "..." : plainText;
};

const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length;
  return `${Math.ceil(wordCount / 200)} min read`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
};

const useBlogs = () => {
  return useQuery<BlogItem[]>({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      return result.data.slice(0, 3);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default function LatestBlogs() {
  const { data: blogs, isLoading, error } = useBlogs();

  if (error) return null;

  return (
    <section className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4A90E2]/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[120px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
            <Newspaper size={14} className="text-[#4A90E2]" />
            Latest Updates
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#F8FAFC] mb-8 tracking-tighter">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">News & Insights</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
            Stay updated with the latest admission news, exam notifications, 
            and career guidance from our expert counselling team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {isLoading ? (
             [1, 2, 3].map((i) => <div key={i} className="h-[480px] bg-[#1E212B]/50 rounded-[40px] animate-pulse border border-[#94A3B8]/5" />)
          ) : (
            blogs?.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="group bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] overflow-hidden hover:border-[#4A90E2]/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-3 flex flex-col h-full relative"
              >
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#12141D] to-[#1E212B] text-[#4A90E2] font-black text-5xl">
                      {initials(blog.title)}
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 bg-[#12141D]/80 backdrop-blur-xl text-[#00D4FF] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-2xl">
                    {blog.category}
                  </div>

                  {/* Dark Overlay for better text transition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E212B] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Section */}
                <div className="p-10 flex flex-col flex-grow relative">
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#4A90E2]" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-[#00D4FF]" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#F8FAFC] leading-tight mb-4 group-hover:text-[#4A90E2] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 line-clamp-2">
                    {extractDescription(blog.content)}
                  </p>

                  <div className="mt-auto pt-6 border-t border-[#94A3B8]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#12141D] border border-[#4A90E2]/20 flex items-center justify-center text-[#4A90E2] shadow-inner">
                        <User size={16} />
                      </div>
                      <span className="text-[10px] font-black text-[#F8FAFC] uppercase tracking-widest">Counselor Team</span>
                    </div>
                    
                    <div className="w-12 h-12 rounded-2xl bg-[#12141D] border border-[#94A3B8]/10 flex items-center justify-center text-[#94A3B8] group-hover:bg-[#4A90E2] group-hover:text-white group-hover:border-[#4A90E2] transition-all duration-300 shadow-xl">
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-10 bg-[#1E212B] border border-[#94A3B8]/10 rounded-[40px] px-12 py-7 shadow-2xl relative overflow-hidden group/cta">
            <div className="absolute inset-0 bg-[#4A90E2]/5 opacity-0 group-hover/cta:opacity-100 transition-opacity" />
            
            <div className="text-left md:pr-10 md:border-r border-[#94A3B8]/10 relative z-10">
              <div className="font-black text-[#F8FAFC] text-xl tracking-tight mb-1">100+ Expert Articles</div>
              <div className="text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.2em]">In-depth Insights & Career Guides</div>
            </div>
            
            <Link
              href="/blogs"
              className="bg-[#4A90E2] text-white px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#00D4FF] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(74,144,226,0.3)] active:scale-95 relative z-10"
            >
              View Library
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}