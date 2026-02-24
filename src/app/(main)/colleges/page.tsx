'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ArrowRight, ChevronLeft, ChevronRight, MapPin, X, Globe, Award, Sparkles, School } from 'lucide-react'
import { useAllColleges } from '@/hooks/useColleges'

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: collegesResponse, isLoading, error } = useAllColleges(debouncedSearch, selectedCountry, selectedExam)
  const colleges = collegesResponse?.colleges || []

  useEffect(() => setCurrentPage(1), [debouncedSearch, selectedCountry, selectedExam])

  // Extract unique values for filters
  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(colleges.map((c: any) => typeof c.country_ref === "object" ? c.country_ref.name : c.country_ref).filter(Boolean))
    const examSet = new Set(colleges.flatMap((college: any) => college.exams || []))
    return {
      countries: Array.from(countrySet) as string[],
      exams: Array.from(examSet) as string[]
    }
  }, [colleges])

  const paginatedColleges = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return colleges.slice(start, start + itemsPerPage)
  }, [colleges, currentPage])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin" /></div>

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
          
          {/* ALL-IN-ONE SEARCH & FILTERS BAR */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-[2] bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm focus-within:border-[#4A90E2] transition-colors">
              <Search className="text-slate-400" size={18} />
              <Input
                placeholder="Search college, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && <X size={14} className="text-slate-400 cursor-pointer hover:text-red-500" onClick={() => setSearchTerm('')} />}
            </div>
            
            {/* Country Filter */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="flex-1 bg-white border-slate-200 h-11 text-[11px] font-bold uppercase tracking-wider rounded-lg text-slate-700">
                <Globe size={14} className="mr-2 text-slate-400" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900">
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Exam Filter */}
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="flex-1 bg-white border-slate-200 h-11 text-[11px] font-bold uppercase tracking-wider rounded-lg text-slate-700">
                <Award size={14} className="mr-2 text-slate-400" />
                <SelectValue placeholder="Entrance Exam" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900">
                <SelectItem value="all">All Exams</SelectItem>
                {exams.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* --- RESULTS SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        {colleges.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-lg border border-dashed border-slate-200">
            <School size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="text-sm font-bold text-slate-400 uppercase">No institutions found</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#1E293B]">Results Gallery</h2>
              <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-widest">
                Showing {colleges.length} global institutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedColleges.map((college: any) => (
                <div key={college._id} className="bg-white border border-slate-100 rounded-lg overflow-hidden hover:border-[#4A90E2] transition-all shadow-sm flex flex-col group">
                  <div className="relative h-48 bg-slate-100">
                    <img
                      src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={college.name}
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-bold text-[#1E293B] uppercase border border-slate-100">
                      {getCountryName(college.country_ref)}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-[#1E293B] mb-2 line-clamp-1 group-hover:text-[#4A90E2] transition-colors">{college.name}</h3>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                      <MapPin size={12} className="text-[#4A90E2]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{college.city || 'Global Campus'}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {college.exams?.slice(0, 2).map((e: string, i: number) => (
                        <span key={i} className="text-[9px] font-bold bg-[#F8FAFC] text-[#4A90E2] px-2 py-0.5 rounded border border-slate-100 uppercase">
                          {e}
                        </span>
                      ))}
                    </div>

                    <Link href={`/colleges/${college.slug}`} className="mt-auto">
                      <Button className="w-full bg-[#1E293B] hover:bg-[#4A90E2] text-white rounded-md h-10 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        View Details <ArrowRight size={14} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <Button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  variant="outline" className="w-9 h-9 p-0 rounded-md border-slate-200"
                >
                  <ChevronLeft size={18} className="text-slate-600" />
                </Button>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
                <Button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  variant="outline" className="w-9 h-9 p-0 rounded-md border-slate-200"
                >
                  <ChevronRight size={18} className="text-slate-600" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}