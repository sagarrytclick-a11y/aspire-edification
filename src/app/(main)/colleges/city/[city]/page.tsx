'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAllColleges } from '@/hooks/useColleges'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import BackgroundSlider from '@/components/BackgroundSlider'
import { getCityBySlug, INDIAN_CITIES } from '@/lib/cities'
import { MapPin } from 'lucide-react'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2"
const ACCENT_GOLD = "#FACC15"

// City configuration
const cityConfig: Record<string, { 
  name: string; 
  color: string; 
  gradient: string; 
  description: string;
  features: string[];
  stats: { colleges: string; students: string; avgFees: string };
}> = {
  mumbai: {
    name: "Mumbai",
    color: "#1A4AB2",
    gradient: "from-[#1A4AB2] via-[#1A4AB2]/90 to-slate-900",
    description: "Financial capital with premier engineering, management, and medical institutions",
    features: ["IIT Bombay", "NMIMS", "Top Medical Colleges"],
    stats: { colleges: "500+", students: "2L+", avgFees: "₹2-15L" }
  },
  delhi: {
    name: "Delhi",
    color: "#DC2626",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    description: "Educational hub with IIT Delhi, Delhi University, AIIMS, and premier management schools",
    features: ["IIT Delhi", "AIIMS", "DU Colleges"],
    stats: { colleges: "600+", students: "3L+", avgFees: "₹1-20L" }
  },
  bangalore: {
    name: "Bangalore",
    color: "#059669",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    description: "Silicon Valley of India with excellent engineering colleges and research institutions",
    features: ["IISc", "RV College", "Top B-Schools"],
    stats: { colleges: "400+", students: "2.5L+", avgFees: "₹3-18L" }
  },
  hyderabad: {
    name: "Hyderabad",
    color: "#7C3AED",
    gradient: "from-[#7C3AED] via-[#7C3AED]/90 to-slate-900",
    description: "Emerging educational destination with IIT Hyderabad and excellent institutions",
    features: ["IIT Hyderabad", "BITS Pilami", "NIMS"],
    stats: { colleges: "350+", students: "2L+", avgFees: "₹2-12L" }
  },
  chennai: {
    name: "Chennai",
    color: "#EA580C",
    gradient: "from-[#EA580C] via-[#EA580C]/90 to-slate-900",
    description: "Traditional educational hub with IIT Madras and renowned institutions",
    features: ["IIT Madras", "Anna University", "CMC Vellore"],
    stats: { colleges: "450+", students: "2.2L+", avgFees: "₹1.5-15L" }
  },
  pune: {
    name: "Pune",
    color: "#0891B2",
    gradient: "from-[#0891B2] via-[#0891B2]/90 to-slate-900",
    description: "Oxford of the East with SPPU and top engineering colleges",
    features: ["SPPU", "COEP", "SIBM"],
    stats: { colleges: "380+", students: "1.8L+", avgFees: "₹2-10L" }
  }
}

export default function CityCollegesPage() {
  const params = useParams()
  const citySlug = params.city as string
  const cityInfo = getCityBySlug(citySlug) || {
    name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
    color: PRIMARY_BLUE,
    gradient: "from-[#1A4AB2] via-[#1A4AB2]/90 to-slate-900",
    description: "Explore educational institutions in this city",
    features: ["Top Colleges", "Research Centers", "Educational Hub"],
    stats: { colleges: "100+", students: "50K+", avgFees: "₹1-10L" },
    examName: "JEE",
    examColor: "text-[#1A4AB2]",
    borderColor: "border-[#1A4AB2]",
    hoverBg: "hover:bg-[#1A4AB2]/5",
    href: `/colleges/city/${citySlug}`
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string, country: string, exam: string, category?: string) => {
    setSearchTerm(term)
    setSelectedCountry(country)
    setSelectedExam(exam)
    setSelectedCategory(category || 'all')
    setCurrentPage(1)
  }, [])

  const {
    data: collegesResponse = { colleges: [], total: 0, page: 1, totalPages: 1, hasMore: false },
    isLoading,
    isError,
    error,
    refetch
  } = useAllColleges(searchTerm, selectedCountry, selectedExam)

  // Filter colleges for specific city
  const cityColleges = useMemo(() => {
    return collegesResponse.colleges.filter((college: any) => 
      college.city && college.city.toLowerCase() === citySlug.toLowerCase()
    )
  }, [collegesResponse.colleges, citySlug])

  // Apply additional filters
  const filteredColleges = useMemo(() => {
    let filtered = cityColleges
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((college: any) => 
        college.categories && college.categories.includes(selectedCategory)
      )
    }
    
    return filtered
  }, [cityColleges, selectedCategory])

  const colleges = filteredColleges

  // Extract unique values for filters
  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(
      colleges.map((c: any) => typeof c.country_ref === "object" ? c.country_ref.name : c.country_ref).filter(Boolean)
    )
    const examSet = new Set(colleges.flatMap((college: any) => college.exams))
    return {
      countries: Array.from(countrySet) as string[],
      exams: Array.from(examSet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Hero Header Skeleton */}
        <div className="bg-slate-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
              <div className="h-8 bg-slate-700 rounded-full w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="h-16 bg-slate-700 rounded-lg w-3/4 mx-auto mb-6 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className={`relative bg-gradient-to-br ${cityInfo.gradient} text-white`}>
        <BackgroundSlider>
          <div />
        </BackgroundSlider>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-4 h-4" />
              {cityInfo.name} Colleges
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Top Colleges in <span className="text-[#FACC15]">{cityInfo.name}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              {cityInfo.description}. Find the perfect institution for your educational journey.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">{colleges.length}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Colleges Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">{cityInfo.stats.students}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">{cityInfo.stats.avgFees}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Avg Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <SearchSection
          onSearch={handleSearch}
          countries={countries}
          exams={exams}
          categories={['engineering', 'medical', 'management']}
          showCategoryFilter={true}
          placeholder={`Search colleges in ${cityInfo.name}...`}
        />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <CollegeMapping
          colleges={colleges}
          isLoading={isLoading}
          isError={isError}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onRefetch={refetch}
          emptyMessage={`No Colleges Found in ${cityInfo.name}`}
        />
      </div>
    </div>
  )
}
