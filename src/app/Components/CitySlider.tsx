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
    <section className="py-16  sm:py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-6xl sm:px-[20px] mx-auto">

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
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="border-2 border-slate-300 rounded-xl p-4 sm:p-6 hover:border-[#4A90E2] transition-colors bg-white h-full">

                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-white rounded-md shadow-sm border border-slate-50">
                      <MapPin size={14} className="text-[#4A90E2]" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {city.examName}
                    </span>
                  </div>

                  {/* City Name thoda bold kiya hai */}
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 text-[#1E293B]">{city.name}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mb-4 sm:mb-6 font-medium">{city.stats.colleges} Institutions</p>

                  <Link href={city.href}>
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-[#4A90E2] hover:text-[#00D4FF] transition-colors">
                      View Directory <ArrowRight size={3} className="sm:size-5" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Footer Action */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 flex justify-center">
          <Link href="/colleges" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#4A90E2] transition-colors">
            <Search size={12} className="sm:size-5" />
            Search for colleges in other cities
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CitySlider