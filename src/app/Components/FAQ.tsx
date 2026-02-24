"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Zap
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { openModal } = useFormModal();

  // Theme Color Tokens
  const PRIMARY_BLUE = "#4A90E2";
  const SECONDARY_CYAN = "#00D4FF";
  const BG_DEEP = "#12141D";
  const SURFACE_CARD = "#1E212B";

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "admissions", name: "Admissions" },
    { id: "process", name: "Process" },
    { id: "support", name: "Support" },
    { id: "benefits", name: "Scholarships" }
  ];

  const faqs = [
    {
      question: "What services does Aspire Edification provide?",
      answer: "We provide comprehensive admission support including university applications, visa assistance, scholarship guidance, documentation help, and post-admission support for students.",
      category: "benefits"
    },
    {
      question: "How do I apply through Aspire-Edification?",
      answer: "Our streamlined process includes profile assessment, course selection, document preparation, application submission, and enrollment support.",
      category: "process"
    },
    {
      question: "Which countries can I study in?",
      answer: "We assist students for USA, UK, Canada, Australia, Germany, Ireland, New Zealand, and major European destinations.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements?",
      answer: "Eligibility generally includes academic records, English proficiency (IELTS/TOEFL), SOP, and financial documents depending on the university.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships?",
      answer: "Yes. We help students identify and apply for merit-based and need-based scholarships offered by universities and governments.",
      category: "benefits"
    }
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter(f => f.category === activeCategory);

  return (
    <section className="py-24 bg-[#12141D] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#4A90E2]/5 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
            <Zap size={14} className="text-[#4A90E2] fill-[#4A90E2]" />
            Support Center
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F8FAFC] mb-6 tracking-tighter uppercase">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#00D4FF]">Questions</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about the admission process and our services.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-7 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-[#4A90E2] text-white border-[#4A90E2] shadow-[0_10px_25px_rgba(74,144,226,0.3)]"
                  : "bg-[#1E212B] text-[#94A3B8] border-[#94A3B8]/10 hover:border-[#4A90E2]/40 hover:text-[#F8FAFC]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 rounded-[32px] border ${
                openIndex === index
                  ? "bg-[#1E212B] border-[#4A90E2]/30 shadow-2xl"
                  : "bg-[#1E212B]/40 border-[#94A3B8]/5 hover:border-[#94A3B8]/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-7 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    openIndex === index ? "bg-[#4A90E2] text-white rotate-6" : "bg-[#12141D] text-[#4A90E2] border border-[#94A3B8]/10"
                  }`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className={`font-bold text-base md:text-lg tracking-tight transition-colors ${
                    openIndex === index ? "text-[#F8FAFC]" : "text-[#94A3B8] group-hover:text-[#F8FAFC]"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  openIndex === index ? "border-[#4A90E2] bg-[#4A90E2]/10 rotate-180" : "border-[#94A3B8]/10"
                }`}>
                  <ChevronDown className={`w-4 h-4 ${openIndex === index ? "text-[#00D4FF]" : "text-[#94A3B8]"}`} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-20 pb-8 text-[#94A3B8] text-base leading-relaxed border-t border-[#94A3B8]/5 pt-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-b from-[#1E212B] to-[#12141D] border border-[#94A3B8]/10 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A90E2]/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#12141D] border border-[#4A90E2]/20 rounded-2xl flex items-center justify-center text-[#00D4FF] mx-auto mb-6 shadow-inner">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-4">
              Still have questions?
            </h3>
            <p className="text-[#94A3B8] max-w-xl mx-auto mb-10 text-base">
              Speak with our expert counselors and get a personalized roadmap for your career.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-[#4A90E2] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00D4FF] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
              >
                <Phone size={16} /> Free Counselling
              </button>
              <button
                onClick={openModal}
                className="px-8 py-4 bg-[#12141D] border border-[#94A3B8]/10 text-[#F8FAFC] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#4A90E2]/50 transition-all flex items-center justify-center gap-3"
              >
                <Mail size={16} /> Contact Support
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}