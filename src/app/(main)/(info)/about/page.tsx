"use client"
import React from 'react';
import { ArrowRight, Star, Users, Award, Zap } from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

export default function AboutPage() {
  const { openModal } = useFormModal();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Clean & Minimal */}
      <section className="pt-32 pb-20 bg-[#1E293B]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
            <Star size={14} className="text-[#10B981]" /> About Us
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Guiding Students to <span className="text-[#10B981]">Success</span> Since 1974
          </h1>
          
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            For five decades, we've been the trusted bridge between student aspirations and world-class educational institutions.
          </p>
          
          <button
            onClick={openModal}
            className="bg-[#4A90E2] hover:bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide transition-colors"
          >
            Get Started <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* STATS - Simple Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.2%", label: "Success Rate", icon: <Zap className="text-[#10B981]" size={20} /> },
              { value: "800+", label: "Universities", icon: <Users className="text-[#10B981]" size={20} /> },
              { value: "$45M+", label: "Scholarships", icon: <Award className="text-[#10B981]" size={20} /> },
              { value: "50+", label: "Years Experience", icon: <Star className="text-[#10B981]" size={20} /> }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#1E293B] mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY - Clean Layout */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded in 1974, we began with a simple mission: provide honest, expert guidance to students seeking international education. What started as a small counseling office has grown into a globally recognized educational consultancy.
                </p>
                <p>
                  Today, we combine decades of experience with modern technology to help students find their perfect academic match. Our team of dedicated counselors works tirelessly to ensure each student receives personalized attention and support throughout their journey.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  "Expert Guidance",
                  "Personalized Approach", 
                  "Proven Results",
                  "Global Network"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&fit=crop" 
                  alt="Students" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Minimal Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "Honest guidance you can trust" },
              { title: "Excellence", desc: "Highest standards in everything" },
              { title: "Student First", desc: "Your success is our priority" },
              { title: "Innovation", desc: "Modern solutions for modern challenges" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#4A90E2] transition-colors">
                <div className="w-12 h-12 bg-[#4A90E2] text-white rounded-lg flex items-center justify-center mb-4">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Simple */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved their dreams with our guidance.
          </p>
          
          <button
            onClick={openModal}
            className="bg-[#4A90E2] hover:bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide transition-colors"
          >
            Apply Now <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>
      </section>
    </main>
  );
}