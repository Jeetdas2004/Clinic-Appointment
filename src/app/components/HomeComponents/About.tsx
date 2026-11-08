import React from 'react';
import Image from 'next/image';
import clinicLogo from '../../../../public/clinicLogo.png';
import { FaCheckCircle, FaAward, FaHospital, FaUserNurse } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-12 bg-white/80 backdrop-blur-xs border-t border-slate-200/60 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase border border-blue-100">
              <Image src={clinicLogo} alt="AY-Clinic" width={18} height={18} className="object-contain" />
              <span>About AY-Clinic</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              A Dedicated Team of Healthcare Professionals Committed to Your Well-Being
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              AY-Clinic is an advanced polyclinic and virtual healthcare provider bridging the gap between patients and specialized medical doctors. We offer seamless online appointments, on-site diagnostics, and dedicated follow-up care.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 w-full">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <FaCheckCircle className="text-blue-600 text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Board-Certified Specialists</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Every doctor is vetted and board-certified in their specialty.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <FaAward className="text-amber-500 text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Accredited Clinical Care</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Compliant with modern international clinical safety standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <FaHospital className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Modern Facility</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Equipped with ultra-low radiation X-rays and sterile laboratories.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <FaUserNurse className="text-indigo-500 text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">24/7 Patient Concierge</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Immediate assistance for emergency scheduling and questions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="AY-Clinic Modern Medical Team and Facility"
                className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Over 15 Years of Trusted Service</h5>
                    <p className="text-xs text-slate-500">More than 100,000 satisfied patients across regions</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-sm">
                    99.4%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
