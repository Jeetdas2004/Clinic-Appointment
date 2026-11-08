"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ClinicLogo from '../../../public/clinicLogo.png';
import { AppointmentType, DoctorType } from '../Types';
import { getPatientAppointments } from '../DataFunction/Appointment';
import { initialDoctors, initialAppointments } from '@/lib/data';
import Appointments from '../components/Appointments';
import {
  FaUserInjured,
  FaCalendarCheck,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaPlus,
  FaPrint,
  FaCheckCircle,
  FaArrowLeft,
  FaQrcode,
  FaHospital,
} from 'react-icons/fa';

const DEMO_PATIENTS = [
  { id: 'ID-94820', name: 'Emily Watson', specialty: 'Dental Care' },
  { id: 'ID-38291', name: 'Robert Chen', specialty: 'Cardiology' },
  { id: 'ID-44910', name: 'Daniel Craig', specialty: 'Pulmonology' },
  { id: 'ID-71932', name: 'Sofia Alvarez', specialty: 'Pediatrics' },
  { id: 'ID-90312', name: 'Eleanor Vance', specialty: 'Neurology' },
  { id: 'ID-77291', name: 'Samuel Green', specialty: 'Pharmacy' },
];

export default function PatientPortalPage() {
  const [patientIdInput, setPatientIdInput] = useState<string>('ID-94820');
  const [activePatientId, setActivePatientId] = useState<string>('ID-94820');
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedPass, setSelectedPass] = useState<AppointmentType | null>(null);

  // Load appointments for active patient
  useEffect(() => {
    setIsLoading(true);
    getPatientAppointments(activePatientId)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
          setSelectedPass(data[0]);
        } else {
          // If no appointments returned, filter from local initialAppointments
          const fallback = initialAppointments.filter(
            (a) => a.patientId.toLowerCase() === activePatientId.toLowerCase()
          );
          setAppointments(fallback);
          setSelectedPass(fallback[0] || null);
        }
      })
      .catch(() => {
        const fallback = initialAppointments.filter(
          (a) => a.patientId.toLowerCase() === activePatientId.toLowerCase()
        );
        setAppointments(fallback);
        setSelectedPass(fallback[0] || null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePatientId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientIdInput.trim()) {
      setActivePatientId(patientIdInput.trim());
    }
  };

  const handleSelectDemoPatient = (id: string) => {
    setPatientIdInput(id);
    setActivePatientId(id);
  };

  // Helper to find doctor info
  const getDoctorDetails = (docIdOrObj: string | DoctorType | undefined): DoctorType => {
    if (docIdOrObj && typeof docIdOrObj === 'object') {
      return docIdOrObj;
    }
    const found = initialDoctors.find((d) => d._id === docIdOrObj);
    return found || initialDoctors[0];
  };

  const currentPatientName = useMemo(() => {
    if (appointments.length > 0) {
      return appointments[0].patientName;
    }
    const demo = DEMO_PATIENTS.find((p) => p.id === activePatientId);
    return demo ? demo.name : activePatientId;
  }, [appointments, activePatientId]);

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Appointment Booking Modal */}
      <Appointments
        visible={bookModalOpen}
        setVisible={setBookModalOpen}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Brand & Title */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 p-2 flex items-center justify-center transition-colors"
                title="Back to Home"
              >
                <Image src={ClinicLogo} alt="AY-Clinic" width={40} height={40} className="object-contain" priority />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-white">Patient Health Portal</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-blue-100">
                    Appointments & Records
                  </span>
                </div>
                <p className="text-xs text-blue-100/90 mt-0.5">
                  View scheduled clinical visits, doctor details, and digital appointment passes.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBookModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md transition-all cursor-pointer"
              >
                <FaPlus className="text-xs" />
                <span>Book New Visit</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span>Exit Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Patient Switcher & Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FaUserInjured className="text-blue-600" />
              <span>Active Patient Profile</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900">{currentPatientName}</span>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {activePatientId}
              </span>
            </div>
          </div>

          {/* Search by ID/Name */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search by Patient ID (e.g. ID-94820)..."
                value={patientIdInput}
                onChange={(e) => setPatientIdInput(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* 1-Click Patient Switcher Pills */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Switch Demo Patients:
          </span>
          <div className="flex flex-wrap gap-2">
            {DEMO_PATIENTS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectDemoPatient(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  activePatientId.toLowerCase() === p.id.toLowerCase()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/80 hover:text-blue-700'
                }`}
              >
                <span>{p.name}</span>
                <span className={`text-[10px] font-mono ${activePatientId.toLowerCase() === p.id.toLowerCase() ? 'text-blue-200' : 'text-slate-400'}`}>
                  ({p.specialty})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout: Appointments List + Digital Pass Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Appointments List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FaCalendarCheck className="text-blue-600" />
                <span>Your Booked Appointments ({appointments.length})</span>
              </h3>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                Loading appointments...
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((app) => {
                  const doc = getDoctorDetails(app.doctor);
                  const sName =
                    typeof doc.service === 'object' && doc.service?.name
                      ? doc.service.name
                      : 'Specialist';
                  const isSelected = selectedPass?._id === app._id;
                  const status = app.status || 'Scheduled';

                  return (
                    <div
                      key={app._id}
                      onClick={() => setSelectedPass(app)}
                      className={`bg-white rounded-3xl p-5 border transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md flex flex-col gap-4 ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-600/20'
                          : 'border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {/* Top: Status & Date */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : status === 'In Progress'
                                ? 'bg-indigo-100 text-indigo-700'
                                : status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {status === 'Scheduled' ? 'Upcoming Visit' : status}
                          </span>
                          <span className="font-mono text-xs text-slate-400 font-semibold">
                            #{app._id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <FaClock className="text-blue-500" />
                          <span>
                            {String(app.date)} • {app.timeSlot || '10:00 AM'}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Doctor & Illness */}
                      <div className="flex items-start gap-4">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-base">{doc.name}</h4>
                          <p className="text-xs font-bold text-blue-600">{sName}</p>
                          <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                            <span className="font-semibold text-slate-500 block text-[11px] uppercase">
                              Symptoms / Clinical Reason:
                            </span>
                            <span className="font-medium">{app.illness}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-rose-500" />
                          <span className="truncate">{doc.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaPhone className="text-emerald-500" />
                          <span>{doc.phone}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200 space-y-3">
                <FaHospital className="mx-auto text-4xl text-slate-300" />
                <h4 className="text-base font-bold text-slate-800">No appointments found for this ID</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  There are no scheduled visits for patient ID {activePatientId}. You can book an appointment now!
                </p>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Book Appointment Now
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Digital Appointment Pass */}
          <div className="lg:col-span-5 sticky top-24">
            {selectedPass ? (
              (() => {
                const doc = getDoctorDetails(selectedPass.doctor);
                const sName =
                  typeof doc.service === 'object' && doc.service?.name
                    ? doc.service.name
                    : 'Specialist';

                return (
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
                    {/* Pass Top Banner */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                          Digital Clinical Pass
                        </div>
                        <h3 className="text-lg font-black tracking-tight">AY-Clinic Appointment Slip</h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white text-xl">
                        <FaQrcode />
                      </div>
                    </div>

                    {/* Pass Body */}
                    <div className="p-6 space-y-5">
                      {/* Patient & Booking ID */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Patient Name
                          </span>
                          <span className="text-base font-black text-slate-900">
                            {selectedPass.patientName}
                          </span>
                          <span className="text-xs text-slate-500 block font-mono">
                            ID: {selectedPass.patientId}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Booking Reference
                          </span>
                          <span className="font-mono text-sm font-black text-blue-600">
                            {selectedPass._id}
                          </span>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                            {selectedPass.status || 'Confirmed'}
                          </span>
                        </div>
                      </div>

                      {/* Doctor & Department */}
                      <div className="flex items-center gap-3 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white shadow-xs"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                            Attending Physician
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm truncate">{doc.name}</h4>
                          <p className="text-xs text-slate-600 truncate">{sName}</p>
                        </div>
                      </div>

                      {/* Date & Time Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                            Date of Visit
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            {String(selectedPass.date)}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                            Time Slot
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            {selectedPass.timeSlot || '10:00 AM'}
                          </span>
                        </div>
                      </div>

                      {/* Location & Instructions */}
                      <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-rose-500 shrink-0" />
                          <span>{doc.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-emerald-500 shrink-0" />
                          <span>Helpline: {doc.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-blue-500 shrink-0" />
                          <span>Email: {doc.email}</span>
                        </div>
                      </div>

                      {/* Checklist Notice */}
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <FaCheckCircle className="text-amber-600" />
                          <span>Appointment Checklist</span>
                        </div>
                        <p>
                          Please arrive 10 minutes before your slot with a valid government ID or your digital pass.
                        </p>
                      </div>

                      {/* Print Button */}
                      <button
                        onClick={() => window.print()}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <FaPrint />
                        <span>Print / Save Appointment Pass</span>
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-400 border border-slate-200">
                Select an appointment from the list to view its pass.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

