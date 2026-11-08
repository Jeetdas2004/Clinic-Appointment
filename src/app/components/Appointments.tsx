"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { createAppointment } from '../DataFunction/Appointment';
import { appointmentActions } from '@/redux/appointmentsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorType, ServiceType, AppointmentType } from '../Types';
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaNotesMedical,
  FaUserMd,
  FaCheckCircle,
  FaBriefcaseMedical,
} from 'react-icons/fa';

type Props = {
  visible: boolean;
  setVisible: (val: boolean) => void;
  selectedDoctorId?: string | null;
};

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:15 AM',
  '01:30 PM',
  '02:45 PM',
  '04:00 PM',
  '05:15 PM',
];

const getTodayFormatted = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const Appointments = ({ visible, setVisible, selectedDoctorId }: Props) => {
  const dispatch = useDispatch();
  const doctorsState = useSelector((state: { doctors: DoctorType[] }) => state.doctors);
  const doctors = React.useMemo(() => doctorsState || [], [doctorsState]);
  const servicesState = useSelector((state: { service: { services: ServiceType[] } }) => state.service.services);
  const services = React.useMemo(() => servicesState || [], [servicesState]);

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentType | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    identityNumber: '',
    age: '',
    email: '',
    phone: '',
    illness: '',
    serviceId: '',
    doctorId: '',
    date: getTodayFormatted(),
    timeSlot: '10:00 AM',
  });

  // When selectedDoctorId changes or modal opens, pre-fill doctor & service
  useEffect(() => {
    if (visible && selectedDoctorId) {
      const match = doctors.find((d) => d._id === selectedDoctorId);
      if (match) {
        const srvId = typeof match.service === 'object' ? match.service._id : '';
        setFormData((prev) => ({
          ...prev,
          doctorId: match._id,
          serviceId: srvId || prev.serviceId,
        }));
      }
    } else if (visible && doctors.length > 0) {
      setFormData((prev) => {
        if (prev.doctorId) return prev;
        const firstDoc = doctors[0];
        const srvId = typeof firstDoc.service === 'object' ? firstDoc.service._id : '';
        return {
          ...prev,
          doctorId: firstDoc._id,
          serviceId: srvId,
        };
      });
    }
  }, [visible, selectedDoctorId, doctors]);

  // When service changes, optionally filter doctor list
  const filteredDoctors = formData.serviceId
    ? doctors.filter((doc) => {
        const srvId = typeof doc.service === 'object' ? doc.service._id : '';
        return srvId === formData.serviceId;
      })
    : doctors;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.identityNumber.trim() || !formData.age) {
      toast.warning('Please complete all patient personal fields.');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      identityNumber: '',
      age: '',
      email: '',
      phone: '',
      illness: '',
      serviceId: services[0]?._id || '',
      doctorId: doctors[0]?._id || '',
      date: getTodayFormatted(),
      timeSlot: '10:00 AM',
    });
    setStep(1);
    setConfirmedAppointment(null);
  };

  const handleClose = () => {
    setVisible(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.illness.trim() || !formData.doctorId || !formData.date) {
      toast.warning('Please provide your symptoms, doctor, and date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<AppointmentType> = {
        patientName: formData.fullName,
        patientId: formData.identityNumber,
        age: Number(formData.age) || undefined,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctorId,
        illness: formData.illness,
        date: formData.date,
        timeSlot: formData.timeSlot,
      };

      const result = await createAppointment(payload);
      dispatch(appointmentActions.addAppointment(result));
      setConfirmedAppointment(result);
      setStep(3);

      toast.success('Appointment booked successfully!', {
        position: 'top-center',
        autoClose: 4000,
      });
    } catch {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white text-lg">
              <FaCalendarAlt />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Book Clinic Appointment</h2>
              <p className="text-xs text-blue-100">
                {step === 1 && 'Step 1 of 2: Patient Information'}
                {step === 2 && 'Step 2 of 2: Medical Consultation & Schedule'}
                {step === 3 && 'Booking Confirmed'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Modal Body / Steps */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Patient Information */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FaUser className="text-blue-500 text-xs" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaIdCard className="text-blue-500 text-xs" />
                    <span>Identity / Patient ID *</span>
                  </label>
                  <input
                    type="text"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    placeholder="e.g. ID-10492"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaUser className="text-blue-500 text-xs" />
                    <span>Age (Years) *</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="125"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 34"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaEnvelope className="text-blue-500 text-xs" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaClock className="text-blue-500 text-xs" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Continue to Schedule →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Doctor & Schedule Selection */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Department */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FaBriefcaseMedical className="text-blue-500 text-xs" />
                  <span>Clinical Department</span>
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                >
                  <option value="">All Clinical Departments</option>
                  {services.map((srv) => (
                    <option key={srv._id} value={srv._id}>
                      {srv.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FaUserMd className="text-blue-500 text-xs" />
                  <span>Select Doctor *</span>
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                >
                  <option value="">-- Choose Specialist Doctor --</option>
                  {filteredDoctors.map((doc) => {
                    const sName =
                      typeof doc.service === 'object' ? doc.service?.name : 'Specialist';
                    return (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} ({sName})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Symptoms / Illness */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FaNotesMedical className="text-blue-500 text-xs" />
                  <span>Symptoms / Reason for Visit *</span>
                </label>
                <textarea
                  name="illness"
                  rows={2}
                  value={formData.illness}
                  onChange={handleChange}
                  placeholder="e.g. Persistent headache, recurring fever, dental pain..."
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-blue-500 text-xs" />
                    <span>Appointment Date *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={getTodayFormatted()}
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FaClock className="text-blue-500 text-xs" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment ✓'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation View */}
          {step === 3 && confirmedAppointment && (
            <div className="flex flex-col items-center text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
                <FaCheckCircle />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Appointment Confirmed!</h3>
                <p className="text-sm text-slate-600">
                  Your visit has been registered in the clinic system.
                </p>
              </div>

              {/* Receipt / Pass Card */}
              <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/90 p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Booking ID</span>
                  <span className="font-mono text-sm font-bold text-blue-600">
                    {confirmedAppointment._id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Patient</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {confirmedAppointment.patientName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Patient ID</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {confirmedAppointment.patientId}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Date & Time</span>
                    <span className="font-bold text-slate-800">
                      {String(confirmedAppointment.date)} at {confirmedAppointment.timeSlot || '10:00 AM'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Status</span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-400 block font-medium">Reason</span>
                  <span className="text-slate-700">{confirmedAppointment.illness}</span>
                </div>
              </div>

              <div className="pt-2 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/Patient"
                  onClick={handleClose}
                  className="w-full sm:w-1/2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>View in Patient Portal →</span>
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-1/2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
