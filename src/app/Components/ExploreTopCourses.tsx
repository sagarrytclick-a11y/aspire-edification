'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useFormModal } from "@/context/FormModalContext";


const ExploreTopCourses = () => {


  const { openModal } = useFormModal();


  const categories = [
    {
      title: "Engineering",
      description: "Explore B.Tech and M.Tech programs in top technical institutes.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/engineering",
      count: "5000+ Colleges"
    },
    {
      title: "Medical",
      description: "Find medical colleges for MBBS and healthcare specializations.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/medical",
      count: "850+ Colleges"
    },
    {
      title: "Management",
      description: "Discover business schools for MBA and leadership programs.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/management",
      count: "3200+ Colleges"
    }
  ]

  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto font-sans text-[#1E293B]">
      
      {/* Simple Header - Same as City Slider */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Explore Courses</h2>
        <p className="text-[#64748B] text-sm">
          Select a category to find the best institutions and entrance exam guides.
        </p>
      </div>

      {/* Simple Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <div className="border-2 border-slate-300 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#4A90E2] hover:shadow-lg hover:shadow-[#4A90E2]/20 bg-white">
              
              {/* Image Section */}
              <div className="aspect-video w-full overflow-hidden bg-slate-50 border-b-2 border-slate-300">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1E293B]">{item.title}</h3>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-slate-100 border border-slate-300 px-2 py-1 rounded">
                    {item.count}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center text-[#4A90E2] text-sm font-bold gap-2 transition-colors">
                  View Colleges <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Simple Bottom Banner */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1">Need career guidance?</h3>
          <p className="text-[#64748B] text-sm font-medium">Talk to our experts for a personalized admission roadmap.</p>
        </div>
        <button onClick={() => openModal()} className="bg-[#1E293B] text-white px-6 sm:px-8 py-3 rounded-md text-sm font-bold hover:bg-[#4A90E2] transition-colors active:scale-95 w-full sm:w-auto">
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default ExploreTopCourses