"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import ClinicLogo from '../../../../public/clinicLogo.png';
import { useSelector } from 'react-redux';
import { DoctorType } from '@/app/Types';
import { FaStar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBriefcase, FaSearch, FaCalendarCheck } from 'react-icons/fa';

type Props = {
  onSelectDoctor?: (doctorId: string) => void;
};

const Doctors = ({ onSelectDoctor }: Props) => {
  const doctorsState = useSelector((state: { doctors: DoctorType[] }) => state.doctors);
  const doctorsFromStore = useMemo(() => doctorsState || [], [doctorsState]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  // Specialties list
  const specialties = useMemo(() => {
    const list = new Set<string>();
    doctorsFromStore.forEach((d) => {
      const sName = typeof d.service === 'object' ? d.service?.name : d.service;
      if (sName) list.add(sName);
    });
    return ['All', ...Array.from(list)];
  }, [doctorsFromStore]);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    return doctorsFromStore.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.location.toLowerCase().includes(searchTerm.toLowerCase());

      const sName = typeof doc.service === 'object' ? doc.service?.name : doc.service;
      const matchSpecialty = selectedSpecialty === 'All' || sName === selectedSpecialty;

      return matchSearch && matchSpecialty;
    });
  }, [doctorsFromStore, searchTerm, selectedSpecialty]);

  return (
    <section id="doctors" className="py-12 bg-slate-50/70 backdrop-blur-xs border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <Image src={ClinicLogo} alt="" width={20} height={20} className="object-contain" />
            <span>Qualified Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Medical Doctors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            Our physicians are renowned specialists with years of clinical expertise, dedicated to delivering precision diagnoses and caring patient experiences.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by doctor or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-100 cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor._id || index}
                doctor={doctor}
                onBook={() => onSelectDoctor && onSelectDoctor(doctor._id)}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              <p className="text-lg font-semibold">No doctors found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('All');
                }}
                className="mt-3 px-4 py-2 text-sm text-blue-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;

const DoctorCard = ({ doctor, onBook }: { doctor: DoctorType; onBook?: () => void }) => {
  const serviceName =
    typeof doctor.service === 'object' && doctor.service?.name
      ? doctor.service.name
      : 'General Specialist';

  const avatar =
    doctor.avatar ||
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Doctor Image Header */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={avatar}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <FaStar className="text-amber-400 text-xs" />
          <span>{doctor.rating || 4.9}</span>
          <span className="text-slate-400 text-[10px]">({doctor.reviewsCount || 150})</span>
        </div>

        {/* Specialty Tag */}
        <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md">
          {serviceName}
        </div>
      </div>

      {/* Doctor Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {doctor.name}
          </h3>

          <div className="mt-3 space-y-2 text-xs text-slate-600">
            {doctor.experience && (
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-blue-500 shrink-0 text-sm" />
                <span className="font-semibold text-slate-800">{doctor.experience}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-rose-500 shrink-0 text-sm" />
              <span className="truncate">{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-amber-500 shrink-0 text-sm" />
              <span className="truncate">{doctor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-emerald-500 shrink-0 text-sm" />
              <span>{doctor.phone}</span>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={onBook}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
        >
          <FaCalendarCheck className="text-sm" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
};
