"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useCountryColleges } from "@/hooks/useCountryColleges";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  
  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries } = useDropdownData();
  const { data: countryColleges = [], isLoading: loadingColleges } = useCountryColleges(hoveredCountry);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Courses", href: "/courses", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Update", href: "/blogs" },
    { name: "Services", href: "/service" },
  ];

  const dropdownContent = {
    Colleges: colleges.map(c => ({ title: c.name, href: `/colleges/${c.slug}` })),
    Courses: [
      { title: "Management", href: "/courses/management" },
      { title: "Medical", href: "/courses/medical" },
      { title: "Engineering", href: "/courses/engineering" },
    ],
    Exams: exams.map(e => ({ title: e.short_name, href: `/exams/${e.slug}` })),
    Countries: countries.map(c => ({
      title: `Study in ${c.name}`,
      href: `/countries/${c.slug}`,
      flag: c.flag,
      slug: c.slug
    })),
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg" : "bg-white"
    }`}>
      
      {/* TOP BAR - Hidden on mobile */}
      <div className={`hidden lg:block bg-blue-600 overflow-hidden transition-all duration-300 ${isScrolled ? "h-0" : "h-12"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 h-full text-sm font-medium text-white">
          <div className="flex items-center gap-6">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <Phone size={16} className="text-yellow-300" /> +91-930477744
            </a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <Mail size={16} className="text-yellow-300" /> {emails.info}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-yellow-300" /> {address.office}
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 shrink-0">
            <img 
              src={SITE_IDENTITY.assets.logo.main} 
              alt="Logo" 
              className="h-10 w-32 transition-all"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group py-4"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => { setHoveredItem(null); setHoveredCountry(null); }}
              >
                <Link 
                  href={item.href} 
                  className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-1.5 rounded-lg
                    ${isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}
                  `}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="opacity-60" />}
                </Link>

                {/* MEGA DROPDOWN (Desktop) */}
                <AnimatePresence>
                  {item.hasDropdown && hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[50] ${item.name === 'Countries' ? 'w-[600px]' : 'w-64'}`}
                    >
                      <div className="flex max-h-[400px]">
                        <div className="flex-1 overflow-y-auto p-2">
                          {dropdownContent[item.name as keyof typeof dropdownContent]?.map((sub: any) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onMouseEnter={() => item.name === 'Countries' && setHoveredCountry(sub.slug)}
                              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all group"
                            >
                              <span className="text-sm font-medium">
                                {sub.flag} {sub.title}
                              </span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                        {item.name === 'Countries' && (
                          <div className="w-1/2 bg-gray-50 p-4 border-l">
                            <h4 className="text-sm font-semibold text-blue-600 mb-3">Top Colleges</h4>
                            <div className="space-y-2">
                              {countryColleges.slice(0, 5).map((col: any) => (
                                <Link key={col._id} href={`/colleges/${col.slug}`} className="block p-2 bg-white rounded-lg text-sm font-medium hover:border-blue-600 border border-transparent transition-all">
                                  {col.name}
                                </Link>
                              ))}
                              <Link href="/colleges" className="flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg text-sm font-medium mt-3">
                                View All <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 relative z-[50]">
            <button 
              onClick={openModal} 
              className="hidden sm:flex px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              Apply Now
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-[45]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-[50] shadow-xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-sm font-semibold text-blue-600">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>

              <div className="flex-grow overflow-y-auto px-4 py-4">
                {navItems.map((item) => (
                  <div key={item.name} className="mb-2">
                    <div className="flex items-center justify-between py-3">
                      <Link 
                        href={item.href} 
                        className={`text-base font-medium ${isActive(item.href) ? 'text-blue-600' : 'text-gray-800'}`}
                        onClick={() => !item.hasDropdown && setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <button 
                          onClick={() => setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronDown size={18} className={`transition-transform ${expandedMobileItem === item.name ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Dropdown Items */}
                    <AnimatePresence>
                      {item.hasDropdown && expandedMobileItem === item.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50 rounded-lg px-3"
                        >
                          <div className="py-3 space-y-2">
                            {dropdownContent[item.name as keyof typeof dropdownContent]?.slice(0, 8).map((sub: any) => (
                              <Link 
                                key={sub.title} 
                                href={sub.href} 
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-1"
                              >
                                {sub.flag} {sub.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t bg-gray-50">
                <button 
                  onClick={() => { openModal(); setIsOpen(false); }}
                  className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
