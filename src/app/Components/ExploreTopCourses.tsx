'use client'

import React from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Stethoscope, 
  Briefcase,
  ArrowRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react'

const ExploreTopCourses = () => {
  // Theme Color Tokens from your saved palette
  const PRIMARY_BLUE = "#4A90E2"
  const SECONDARY_CYAN = "#00D4FF"
  const BACKGROUND_DEEP = "#12141D"
  const SURFACE_CARD = "#1E212B"
  const TEXT_PRIMARY = "#F8FAFC"
  const TEXT_MUTED = "#94A3B8"

  const categories = [
    {
      title: "Engineering & Tech",
      description: "Shape the future with B.Tech/M.Tech from premier institutes like IITs & NITs. Focused on innovation and high-scale placements.",
      icon: <BookOpen className="w-8 h-8 text-[#00D4FF]" />,
      examName: "JEE / GATE",
      href: "/colleges/engineering",
      features: ["Elite IIT/NIT Network", "Tech-First Curriculum", "High ROI Placements"],
      stats: { colleges: "5000+", students: "2M+ Aspirants" }
    },
    {
      title: "Medical Sciences",
      description: "Excellence in healthcare. Discover top-tier medical colleges for MBBS and specialized clinical research programs.",
      icon: <Stethoscope className="w-8 h-8 text-[#00D4FF]" />,
      examName: "NEET UG/PG",
      href: "/colleges/medical",
      features: ["AIIMS Level Training", "Hands-on Clinicals", "Global Recognition"],
      stats: { colleges: "850+", students: "1.5M+ Aspirants" }
    },
    {
      title: "Management Excellence",
      description: "Leadership starts here. Find top-ranked B-Schools for MBA and PGDM with global corporate connections.",
      icon: <Briefcase className="w-8 h-8 text-[#00D4FF]" />,
      examName: "CAT / XAT",
      href: "/colleges/management",
      features: ["Strategic Leadership", "Corporate Networks", "CXO Mentorship"],
      stats: { colleges: "3200+", students: "500k+ Aspirants" }
    }
  ]

  return (
    <div className={`bg-[${BACKGROUND_DEEP}] py-28 px-6 lg:px-24 font-sans text-[${TEXT_PRIMARY}] relative overflow-hidden`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#4A90E2]/10 border border-[#4A90E2]/30 text-[#00D4FF] px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] mb-6">
            <Award size={14} />
            Academic Verticals
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F8FAFC] tracking-tight mb-8">
            Expertly Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Career Paths</span>
          </h2>
          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between your aspirations and world-class education. Choose your domain and let us guide your journey.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group relative bg-[#1E212B] border border-[#94A3B8]/10 rounded-[2rem] p-10 hover:border-[#4A90E2]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500" />
              
              {/* Icon & Title */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#12141D] border border-[#94A3B8]/20 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:shadow-[#4A90E2]/20 transition-all">
                  {category.icon}
                </div>

                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 group-hover:text-[#00D4FF] transition-colors">
                  {category.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                  {category.description}
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full shadow-[0_0_8px_#4A90E2]" />
                      <span className="text-sm font-medium text-[#F8FAFC]/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Stats Surface */}
                <div className="flex items-center justify-between bg-[#12141D] rounded-2xl p-5 mb-8 border border-[#94A3B8]/5">
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-tighter mb-1 font-bold">Verified Colleges</p>
                    <p className="text-lg font-black text-[#F8FAFC]">{category.stats.colleges}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#94A3B8]/20" />
                  <div className="text-right">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-tighter mb-1 font-bold">Impact</p>
                    <p className="text-sm font-bold text-[#00D4FF]">{category.stats.students}</p>
                  </div>
                </div>

                {/* Action CTA */}
                <Link href={category.href}>
                  <button className="w-full bg-[#1E212B] border border-[#4A90E2] hover:bg-[#4A90E2] text-[#F8FAFC] font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group/btn">
                    Explore Institutions
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Redesigned as a Floating Dark Section */}
        <div className="relative bg-gradient-to-br from-[#1E212B] to-[#12141D] border border-[#4A90E2]/20 rounded-[2.5rem] p-12 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00D4FF]/5 blur-[80px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl font-black text-[#F8FAFC] mb-6">
              Confused About Your Next Step?
            </h3>
            <p className="text-[#94A3B8] mb-10 text-lg">
              Our mentorship program has helped over <span className="text-[#00D4FF] font-bold">15,000+ students</span> land their dream campus. Get a personalized roadmap today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/colleges" className="w-full sm:w-auto">
                <button className="w-full px-10 py-4 bg-[#4A90E2] hover:bg-[#00D4FF] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#4A90E2]/20 active:scale-95">
                  Browse Directories
                </button>
              </Link>
              <Link href="/exams" className="w-full sm:w-auto">
                <button className="w-full px-10 py-4 bg-transparent border-2 border-[#94A3B8]/30 hover:border-[#00D4FF] text-[#F8FAFC] font-black rounded-2xl transition-all flex items-center justify-center gap-2">
                  Entrance Guide
                  <TrendingUp size={18} className="text-[#00D4FF]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreTopCourses