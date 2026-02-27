import React from 'react';
import { Star, Users, Award, Zap, CheckCircle2, Globe, Target, BookOpen } from 'lucide-react';
import AboutClientButtons from '@/components/AboutClientButtons';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E212B]">
      {/* HERO SECTION - Clean Light Theme */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(74,144,226,0.1)_0,transparent_70%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#4A90E2]/20 text-[#4A90E2] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Star size={14} className="fill-[#4A90E2]" /> About Aspire Edification
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-[#12141D]">
            Bridging the Gap Between <br />
            <span className="text-[#4A90E2]">Ambition</span> and <span className="text-[#00D4FF]">Excellence</span>
          </h1>

          <p className="text-[#64748B] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Aspire Edification is more than a consultancy. We are a data-driven ecosystem dedicated to helping students navigate the complex world of higher education with clarity and confidence.
          </p>

          <AboutClientButtons />
        </div>
      </section>

      {/* STATS - Subtle Surface */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Verified Data", icon: <CheckCircle2 className="text-[#00D4FF]" size={20} /> },
              { value: "500+", label: "Partner Institutions", icon: <Globe className="text-[#4A90E2]" size={20} /> },
              { value: "5k+", label: "Career Pathings", icon: <Target className="text-[#00D4FF]" size={20} /> },
              { value: "24/7", label: "Expert Support", icon: <Users className="text-[#4A90E2]" size={20} /> }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#12141D] mb-1">{stat.value}</div>
                <div className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#12141D] mb-8">
                What We Do <span className="text-[#4A90E2]">Differently</span>
              </h2>
              <div className="space-y-6 text-[#64748B] leading-relaxed text-lg">
                <p>
                  At <span className="text-[#12141D] font-semibold">Aspire Edification</span>, we simplify the overwhelming college search process. We analyze placement trends and campus culture to ensure your choice aligns with your career goals.
                </p>
                <div className="space-y-4">
                  {[
                    { t: "University Matching", d: "Using real-time data to find colleges that fit your academic profile.", iconColor: "#4A90E2" },
                    { t: "Placement Analysis", d: "Deep diving into historical hiring patterns of institutions.", iconColor: "#00D4FF" },
                    { t: "Course Selection", d: "Aligning your passion with the most relevant industry-ready programs.", iconColor: "#4A90E2" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#4A90E2]/30 transition-all hover:shadow-md">
                      <div className="mt-1"><Zap size={18} style={{ color: feature.iconColor }} /></div>
                      <div>
                        <h4 className="text-[#12141D] font-bold mb-1">{feature.t}</h4>
                        <p className="text-sm text-[#64748B]">{feature.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-[#4A90E2]/5 blur-2xl rounded-full"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&fit=crop"
                  alt="Modern Education"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl border border-slate-200 shadow-2xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4A90E2]/10 rounded-full flex items-center justify-center">
                    <BookOpen className="text-[#4A90E2]" />
                  </div>
                  <div>
                    <p className="text-[#12141D] font-bold text-xl">100%</p>
                    <p className="text-[#64748B] text-xs uppercase tracking-tighter">Verified Institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#12141D] mb-4 tracking-tight">
              Our Core <span className="text-[#00D4FF]">Philosophy</span>
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Empowering students through transparency, data, and human-centric counseling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "No hidden agendas. We provide unbiased data on placements and campus reality.", color: "#4A90E2" },
              { title: "Empowerment", desc: "We don't just choose for you; we give you the tools to choose for yourself.", color: "#00D4FF" },
              { title: "Reliability", desc: "Every institution on our platform is vetted for academic and professional quality.", color: "#4A90E2" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#4A90E2]/50 transition-all group hover:shadow-lg">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:rotate-12"
                  style={{ backgroundColor: `${value.color}15`, color: value.color }}
                >
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#12141D] mb-3">{value.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Soft Gradient Finish */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4A90E2]/5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#12141D] mb-8 tracking-tight">
            Stop Guessing. <br />
            <span className="text-[#00D4FF]">Start Aspiring.</span>
          </h2>
          <p className="text-[#64748B] text-lg mb-12 max-w-xl mx-auto">
            Your career is too important to leave to chance. Get data-backed guidance today.
          </p>

          <AboutClientButtons />
        </div>
      </section>
    </main>
  );
}