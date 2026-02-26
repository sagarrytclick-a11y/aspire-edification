'use client'

import React, { useMemo, memo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ArrowRight, AlertCircle, MapPin, GraduationCap, RefreshCw, Search } from 'lucide-react'
import { COLLEGE_CATEGORIES } from '@/lib/constants/collegeCategories'

interface CollegeMappingProps {
  colleges: any[]
  isLoading: boolean
  isError?: boolean
  error?: any
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  showPagination?: boolean
  emptyMessage?: string
  className?: string
  onRefetch?: () => void
}

const CollegeCard = memo(({ college }: { college: any }) => {
  return (
    <div className="group bg-white rounded-xl border-2 border-slate-300 hover:border-[#4A90E2] hover:shadow-lg hover:shadow-[#4A90E2]/20 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* College Banner */}
      <div className="relative h-48 bg-slate-50 overflow-hidden border-b-2 border-slate-300">
        {college.banner_url ? (
          <img
            src={college.banner_url}
            alt={college.name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GraduationCap className="w-16 h-16 text-slate-300" />
          </div>
        )}
        {college.city && (
          <div className="absolute top-4 right-4 bg-[#4A90E2] text-white px-3 py-1 rounded-lg text-xs font-bold border border-white/20">
            {college.city}
          </div>
        )}
      </div>

      {/* College Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#4A90E2] transition-colors line-clamp-2">
            {college.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <MapPin className="w-4 h-4 text-[#4A90E2]" />
            <span>{typeof college.country_ref === "object" ? college.country_ref.name : college.country_ref}</span>
            {college.city && (
              <>
                <span>•</span>
                <span className="text-[#4A90E2] font-medium">{college.city}</span>
              </>
            )}
          </div>
        </div>

        {/* Categories */}
        {college.categories && college.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {college.categories.slice(0, 2).map((category: string) => (
              <span key={category} className="text-[9px] font-black bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-300 uppercase tracking-tighter">
                {category}
              </span>
            ))}
            {college.categories.length > 2 && (
              <span className="text-[9px] font-black bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-300 uppercase tracking-tighter">
                +{college.categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Exams */}
        {college.exams && college.exams.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {college.exams.slice(0, 2).map((exam: string) => (
              <span key={exam} className="text-[9px] font-black bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-300 uppercase tracking-tighter">
                {exam}
              </span>
            ))}
            {college.exams.length > 2 && (
              <span className="text-[9px] font-black bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-300 uppercase tracking-tighter">
                +{college.exams.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Key Info */}
        <div className="space-y-2 mb-6 text-sm">
          {college.establishment_year && (
            <div className="flex justify-between">
              <span className="text-slate-600">Established:</span>
              <span className="font-medium text-[#1E293B]">{college.establishment_year}</span>
            </div>
          )}
          {college.fees && (
            <div className="flex justify-between">
              <span className="text-slate-600">Fees:</span>
              <span className="font-medium text-[#1E293B]">₹{college.fees.toLocaleString()}/year</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/colleges/${college.slug}`} className="mt-auto">
          <Button className="w-full bg-[#1E293B] hover:bg-[#4A90E2] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg border-2 border-slate-300">
            View Details
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
})

CollegeCard.displayName = 'CollegeCard'

const CollegeMapping = memo(({ 
  colleges,
  isLoading,
  isError = false,
  error,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  showPagination = true,
  emptyMessage = "No colleges found",
  className = "",
  onRefetch
}: CollegeMappingProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredColleges = useMemo(() => {
    let filtered = colleges
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.city?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(college => 
        college.categories?.includes(selectedCategory)
      )
    }
    
    return filtered
  }, [colleges, searchTerm, selectedCategory])

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredColleges.slice(startIndex, endIndex)
  }, [filteredColleges, currentPage, itemsPerPage])

  if (isLoading) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading colleges...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Colleges</h2>
        <p className="text-slate-600 mb-6">{error?.message || "Failed to load colleges"}</p>
        {onRefetch && (
          <Button onClick={onRefetch} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-300">
          <MapPin className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{emptyMessage}</h3>
        <p className="text-slate-600 mb-6">
          Try adjusting your search terms or filters to find colleges.
        </p>
        {onRefetch && (
          <Button onClick={onRefetch} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Results
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Results Count */}
      <div className="mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">
            {filteredColleges.length} Colleges Found
          </h2>
          <p className="text-[#64748B]">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredColleges.length)} of {filteredColleges.length}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:border-[#4A90E2] focus:outline-none text-[#1E293B] placeholder-slate-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 items-center">
          <h3 className="text-sm font-semibold text-[#1E293B] mr-4">Filter by Category:</h3>
          <button
            key="all"
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
              selectedCategory === '' 
                ? 'border-[#4A90E2] bg-[#4A90E2] text-white' 
                : 'border-slate-300 bg-white text-[#64748B] hover:border-[#4A90E2] hover:text-[#4A90E2] hover:bg-slate-50'
            }`}
          >
            All
          </button>
          {COLLEGE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                selectedCategory === category.id 
                  ? 'border-[#4A90E2] bg-[#4A90E2] text-white' 
                  : 'border-slate-300 bg-white text-[#64748B] hover:border-[#4A90E2] hover:text-[#4A90E2] hover:bg-slate-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedColleges.map((college: any) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#64748B]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length} colleges
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border-2 border-slate-300 bg-white text-[#64748B] hover:border-[#4A90E2] hover:text-[#4A90E2] hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 text-sm font-medium rounded-lg border-2 transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#4A90E2] text-white border-[#4A90E2]'
                        : 'border-slate-300 bg-white text-[#64748B] hover:border-[#4A90E2] hover:text-[#4A90E2] hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border-2 border-slate-300 bg-white text-[#64748B] hover:border-[#4A90E2] hover:text-[#4A90E2] hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

CollegeMapping.displayName = 'CollegeMapping'

export default CollegeMapping
