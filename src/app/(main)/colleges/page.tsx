'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAllColleges } from '@/hooks/useColleges'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import { Sparkles } from 'lucide-react'

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string, exam: string, category?: string) => {
    setSearchTerm(term)
    setSelectedExam(exam)
    setSelectedCategory(category || 'all')
    setCurrentPage(1)
  }, [])

  const { data: collegesResponse, isLoading, error, refetch } = useAllColleges(searchTerm, 'all', selectedExam)
  const allColleges = collegesResponse?.colleges || []
  
  // Filter colleges by selected category
  const colleges = useMemo(() => {
    if (selectedCategory === 'all') {
      return allColleges
    }
    return allColleges.filter((college: any) =>
      college.categories?.includes(selectedCategory)
    )
  }, [allColleges, selectedCategory])

  // Extract unique values for filters
  const { exams, categories } = useMemo(() => {
    const examSet = new Set(colleges.flatMap((college: any) => college.exams || []))
    const categorySet = new Set(colleges.flatMap((college: any) => college.categories || []))
    return {
      exams: Array.from(examSet) as string[],
      categories: Array.from(categorySet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  return (
    <div className="min-h-screen py-12 bg-white font-sans text-slate-900">

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
            exams={exams}
            categories={categories}
            showCategoryFilter={true}
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