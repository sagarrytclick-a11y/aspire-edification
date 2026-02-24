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
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#4A90E2] rounded-md flex items-center justify-center group-hover:rotate-6 transition-transform">
             <Zap size={18} className="text-white fill-white" />
          </div>
          <span className="text-base font-bold text-[#1E293B] tracking-tight">
            {SITE_IDENTITY.name}
          </span>
        </Link>

        {/* DESKTOP NAV - CLEAN PILLS */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "text-[#4A90E2] bg-[#F8FAFC]"
                    : "text-[#64748B] hover:text-[#4A90E2] hover:bg-slate-50"
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
            className="hidden sm:flex items-center gap-2 bg-[#1E293B] text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A90E2] transition-colors active:scale-95"
          >
            Apply Now
            <ArrowRight size={14} />
          </button>
          
          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-[#1E293B] hover:bg-slate-100 rounded-md transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - CLEAN LIST */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[64px] bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden shadow-xl ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold tracking-tight py-2 ${
                pathname === item.href ? "text-[#4A90E2]" : "text-[#1E293B]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => { openModal(); setIsOpen(false); }}
            className="w-full bg-[#4A90E2] text-white py-3 rounded-md font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 mt-2"
          >
            Start Application <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}