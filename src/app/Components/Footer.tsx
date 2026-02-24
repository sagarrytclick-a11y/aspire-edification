"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter, ChevronUp, Zap, Sparkles } from 'lucide-react';
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from '@/context/FormModalContext';
import Image from 'next/image';

const Footer = () => {
  const { emails, phones, address } = useContactInfo();
  const { openModal } = useFormModal();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Top Colleges", href: "/colleges" },
    { name: "Entrance Exams", href: "/exams" },
    { name: "Success Stories", href: "/testimonials" },
    { name: "Resource Hub", href: "/blogs" },
    { name: "About Aspire", href: "/about" },
  ];

  return (
    <footer className="bg-white text-[#64748B] pt-20 pb-10 px-6 border-t border-slate-100 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src={`/logo.png`} alt={SITE_IDENTITY.name} width={50} height={50} />
              <span className="text-xl font-bold text-[#1E293B] tracking-tight">
                {SITE_IDENTITY.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-medium">
              {SITE_IDENTITY.description} Empowering the next generation of global leaders through strategic education consulting.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: MessageCircle, href: createWhatsAppLink(phones.primary) }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-md bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-[#64748B] hover:text-[#4A90E2] hover:border-[#4A90E2] hover:bg-white transition-all shadow-sm">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[#1E293B] font-bold text-xs uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-bold hover:text-[#4A90E2] transition-colors flex items-center gap-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[#1E293B] font-bold text-xs uppercase tracking-widest mb-6">Get In Touch</h4>
            <div className="space-y-5 text-xs">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-md bg-[#F8FAFC] flex items-center justify-center text-[#4A90E2] border border-slate-100 group-hover:bg-[#4A90E2] group-hover:text-white transition-all"><Phone size={14}/></div>
                <span className="font-bold text-[#1E293B]">{phones.primary}</span>
              </a>
              <a href={createMailtoLink(emails.info)} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-md bg-[#F8FAFC] flex items-center justify-center text-[#4A90E2] border border-slate-100 group-hover:bg-[#4A90E2] group-hover:text-white transition-all"><Mail size={14}/></div>
                <span className="font-bold text-[#1E293B] lowercase">{emails.info}</span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-[#F8FAFC] flex items-center justify-center text-[#4A90E2] border border-slate-100 shrink-0"><MapPin size={14}/></div>
                <span className="leading-relaxed font-bold text-[#1E293B]">{address.full}</span>
              </div>
            </div>
          </div>

          {/* Footer CTA - Clean Surface Style */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex items-center gap-2 text-[#4A90E2] mb-3">
                <Sparkles size={14} />
                <h4 className="font-bold text-xs uppercase tracking-wider">Expert Counseling</h4>
              </div>
              <p className="text-[11px] text-[#64748B] mb-6 leading-relaxed font-medium">Book a session with our advisors to map your academic future.</p>
              <button 
                onClick={openModal}
                className="w-full bg-[#1E293B] text-white py-3 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A90E2] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                Book My Session
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100">
          {/* Disclaimer - Refined Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-8">
              <div className="flex items-start gap-3 opacity-70 group">
                <div className="mt-1 p-1 bg-slate-100 rounded text-[#94A3B8] group-hover:bg-[#4A90E2]/10 group-hover:text-[#4A90E2] transition-colors">
                  <Sparkles size={12} />
                </div>
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1E293B]">Legal Disclaimer</h5>
                  <p className="text-[10px] leading-relaxed font-medium">
                    The content provided by <span className="text-[#1E293B] font-bold">{SITE_IDENTITY.name}</span> is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind regarding the accuracy, validity, or completeness of institutional data. 
                    <span className="block mt-1 italic text-[#94A3B8]">Final admission and visa decisions rest solely with the respective universities and governmental authorities.</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col lg:items-end gap-4">
              <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-[#1E293B]">
                <Link href="/privacy" className="hover:text-[#4A90E2] transition-colors">Privacy Policy</Link>
                <Link href="/term" className="hover:text-[#4A90E2] transition-colors">Terms of Use</Link>
                <Link href="/contact" className="hover:text-[#4A90E2] transition-colors">Sitemap</Link>
              </div>
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                © {new Date().getFullYear()} {SITE_IDENTITY.name} • All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top - Minimalist */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#1E293B] text-white rounded-md flex items-center justify-center shadow-lg hover:bg-[#4A90E2] transition-all z-50 group active:scale-90"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default Footer;