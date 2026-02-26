'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAllColleges } from '@/hooks/useColleges'
import { useCategories } from '@/hooks/useCategories'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'

export default function CategoryCollegesPage() {
  const params = useParams()
  const categorySlug = params.slug as string
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Get category info
  const { data: categories } = useCategories()
  const currentCategory = categories?.find(cat => cat.slug === categorySlug)

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string, exam: string, category?: string) => {
    setSearchTerm(term)
    setSelectedExam(exam)
    setCurrentPage(1)
  }, [])

  const { data: collegesResponse = { colleges: [] }, isLoading, error, refetch } = useAllColleges(searchTerm, 'all', selectedExam, categorySlug)

  const colleges = collegesResponse.colleges || []

  // Extract unique values for filters
  const { exams } = useMemo(() => {
    const examSet = new Set(colleges.flatMap((college: any) => college.exams || []))
    return {
      exams: Array.from(examSet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  if (!currentCategory && !isLoading) {
    return (
      <div className="min-h-screen py-12 bg-white text-[#1E293B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-[#64748B] mb-8">The category you're looking for doesn't exist.</p>
          <a href="/colleges" className="text-[#4A90E2] hover:underline">View All Colleges</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-white text-[#1E293B]">

      {/* HEADER SECTION */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top <span className="text-[#4A90E2]">{currentCategory?.name || categorySlug}</span> Colleges
          </h1>
          <p className="text-[#64748B] max-w-2xl mx-auto text-base mb-10">
            {currentCategory?.description || `Find the best ${categorySlug} colleges with excellent placement records and industry connections.`}
          </p>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <SearchSection
            onSearch={handleSearch}
            exams={exams}
            showCategoryFilter={true}
            initialCategory={categorySlug}
          />
        </div>
      </section>

      {/* COLLEGES GRID */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <CollegeMapping
            colleges={colleges}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onRefetch={refetch}
            currentCategory={categorySlug}
          />
        </div>
      </section>
    </div>
  )
}
