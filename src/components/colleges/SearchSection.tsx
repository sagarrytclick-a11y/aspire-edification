'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, RefreshCw, Globe, Award } from 'lucide-react'

interface SearchSectionProps {
  onSearch: (searchTerm: string, country: string, exam: string, category?: string) => void
  countries?: string[]
  exams?: string[]
  categories?: string[]
  placeholder?: string
  showCategoryFilter?: boolean
  initialSearchTerm?: string
  initialCountry?: string
  initialExam?: string
  initialCategory?: string
  className?: string
}

const SearchSection = memo(({ 
  onSearch,
  countries = [],
  exams = [],
  categories = [],
  placeholder = "Search colleges...",
  showCategoryFilter = false,
  initialSearchTerm = '',
  initialCountry = 'all',
  initialExam = 'all',
  initialCategory = 'all',
  className = ""
}: SearchSectionProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm)
  const [selectedCountry, setSelectedCountry] = useState(initialCountry)
  const [selectedExam, setSelectedExam] = useState(initialExam)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(localSearchTerm)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [localSearchTerm])

  // Trigger search when debounced values change
  useEffect(() => {
    onSearch(debouncedSearchTerm, selectedCountry, selectedExam, selectedCategory)
  }, [debouncedSearchTerm, selectedCountry, selectedExam, selectedCategory, onSearch])

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchTerm(value)
  }, [])

  const handleClear = useCallback(() => {
    setLocalSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedCountry('all')
    setSelectedExam('all')
    setSelectedCategory('all')
  }, [])

  const handleReset = useCallback(() => {
    handleClear()
  }, [handleClear])

  return (
    <div className={`bg-white rounded-2xl border-2 border-slate-300 shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full text-black pl-12 pr-12 border-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {localSearchTerm && (
            <button
              onClick={() => setLocalSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showCategoryFilter && categories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-2 text-black border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {countries.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full border-2 border-slate-300 focus:border-blue-500">
                  <Globe className="w-4 h-4 mr-2 text-black" />
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {exams.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Entrance Exam</label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-full border-2 border-slate-300 focus:border-blue-500">
                  <Award className="w-4 h-4 mr-2 text-black" />
                  <SelectValue placeholder="All Exams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  {exams.map((exam) => (
                    <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="flex bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3B82F6] transition-colors items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
})

SearchSection.displayName = 'SearchSection'

export default SearchSection
