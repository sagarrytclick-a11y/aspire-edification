'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Navigation
} from 'lucide-react'
import { INDIAN_CITIES } from '@/lib/cities'

const CitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Memoized navigation logic
  const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Responsive Breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1.2) // Partial card for peek effect
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else if (window.innerWidth < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide logic
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(handleNext, 4000)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) handleNext()
    if (touchStart - touchEnd < -75) handlePrev()
  }

  // Calculate total dots for pagination
  const totalDots = Math.ceil(INDIAN_CITIES.length / itemsPerView)

  return (
    <section className="bg-[#12141D] py-16 md:py-24 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#4A90E2]/10 blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E212B] border border-[#94A3B8]/10 rounded-full mb-4">
              <Navigation size={12} className="text-[#00D4FF]" />
              <span className="text-[10px] font-black text-[#F8FAFC] uppercase tracking-[0.2em]">Explore Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F8FAFC] tracking-tighter leading-none uppercase">
              Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Epicenters</span>
            </h2>
          </div>
          
          {/* Controls - Hidden on very small mobile for space */}
          <div className="hidden sm:flex gap-3">
            <button onClick={handlePrev} className="p-4 bg-[#1E212B] border border-white/5 text-white rounded-2xl hover:border-[#4A90E2] transition-all"><ChevronLeft size={20} /></button>
            <button onClick={handleNext} className="p-4 bg-[#1E212B] border border-white/5 text-white rounded-2xl hover:border-[#4A90E2] transition-all"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div 
          className="relative touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {INDIAN_CITIES.map((city) => (
              <div
                key={city.id}
                className="flex-shrink-0 px-2 md:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group relative bg-[#1E212B] border border-white/5 rounded-[2.5rem] p-6 md:p-8 h-full transition-all duration-500 hover:border-[#4A90E2]/30 hover:bg-[#1E212B]/80 hover:-translate-y-2 flex flex-col">
                  
                  {/* City Icon */}
                  <div className="w-14 h-14 bg-[#12141D] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#00D4FF] transition-all">
                    <MapPin className="text-[#4A90E2] group-hover:text-[#00D4FF]" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tight group-hover:text-[#00D4FF] transition-colors">
                    {city.name}
                  </h3>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center py-4 border-y border-white/5 mb-6">
                    <div>
                      <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest mb-1">Institutes</p>
                      <p className="text-lg font-black text-[#F8FAFC]">{city.stats.colleges}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest mb-1">Exam focus</p>
                      <p className="text-xs font-bold text-[#4A90E2] uppercase">{city.examName}</p>
                    </div>
                  </div>

                  <Link href={city.href} className="mt-auto">
                    <button className="w-full bg-[#4A90E2] hover:bg-[#00D4FF] text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/10">
                      View Colleges <ArrowRight size={14} />
                    </button>
                  </Link>

                  {/* Aesthetic Watermark */}
                  <div className="absolute bottom-4 right-8 text-6xl font-black text-white/[0.03] pointer-events-none italic uppercase select-none">
                    {city.name.substring(0, 2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Pagination - Optimized for Mobile */}
        <div className="flex justify-center items-center gap-2 mt-10 md:mt-16">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * Math.floor(itemsPerView))}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                Math.round(currentIndex / itemsPerView) === idx 
                ? 'w-10 bg-[#4A90E2]' 
                : 'w-2 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Global Directory Link */}
        <div className="mt-12 text-center">
          <Link href="/colleges">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/10 text-[#94A3B8] font-bold rounded-2xl hover:text-[#F8FAFC] hover:border-[#4A90E2] transition-all text-xs uppercase tracking-widest group">
              <Globe size={16} className="text-[#00D4FF] group-hover:rotate-12 transition-transform" />
              Search Across 50+ Cities
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CitySlider