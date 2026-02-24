'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAllColleges } from '@/hooks/useColleges'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import { Sparkles } from 'lucide-react'

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string, country: string, exam: string) => {
    setSearchTerm(term)
    setSelectedCountry(country)
    setSelectedExam(exam)
    setCurrentPage(1)
  }, [])

  const { data: collegesResponse, isLoading, error, refetch } = useAllColleges(searchTerm, selectedCountry, selectedExam)
  const colleges = collegesResponse?.colleges || []

  // Extract unique values for filters
  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(colleges.map((c: any) => typeof c.country_ref === "object" ? c.country_ref.name : c.country_ref).filter(Boolean))
    const examSet = new Set(colleges.flatMap((college: any) => college.exams || []))
    return {
      countries: Array.from(countrySet) as string[],
      exams: Array.from(examSet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- HEADER SECTION --- */}
      <header className="bg-[#F8FAFC] border-b border-slate-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex items-center gap-2 text-[#4A90E2] mb-4">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">2026 Academic Directory</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-8 tracking-tight">
            Find your <span className="text-[#4A90E2]">Future Hub</span>
          </h1>
          
          {/* SEARCH SECTION */}
          <SearchSection
            onSearch={handleSearch}
            countries={countries}
            exams={exams}
            placeholder="Search college, city..."
            className="max-w-4xl"
          />
        </div>
      </header>

      {/* --- RESULTS SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        <CollegeMapping
          colleges={colleges}
          isLoading={isLoading}
          isError={!!error}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onRefetch={refetch}
          emptyMessage="No institutions found"
        />
      </main>
    </div>
  )
}