"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useFormModal } from "@/context/FormModalContext";

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFormModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Courses", href: "/courses" },
    { name: "Exams", href: "/exams" },
    { name: "Updates", href: "/blogs" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-[#12141D]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#4A90E2] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(74,144,226,0.3)] group-hover:rotate-12 transition-transform duration-300">
             <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-lg font-black text-[#F8FAFC] uppercase tracking-tighter">
            {SITE_IDENTITY.name}
          </span>
        </Link>

        {/* DESKTOP NAV - CENTERED */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-[#4A90E2] text-white shadow-lg shadow-blue-500/20"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="hidden sm:flex items-center gap-2 bg-[#4A90E2] text-white px-7 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all active:scale-95"
          >
            Apply Now
            <ArrowRight size={14} />
          </button>
          
          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-[#F8FAFC] bg-white/5 rounded-xl border border-white/10" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - FULL SCREEN OVERLAY */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-full bg-[#12141D] border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter border-b border-white/5 pb-4 ${
                pathname === item.href ? "text-[#4A90E2]" : "text-[#F8FAFC]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => { openModal(); setIsOpen(false); }}
            className="w-full bg-[#4A90E2] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-4"
          >
            Start Application <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}