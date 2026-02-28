import React from 'react';
import { Star, Users, Award, Zap, CheckCircle2, Globe, Target, BookOpen, Linkedin, Mail, MapPin } from 'lucide-react';
import AboutClientButtons from '@/components/AboutClientButtons';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#12141D] text-[#F8FAFC]">

      <section className="py-26 bg-[#1E212B]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet our <span className="text-[#4A90E2]">Founder</span>
            </h2>
            <p className="text-[#94A3B8]">The visionary behind Aspire Edification’s mission.</p>
          </div>

          {/* Single Founder Card - Centered and Enlarged */}
          <div className="max-w-2xl mx-auto">
            <div className="group relative bg-[#12141D] p-8 md:p-10 rounded-3xl border border-slate-800 hover:border-[#4A90E2]/50 transition-all shadow-2xl">
              <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">

                {/* Founder Image with Decorative Ring */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <img
                    src="/about/founder.jpeg"
                    alt="Ramjanam Rai"
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-700"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ramjanam Rai</h3>
                  <p className="text-[#00D4FF] text-base mb-4 font-semibold tracking-wide uppercase">CEO & Founder</p>
                  <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
                    "7+ years in educational strategy and placement data analysis. Dedicated to bringing transparency to the student recruitment ecosystem."
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start gap-5">
                    <a href="#" className="p-2 bg-[#1E212B] rounded-lg text-[#94A3B8] hover:text-[#4A90E2] hover:bg-[#1E212B] transition-colors border border-slate-800">
                      <Linkedin size={20} />
                    </a>
                    <a href="mailto:contact@aspire.com" className="p-2 bg-[#1E212B] rounded-lg text-[#94A3B8] hover:text-[#4A90E2] hover:bg-[#1E212B] transition-colors border border-slate-800">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#12141D]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our <span className="text-[#00D4FF]">Workplace</span>
              </h2>
              <p className="text-[#94A3B8]">Where data meets human-centric innovation.</p>
            </div>
            <div className="flex items-center gap-2 text-[#4A90E2] font-bold text-[10px] tracking-[0.2em] uppercase bg-[#1E212B] px-4 py-2 rounded-lg border border-slate-800">
              <MapPin size={14} /> Global Headquarters
            </div>
          </div>

          {/* Advanced Bento Grid Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[600px]">

            {/* Feature Image (Bada Image) */}
            <div className="col-span-2 md:col-span-3 md:row-span-2 relative group overflow-hidden rounded-3xl border border-slate-800">
              <img src="/about/office-1.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Main Office" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141D]/90 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg">Main Workspace</p>
                <p className="text-[#00D4FF] text-xs uppercase tracking-widest">Innovation Hub</p>
              </div>
            </div>

            {/* Top Right Box */}
            <div className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-2xl border border-slate-800">
              <img src="/about/office-2.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Meeting" />
            </div>

            {/* Middle Box */}
            <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl border border-slate-800">
              <img src="/about/office-3.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Collaborative" />
            </div>

            {/* Bottom Row Small Boxes */}
            <div className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-2xl border border-slate-800">
              <img src="/about/office-4.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Office Life" />
            </div>

            <div className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-2xl border border-slate-800">
              <img src="/about/office-7.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Tech Setup" />
            </div>

            <div className="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl border border-slate-800">
              <img src="/about/office-6.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Chill Zone" />
            </div>

          </div>
        </div>
      </section>

       <section className="py-16 bg-[#1E212B] border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "7 yrs", label: "Years of Excellence", icon: <CheckCircle2 className="text-[#00D4FF]" size={20} />, sublabel: "3 months, 9 days" },
              { value: "500+", label: "Partner Institutions", icon: <Globe className="text-[#4A90E2]" size={20} /> },
              { value: "5k+", label: "Career Pathings", icon: <Target className="text-[#00D4FF]" size={20} /> },
              { value: "24/7", label: "Expert Support", icon: <Users className="text-[#4A90E2]" size={20} /> }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">{stat.label}</div>
                {stat.sublabel && <div className="text-[8px] text-[#64748B] mt-1">{stat.sublabel}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
   
    </main>
  );
}