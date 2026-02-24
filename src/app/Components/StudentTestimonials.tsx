"use client";

import React from "react";
import { Star, Quote, Award, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentTestimonialSlider() {
  const studentTestimonials = [
    {
      name: "Ananya Reddy",
      university: "IIT Bombay",
      year: "2024",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
      testimonial: "The peer learning culture and coding competitions at IIT Bombay shaped my technical depth.",
      achievement: "₹52 LPA Package"
    },
    {
      name: "Arjun Sharma",
      university: "IIT Delhi",
      year: "2023",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop",
      testimonial: "IIT Delhi gave me exposure beyond textbooks. Every experience pushed me forward.",
      achievement: "Raised ₹3.5 Cr"
    },
    {
      name: "Meera Krishnan",
      university: "NIT Trichy",
      year: "2024",
      image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=400&auto=format&fit=crop",
      testimonial: "Mentorship and the strong alumni network helped me prepare strategically for GATE.",
      achievement: "AIR 9 GATE"
    },
    {
      name: "Vikram Mehra",
      university: "DTU Delhi",
      year: "2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      testimonial: "The technical interviews were tough, but the preparation modules were spot on.",
      achievement: "Selected GSoC"
    }
  ];

  // Infinite loop ke liye array ko double kar rahe hain
  const duplicatedTestimonials = [...studentTestimonials, ...studentTestimonials];

  return (
    <section className="py-24 bg-[#12141D] overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

      <div className="text-center mb-16 px-6">
        <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
          <Zap size={14} className="text-[#4A90E2] fill-[#4A90E2]" />
          Success Stories
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tighter uppercase">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Future Leaders</span>
        </h2>
      </div>

      {/* Slider Container */}
      <div className="flex relative">
        {/* Left & Right Gradient Overlays (Fading effect) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#12141D] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#12141D] to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-6 pr-6"
          animate={{ x: [0, -1920] }} // Adjust based on content width
          transition={{
            duration: 30, // Speed of slider
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }} // Hover pe pause hoga
        >
          {duplicatedTestimonials.map((student, i) => (
            <div
              key={i}
              className="w-[350px] md:w-[450px] flex-shrink-0 group bg-[#1E212B] border border-[#94A3B8]/10 rounded-[30px] p-6 md:p-8 hover:border-[#4A90E2]/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Achievement Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-[#12141D] border border-[#4A90E2]/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <Award size={14} className="text-[#00D4FF]" />
                  <span className="text-[9px] font-black text-[#F8FAFC] uppercase tracking-widest">{student.achievement}</span>
                </div>
              </div>

              <Quote size={32} className="text-[#4A90E2]/10 mb-4" />
              <p className="text-[#F8FAFC] text-md md:text-lg font-medium leading-relaxed mb-6 italic min-h-[80px]">
                "{student.testimonial}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#94A3B8]/5 relative z-10">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#12141D] group-hover:border-[#4A90E2] transition-colors">
                  <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F8FAFC] text-sm leading-none mb-1">{student.name}</h4>
                  <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-widest">
                    <span className="text-[#4A90E2]">{student.university}</span>
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#00D4FF] fill-[#00D4FF]" />)}
                  </div>
                </div>
                <div className="ml-auto opacity-40">
                   <CheckCircle2 size={20} className="text-[#4A90E2]" />
                </div>
              </div>

              {/* Subtle Gradient Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}