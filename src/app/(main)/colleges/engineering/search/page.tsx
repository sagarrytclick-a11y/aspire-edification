'use client'
import React from 'react'
import SearchResults from '@/app/Components/SearchResults'

export default function EngineeringSearchPage() {
  return (
    <div className="min-h-screen bg-white text-[#1E293B] py-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Search <span className="text-[#4A90E2]">Engineering</span> Colleges
        </h1>
        <p className="text-[#64748B] max-w-2xl mx-auto text-base">
          Find premier engineering institutions with excellent placement records and industry connections.
        </p>
      </div>

      <SearchResults category="engineering" color="#4A90E2" />
    </div>
  )
}
