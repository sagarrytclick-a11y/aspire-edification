"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter, ChevronUp, Sparkles } from 'lucide-react';
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

  return (
    <footer className="bg-[#12141D] text-[#94A3B8] pt-16 pb-8 px-6 font-sans relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-1 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#4A90E2]/50 transition-colors">
                <Image src="/logo.png" alt={SITE_IDENTITY.name} width={42} height={42} className="brightness-110" />
              </div>
              <span className="text-xl font-bold text-[#F8FAFC] tracking-tight">{SITE_IDENTITY.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              {SITE_IDENTITY.description} Leading the way in strategic education consulting for global leaders.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: MessageCircle, href: createWhatsAppLink(phones.primary) }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-9 h-9 rounded-md bg-[#1E212B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all">
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]" /> Explore
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: "Top Colleges", href: "/colleges" },
                { name: "Entrance Exams", href: "/exams" },
                { name: "Success Stories", href: "/testimonials" },
                { name: "Resource Hub", href: "/blogs" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#4A90E2] transition-colors flex items-center group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2 text-[#4A90E2]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Details */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> Contact
            </h4>
            <div className="space-y-4 text-sm">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-3 hover:text-[#F8FAFC] transition-colors group">
                <Phone size={16} className="text-[#4A90E2]" />
                <span>{phones.primary}</span>
              </a>
              <a href={createMailtoLink(emails.info)} className="flex items-center gap-3 hover:text-[#F8FAFC] transition-colors group">
                <Mail size={16} className="text-[#4A90E2]" />
                <span className="lowercase">{emails.info}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#4A90E2] shrink-0 mt-1" />
                <span className="leading-snug">{address.full}</span>
              </div>
            </div>
          </div>

          {/* 4. CTA Card */}
          <div className="bg-[#1E212B] p-6 rounded-xl border border-white/5 shadow-2xl relative group">
            <Sparkles className="absolute top-4 right-4 text-[#00D4FF]/20 group-hover:text-[#00D4FF] transition-colors" size={20} />
            <h4 className="text-[#F8FAFC] font-bold text-sm mb-2">Ready to Start?</h4>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">Book a 1-on-1 session with our expert academic advisors today.</p>
            <button 
              onClick={openModal}
              className="w-full bg-[#4A90E2] hover:bg-[#00D4FF] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#4A90E2]/10 active:scale-95"
            >
              Consult Now <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Single Line Style */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] font-medium tracking-wide">
              © {new Date().getFullYear()} <span className="text-[#F8FAFC]">{SITE_IDENTITY.name}</span>
            </p>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="flex gap-6 text-[10px] uppercase tracking-[0.1em] font-bold">
              <Link href="/privacy" className="hover:text-[#4A90E2]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#4A90E2]">Terms</Link>
              <Link href="/contact" className="hover:text-[#4A90E2]">Sitemap</Link>
            </div>
          </div>
          
          <div className="text-[10px] text-center md:text-right max-w-md opacity-60 leading-relaxed italic">
            Admissions and visa decisions are subject to institutional and governmental authority.
          </div>
        </div>
      </div>

      {/* Back to Top */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-11 h-11 bg-[#4A90E2] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#00D4FF] hover:-translate-y-1 transition-all z-50 active:scale-90"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
