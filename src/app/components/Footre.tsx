import React, { ReactNode } from 'react';
import ClinicLogo from '../../../public/clinicLogo.png';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaLocationDot, FaClock } from 'react-icons/fa6';
import Link from 'next/link';

const Footre = () => {
  return (
    <footer id="contact" className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-1.5 flex items-center justify-center">
                <Image src={ClinicLogo} alt="AY-Clinic" width={42} height={42} className="object-contain" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">AY-Clinic</span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AY-Clinic provides comprehensive in-clinic and virtual healthcare services, connecting patients with qualified medical professionals through secure, frictionless appointments.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <FaTwitter className="text-base" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <FaFacebook className="text-base" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <FaInstagram className="text-base" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#home" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Medical Services
                </Link>
              </li>
              <li>
                <Link href="/#doctors" className="hover:text-blue-400 transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Patient" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  Patient Health Portal
                </Link>
              </li>
              <li>
                <Link href="/SignIn" className="hover:text-blue-400 transition-colors">
                  Doctor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Specialties</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Dental & Oral Surgery</li>
              <li>Cardiovascular Care</li>
              <li>Pulmonology & Respiratory</li>
              <li>Pediatric Health</li>
              <li>Neurology & Cognitive</li>
              <li>Clinical Pharmacy & Infusion</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Hours</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <FaLocationDot className="text-blue-400 shrink-0 text-base" />
                <span>104 Medical Plaza, Suite 400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhone className="text-blue-400 shrink-0 text-base" />
                <span>+1 (555) 234-8901</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-blue-400 shrink-0 text-base" />
                <span>contact@ayclinic.com</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <FaClock className="text-amber-400 shrink-0 text-base" />
                <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} AY-Clinic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footre;

export const Chapters = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
      <div className="flex flex-col gap-1.5 text-sm">{children}</div>
    </div>
  );
};
