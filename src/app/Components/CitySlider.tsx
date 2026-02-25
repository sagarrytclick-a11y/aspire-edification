'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'
import { INDIAN_CITIES } from '@/lib/cities'

const CitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else if (window.innerWidth < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-24 font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            {/* Thoda bold heading */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Popular Cities</h2>
            <p className="text-[#64748B] text-sm">Find top colleges across India's educational hubs.</p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handlePrev} className="p-2 hover:border-[#4A90E2] border border-slate-200 rounded-md hover:bg-[#4A90E2] hover:text-white transition-colors">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <button onClick={handleNext} className="p-2 hover:border-[#4A90E2] border border-slate-200 rounded-md hover:bg-[#4A90E2] hover:text-white transition-colors">
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {INDIAN_CITIES.map((city) => (
              <div
                key={city.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="border border-zinc-400 rounded-lg p-6 hover:border-[#4A90E2] transition-colors bg-[#F8FAFC]">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white rounded-md shadow-sm border border-slate-50">
                      <MapPin size={18} className="text-[#4A90E2]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-slate-200/50 px-2 py-1 rounded">
                      {city.examName}
                    </span>
                  </div>

                  {/* City Name thoda bold kiya hai */}
                  <h3 className="text-xl font-semibold mb-1">{city.name}</h3>
                  <p className="text-sm text-[#64748B] mb-6 font-medium">{city.stats.colleges} Institutions</p>

                  <Link href={city.href}>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#4A90E2] hover:text-[#00D4FF] transition-colors">
                      View Directory <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Footer Action */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
          <Link href="/colleges" className="flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#4A90E2] transition-colors">
            <Search size={14} />
            Search for colleges in other cities
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CitySlider