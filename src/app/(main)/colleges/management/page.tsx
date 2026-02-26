'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useAllColleges } from '@/hooks/useColleges'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'

export default function ManagementCollegesPage() {
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

  const { data: collegesResponse = { colleges: [] }, isLoading, error, refetch } = useAllColleges(searchTerm, selectedCountry, selectedExam)

  const colleges = useMemo(() => {
    return collegesResponse.colleges.filter((college: any) => 
      college.categories?.includes('management')
    )
  }, [collegesResponse.colleges])

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
    <div className="min-h-screen py-12 bg-white text-[#1E293B]">
      
      {/* HEADER SECTION - Static */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top <span className="text-[#8B5CF6]">Management</span> Colleges
          </h1>
          <p className="text-[#64748B] max-w-2xl mx-auto text-base mb-10">
            Discover leading business schools offering MBA, PGDM programs with strong industry connections.
          </p>

          <SearchSection
            onSearch={handleSearch}
            countries={countries}
            exams={exams}
            placeholder="Search by college name, city or state..."
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
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
          emptyMessage="No matching management colleges found"
        />
      </section>
    </div>
  )
}
