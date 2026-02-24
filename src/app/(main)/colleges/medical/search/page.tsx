'use client'
import React from 'react'
import SearchResults from '@/app/Components/SearchResults'

export default function MedicalSearchPage() {
  return (
    <div className="min-h-screen bg-white text-[#1E293B] py-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Search <span className="text-[#10B981]">Medical</span> Colleges
        </h1>
        <p className="text-[#64748B] max-w-2xl mx-auto text-base">
          Find premier medical colleges offering MBBS, BDS, and specialized healthcare programs.
        </p>
      </div>

      <SearchResults category="medical" color="#10B981" />
    </div>
  )
}
