"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useFormModal } from "@/context/FormModalContext";
import Image from "next/image";

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [collegeTypeOpen, setCollegeTypeOpen] = useState(false);
  const [allCollegesOpen, setAllCollegesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFormModal();

  // Ref to store timeout IDs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCollegeTypeMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before opening
    timeoutRef.current = setTimeout(() => {
      setCollegeTypeOpen(true);
    }, 100);
  };

  const handleCollegeTypeMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before closing
    timeoutRef.current = setTimeout(() => {
      setCollegeTypeOpen(false);
    }, 100);
  };

  const collegeTypes = [
    { name: "Engineering Colleges", href: "/colleges/engineering" },
    { name: "Medical Colleges", href: "/colleges/medical" },
    { name: "Management Colleges", href: "/colleges/management" },
    { name: "All Colleges", href: "/colleges" },
  ];

  const collegeLocations = [
    { name: "Mumbai Colleges", href: "/colleges/city/mumbai" },
    { name: "Delhi Colleges", href: "/colleges/city/delhi" },
    { name: "Bangalore Colleges", href: "/colleges/city/bangalore" },
    { name: "Hyderabad Colleges", href: "/colleges/city/hyderabad" },
    { name: "Chennai Colleges", href: "/colleges/city/chennai" },
    { name: "Pune Colleges", href: "/colleges/city/pune" },
  ];

  const moreOptions = [
    { name: "Courses", href: "/courses" },
    { name: "Exams", href: "/exams" },
    { name: "Updates", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm"
          : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto  flex items-center  justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group">
             <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <span className="text-lg font-bold text-[#1E293B] tracking-tight">
            {SITE_IDENTITY.name}
          </span>
        </Link>

        {/* DESKTOP NAV - DROPDOWNS */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Home */}
          <Link
            href="/"
            className={`px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
              pathname === "/"
                ? "text-[#4A90E2] bg-[#F8FAFC]"
                : "text-black hover:text-[#4A90E2] hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* Colleges Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleCollegeTypeMouseEnter}
            onMouseLeave={handleCollegeTypeMouseLeave}
          >
            <button
              className={`px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 ${
                pathname?.includes("/colleges/")
                  ? "text-[#4A90E2] bg-[#F8FAFC]"
                  : "text-black hover:text-[#4A90E2] hover:bg-slate-50"
              }`}
            >
              Colleges
              <ChevronDown size={14} className={`transition-transform ${collegeTypeOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {collegeTypeOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-300 rounded-xl shadow-xl z-50">
                {collegeTypes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-5 py-4 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Courses */}
         

          {/* Exams */}
          <Link
            href="/exams"
            className={`px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
              pathname?.includes("/exams")
                ? "text-[#4A90E2] bg-[#F8FAFC]"
                : "text-black hover:text-[#4A90E2] hover:bg-slate-50"
            }`}
          >
            Exams
          </Link>

          {/* Updates */}
          <Link
            href="/blogs"
            className={`px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
              pathname?.includes("/blogs")
                ? "text-[#4A90E2] bg-[#F8FAFC]"
                : "text-black hover:text-[#4A90E2] hover:bg-slate-50"
            }`}
          >
            Updates
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
              pathname?.includes("/contact")
                ? "text-[#4A90E2] bg-[#F8FAFC]"
                : "text-black hover:text-[#4A90E2] hover:bg-slate-50"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="hidden sm:flex items-center gap-2 bg-[#4A90E2] text-white px-8 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-[#00D4FF] transition-all active:scale-95 shadow-lg"
          >
            Apply Now
            <ArrowRight size={16} />
          </button>
          
          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-3 text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - CLEAN LIST */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden shadow-xl ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-bold tracking-tight py-2 ${
              pathname === "/" ? "text-[#4A90E2]" : "text-[#1E293B]"
            }`}
          >
            Home
          </Link>

          {/* Type of College Section */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Type of College</h3>
            {collegeTypes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold tracking-tight py-2 pl-4 ${
                  pathname === item.href ? "text-[#4A90E2]" : "text-[#1E293B]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* All Colleges Section */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">All Colleges</h3>
            {collegeLocations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold tracking-tight py-2 pl-4 ${
                  pathname === item.href ? "text-[#4A90E2]" : "text-[#1E293B]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* More Section */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">More</h3>
            {moreOptions.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold tracking-tight py-2 pl-4 ${
                  pathname === item.href ? "text-[#4A90E2]" : "text-[#1E293B]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => { openModal(); setIsOpen(false); }}
            className="w-full bg-[#4A90E2] text-white py-3 rounded-md font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 mt-4"
          >
            Start Application <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}