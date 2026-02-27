"use client"
import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin, HelpCircle, CheckCircle } from "lucide-react";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import ContactClientButton from "@/components/ContactClientButton";

export default function ContactPage() {
  const { emails, phones, address, socials } = useContactInfo();

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
            Get in <span className="text-[#4A90E2]">Touch</span>
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Questions about admissions or visas? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a href={createTelLink(phones.primary)} className="group p-8 border border-slate-200 rounded-xl hover:border-[#4A90E2] transition-colors">
            <Phone className="w-6 h-6 text-[#4A90E2] mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Phone</h3>
            <p className="text-[#64748B]">{phones.primary}</p>
          </a>

          <a href={createMailtoLink(emails.info)} className="group p-8 border border-slate-200 rounded-xl hover:border-[#4A90E2] transition-colors">
            <Mail className="w-6 h-6 text-[#4A90E2] mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Email</h3>
            <p className="text-[#64748B]">{emails.info}</p>
          </a>

          <a href={createWhatsAppLink(phones.primaryRaw)} className="group p-8 border border-slate-200 rounded-xl hover:border-[#4A90E2] transition-colors">
            <MessageCircle className="w-6 h-6 text-[#4A90E2] mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">WhatsApp</h3>
            <p className="text-[#64748B]">Instant Chat</p>
          </a>

          <div className="p-8 border border-slate-200 rounded-xl">
            <MapPin className="w-6 h-6 text-[#4A90E2] mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Office</h3>
            <p className="text-[#64748B]">{address.office}</p>
            <p className="text-[#64748B]">{address.city}, {address.country}</p>
          </div>
        </div>

        <div className="text-center">
          <ContactClientButton />
        </div>
      </div>
    </div>
  );
}