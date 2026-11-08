"use client";

import React from 'react';
import Image from 'next/image';
import doctorImg from '../../../../public/doctor.png';
import ClinicFeatures, { Feature } from './ClinicFeatures';
import Media, { MediaItem } from './Media';
import { FaXTwitter, FaInstagram, FaFacebook, FaPhone, FaHeartPulse } from 'react-icons/fa6';
import { FaUserMd, FaCalendarCheck, FaShieldAlt } from 'react-icons/fa';

type Props = {
  setVisible: (val: boolean) => void;
  visible?: boolean;
};

const Landing = ({ setVisible }: Props) => {
  return (
    <section id="home" className="relative overflow-hidden py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden border border-blue-400/30">
          {/* Subtle Decorative Background Rings */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-blue-100 text-xs sm:text-sm font-medium backdrop-blur-md shadow-xs">
                <FaHeartPulse className="text-pink-400 animate-pulse text-sm" />
                <span>Modern Virtual & On-Site Healthcare</span>
                <span className="hidden sm:inline text-blue-200">|</span>
                <span className="hidden sm:inline text-emerald-300 font-semibold">Accepting Patients</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-xs">
                  The Best Medical & Treatment Center <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">For You</span>
                </h1>
                <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed pt-2">
                  We understand acute medical conditions need rapid attention. Connect with verified medical specialists, book appointments in seconds, and receive trusted care from anywhere.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
                <button
                  onClick={() => setVisible(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-base"
                >
                  <FaCalendarCheck className="text-slate-900 text-lg" />
                  <span>Make Appointment</span>
                </button>

                <a
                  href="#doctors"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 text-base"
                >
                  <FaUserMd className="text-white text-base" />
                  <span>Meet Doctors</span>
                </a>
              </div>

              {/* Clinic Statistics */}
              <div className="pt-2 w-full">
                <ClinicFeatures>
                  <Feature number="24/7" information="Emergency Services" />
                  <Feature number="80+" information="Specialist Doctors" />
                  <Feature number="100K+" information="Happy Patients" />
                </ClinicFeatures>
              </div>

              {/* Social & Contact */}
              <div className="pt-1 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200/90">
                  Connect With Us:
                </span>
                <Media>
                  <MediaItem href="https://x.com" label="Twitter">
                    <FaXTwitter />
                  </MediaItem>
                  <MediaItem href="https://instagram.com" label="Instagram">
                    <FaInstagram />
                  </MediaItem>
                  <MediaItem href="https://facebook.com" label="Facebook">
                    <FaFacebook />
                  </MediaItem>
                  <MediaItem href="tel:+15552348901" label="Call Clinic">
                    <FaPhone />
                  </MediaItem>
                </Media>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Doctor Visual Frame */}
              <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-300 opacity-25 blur-2xl" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={doctorImg}
                    alt="Leading Clinic Specialist Doctor"
                    priority
                    className="object-contain max-h-[460px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Badge 1 - Top Left */}
                <div className="absolute top-4 -left-4 sm:left-0 z-20 bg-white/95 backdrop-blur-md text-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3 animate-bounce [animation-duration:4s]">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    <FaShieldAlt className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Certified Clinic</p>
                    <p className="text-[11px] text-slate-500 font-medium">100% Quality Assured</p>
                  </div>
                </div>

                {/* Floating Badge 2 - Bottom Right */}
                <div className="absolute bottom-6 -right-2 sm:right-2 z-20 bg-white/95 backdrop-blur-md text-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-base">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Top Rated Doctors</p>
                    <p className="text-[11px] text-slate-500 font-medium">4.9 / 5 (3,200+ Reviews)</p>
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

export default Landing;
