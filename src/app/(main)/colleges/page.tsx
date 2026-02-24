'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ArrowRight, GraduationCap, ChevronLeft, ChevronRight, MapPin, Filter, X, Globe, Award } from 'lucide-react'
import { useAllColleges } from '@/hooks/useColleges'
import BackgroundSlider from '@/components/BackgroundSlider'

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: collegesResponse, isLoading } = useAllColleges(debouncedSearch, selectedCountry, selectedExam)
  const colleges = collegesResponse?.colleges || []

  useEffect(() => setCurrentPage(1), [debouncedSearch, selectedCountry, selectedExam])

  // Extract unique countries and exams from colleges
  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(
      colleges.map((c: any) => typeof c.country_ref === "object" ? c.country_ref.name : c.country_ref).filter(Boolean)
    )
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

  return (
    <div className="min-h-screen bg-[#12141D] text-[#F8FAFC] selection:bg-[#4A90E2]/30">
      
      {/* --- SECTION 1: HERO HEADER --- */}
      <BackgroundSlider>
        <div className="relative bg-[#12141D]/80 backdrop-blur-xl border-b border-white/5 py-24 overflow-hidden">
          {/* Decorative Glows */}
          <div className="absolute top-0 -left-24 w-96 h-96 bg-[#4A90E2]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -right-24 w-96 h-96 bg-[#00D4FF]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#1E212B] border border-[#4A90E2]/30 text-[#00D4FF] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
              <GraduationCap size={14} className="animate-pulse" /> 2026 Academic Directory
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
              Find your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-[#00D4FF] to-[#4A90E2]">Future Hub</span>
            </h1>
            
            {/* Ultra Modern Search Bar with Filters */}
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-[#1E212B] border border-white/10 rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A90E2]" size={22} />
                    <Input
                      placeholder="Search by name, city or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent border-none text-lg h-14 pl-12 focus-visible:ring-0 placeholder:text-[#94A3B8] font-medium"
                    />
                  </div>
                  
                  {/* Filter Toggle Button */}
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-[#4A90E2] hover:bg-[#00D4FF] text-white rounded-xl h-14 px-6 transition-all border-none flex items-center gap-2"
                  >
                    <Filter size={18} />
                    <span className="font-black uppercase tracking-wider text-xs">Filters</span>
                    {(selectedCountry !== 'all' || selectedExam !== 'all' || searchTerm) && (
                      <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" />
                    )}
                  </Button>
                </div>
                
                {/* Filter Panel */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2">
                          <Globe size={14} className="text-[#4A90E2]" />
                          Country/Region
                        </label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger className="bg-[#12141D] border-white/10 text-white h-12 rounded-xl">
                            <SelectValue placeholder="All Countries" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1E212B] border-white/10">
                            <SelectItem value="all" className="text-white hover:bg-[#4A90E2]/20">All Countries</SelectItem>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country} className="text-white hover:bg-[#4A90E2]/20">
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2">
                          <Award size={14} className="text-[#4A90E2]" />
                          Entrance Exam
                        </label>
                        <Select value={selectedExam} onValueChange={setSelectedExam}>
                          <SelectTrigger className="bg-[#12141D] border-white/10 text-white h-12 rounded-xl">
                            <SelectValue placeholder="All Exams" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1E212B] border-white/10">
                            <SelectItem value="all" className="text-white hover:bg-[#4A90E2]/20">All Exams</SelectItem>
                            {exams.map((exam) => (
                              <SelectItem key={exam} value={exam} className="text-white hover:bg-[#4A90E2]/20">
                                {exam}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Active Filters Display */}
                    {(selectedCountry !== 'all' || selectedExam !== 'all' || searchTerm) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {searchTerm && (
                          <div className="inline-flex items-center gap-1 bg-[#4A90E2]/20 text-[#4A90E2] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Search: {searchTerm}
                            <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSearchTerm('')} />
                          </div>
                        )}
                        {selectedCountry !== 'all' && (
                          <div className="inline-flex items-center gap-1 bg-[#4A90E2]/20 text-[#4A90E2] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Country: {selectedCountry}
                            <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSelectedCountry('all')} />
                          </div>
                        )}
                        {selectedExam !== 'all' && (
                          <div className="inline-flex items-center gap-1 bg-[#4A90E2]/20 text-[#4A90E2] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Exam: {selectedExam}
                            <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSelectedExam('all')} />
                          </div>
                        )}
                        <Button
                          onClick={() => {
                            setSearchTerm('')
                            setSelectedCountry('all')
                            setSelectedExam('all')
                          }}
                          className="bg-[#1E212B] border border-white/10 hover:bg-[#1E212B]/80 text-white h-8 px-3 rounded-full text-[10px] font-black uppercase tracking-wider"
                        >
                          Clear All
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundSlider>

      {/* --- SECTION 2: RESULTS --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[450px] bg-[#1E212B] rounded-[2.5rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-32 bg-[#1E212B]/50 rounded-[3rem] border border-dashed border-white/10 backdrop-blur-sm">
            <div className="w-20 h-20 bg-[#12141D] rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                <Search size={32} className="text-[#94A3B8] opacity-50" />
            </div>
            <h3 className="text-3xl font-black text-[#F8FAFC] uppercase tracking-tighter">No Matches Found</h3>
            <p className="text-[#94A3B8] mt-2 font-medium">Try broadening your search or checking for typos.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Institution <span className="text-[#4A90E2]">Gallery</span></h2>
                <p className="text-[#94A3B8] font-bold text-xs uppercase tracking-widest mt-1">
                  Showing {paginatedColleges.length} of {colleges.length} globally recognized hubs
                  {colleges.length > 0 && (
                    <span className="ml-2 text-[#00D4FF]">
                      {selectedCountry !== 'all' && `in ${selectedCountry}`}
                      {selectedCountry !== 'all' && selectedExam !== 'all' && ' • '}
                      {selectedExam !== 'all' && `for ${selectedExam}`}
                    </span>
                  )}
                </p>
              </div>
              
              {/* Results Stats */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#4A90E2]">{colleges.length}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Total Results</div>
                </div>
                {countries.length > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#00D4FF]">{countries.length}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Countries</div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedColleges.map((college : any) => (
                <CollegeCard key={college._id} college={college} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Button 
                            disabled={currentPage === 1}
                            onClick={() => {
                                setCurrentPage(p => p - 1);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="w-14 h-14 rounded-2xl bg-[#1E212B] border border-white/10 hover:border-[#4A90E2] transition-all group"
                        >
                            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        </Button>

                        <div className="bg-[#1E212B] border border-white/10 px-8 h-14 rounded-2xl flex items-center font-black tracking-widest text-sm">
                            <span className="text-[#4A90E2]">{currentPage}</span>
                            <span className="mx-2 text-white/20">/</span>
                            <span>{totalPages}</span>
                        </div>

                        <Button 
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                setCurrentPage(p => p + 1);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="w-14 h-14 rounded-2xl bg-[#1E212B] border border-white/10 hover:border-[#4A90E2] transition-all group"
                        >
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CollegeCard({ college }: { college: any }) {
  return (
    <div className="group relative bg-[#1E212B] rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4A90E2]/40 hover:-translate-y-3 shadow-2xl">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E212B] via-transparent to-transparent z-10 opacity-60" />
        <img
          src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000"
          alt={college.name}
        />
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-[#12141D]/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-white/10 text-[#00D4FF]">
            {getCountryName(college.country_ref)}
          </div>
        </div>
        {/* Ranking Badge */}
        {college.ranking && (
          <div className="absolute top-6 right-6 z-20">
            <div className="bg-[#4A90E2]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-white/10 text-white">
              #{college.ranking}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 pt-4">
        <h3 className="text-2xl font-black mb-3 leading-tight uppercase tracking-tighter group-hover:text-[#4A90E2] transition-colors line-clamp-2 min-h-[3.5rem]">
          {college.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-[#94A3B8]">
            <MapPin size={14} className="text-[#00D4FF]" />
            <span className="text-[10px] font-black uppercase tracking-widest">
                {college.city || 'Global Campus'}
            </span>
        </div>

        {/* Exams/Tags */}
        {college.exams && college.exams.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {college.exams.slice(0, 2).map((exam: string, index: number) => (
              <span key={index} className="text-[9px] font-black bg-[#4A90E2]/20 text-[#4A90E2] px-3 py-1 rounded-lg border border-[#4A90E2]/30 uppercase tracking-tighter">
                {exam}
              </span>
            ))}
            {college.exams.length > 2 && (
              <span className="text-[9px] font-black bg-[#1E212B] text-[#94A3B8] px-3 py-1 rounded-lg border border-white/10 uppercase tracking-tighter">
                +{college.exams.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {college.establishment_year && (
            <div className="bg-[#12141D] p-3 rounded-2xl border border-white/5">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">Est.</div>
              <div className="text-sm font-black text-[#F8FAFC]">{college.establishment_year}</div>
            </div>
          )}
          <div className="bg-[#12141D] p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">Type</div>
            <div className="text-sm font-black text-[#F8FAFC]">University</div>
          </div>
        </div>

        <Link href={`/colleges/${college.slug}`}>
          <Button className="w-full bg-[#4A90E2] hover:bg-[#00D4FF] text-white rounded-2xl h-14 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10 transition-all border-none">
            Explore Institution <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Subtle Bottom Glow on Hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A90E2] to-[#00D4FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}