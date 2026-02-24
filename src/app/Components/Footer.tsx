"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter, ChevronUp, Zap } from 'lucide-react';
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from '@/context/FormModalContext';

const Footer = () => {
  const { emails, phones, address } = useContactInfo();
  const { openModal } = useFormModal();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Theme Color Tokens
  const PRIMARY_BLUE = "#4A90E2";
  const SECONDARY_CYAN = "#00D4FF";
  const BG_DEEP = "#12141D";
  const SURFACE_CARD = "#1E212B";

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
    <footer className="bg-[#12141D] text-[#94A3B8] pt-24 pb-12 px-6 border-t border-[#94A3B8]/10 relative overflow-hidden">
      {/* Subtle Glow behind Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#4A90E2]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#4A90E2] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(74,144,226,0.3)]">
                <Zap size={22} className="text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-[#F8FAFC] uppercase tracking-tighter">
                {SITE_IDENTITY.name}
              </span>
            </Link>
            <p className="text-base leading-relaxed max-w-sm text-[#94A3B8]">
              {SITE_IDENTITY.description} Empowering the next generation of global leaders through strategic education consulting.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: MessageCircle, href: createWhatsAppLink(phones.primary) }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-11 h-11 rounded-xl bg-[#1E212B] border border-[#94A3B8]/10 flex items-center justify-center text-[#F8FAFC] hover:bg-[#4A90E2] hover:border-[#4A90E2] hover:-translate-y-1 transition-all duration-300">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[#F8FAFC] font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-medium hover:text-[#00D4FF] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#4A90E2]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[#F8FAFC] font-black text-xs uppercase tracking-[0.2em] mb-8">Get In Touch</h4>
            <div className="space-y-6 text-sm">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#1E212B] border border-[#94A3B8]/10 flex items-center justify-center text-[#4A90E2] group-hover:bg-[#4A90E2] group-hover:text-white transition-all"><Phone size={16}/></div>
                <span className="font-bold text-[#F8FAFC]">{phones.primary}</span>
              </a>
              <a href={createMailtoLink(emails.info)} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#1E212B] border border-[#94A3B8]/10 flex items-center justify-center text-[#4A90E2] group-hover:bg-[#4A90E2] group-hover:text-white transition-all"><Mail size={16}/></div>
                <span className="font-medium lowercase text-[#F8FAFC]">{emails.info}</span>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E212B] border border-[#94A3B8]/10 flex items-center justify-center text-[#4A90E2] shrink-0"><MapPin size={16}/></div>
                <span className="leading-relaxed font-medium text-[#F8FAFC]">{address.full}</span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1E212B] to-[#12141D] border border-[#94A3B8]/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A90E2]/10 blur-[40px]" />
              <h4 className="text-[#F8FAFC] font-black text-sm mb-3">Expert Counseling</h4>
              <p className="text-xs text-[#94A3B8] mb-8 leading-relaxed">Book a session with our advisors to map your academic future.</p>
              <button 
                onClick={openModal}
                className="w-full bg-[#4A90E2] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00D4FF] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(74,144,226,0.2)]"
              >
                Book My Session
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#94A3B8]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">
              © {new Date().getFullYear()} {SITE_IDENTITY.name} • Built for the Bold
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-[#4A90E2] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#4A90E2] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#4A90E2] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Back to Top - Themed */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#4A90E2] text-white rounded-2xl flex items-center justify-center shadow-[0_15px_30px_rgba(74,144,226,0.3)] hover:scale-110 hover:bg-[#00D4FF] transition-all z-50 group"
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default Footer;