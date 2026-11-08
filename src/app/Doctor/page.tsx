"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DoctorType, AppointmentType } from '../Types';
import { getDoctorAppointments, updateAppointmentStatus } from '../DataFunction/Appointment';
import { clinicDb, initialDoctors } from '@/lib/data';
import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaSignOutAlt,
  FaSearch,
  FaUserInjured,
  FaHospitalUser,
  FaTimesCircle,
} from 'react-icons/fa';

export default function DoctorPortalPage() {
  const router = useRouter();

  // Initialize doctor synchronously from localStorage or instant fallback
  const [currentDoctor, setCurrentDoctor] = useState<DoctorType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user');
        if (stored) return JSON.parse(stored);
      } catch {
        // Fall through
      }
    }
    return initialDoctors[0];
  });

  // Initialize appointments synchronously matching the doctor
  const [appointments, setAppointments] = useState<AppointmentType[]>(() => {
    const docId = currentDoctor?._id || initialDoctors[0]._id;
    return clinicDb.getAppointmentsByDoctor(docId);
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [onDuty, setOnDuty] = useState<boolean>(true);

  // Sync latest user and appointments on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentDoctor(parsed);
        const localList = clinicDb.getAppointmentsByDoctor(parsed._id);
        setAppointments(localList);
        getDoctorAppointments(parsed._id).then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setAppointments(data);
          }
        });
      }
    } catch {
      // Ignored
    }
  }, []);

  const handleStatusChange = async (
    appointmentId: string | undefined,
    newStatus: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  ) => {
    if (!appointmentId) return;

    // Instant optimistic UI update
    setAppointments((prev) =>
      prev.map((app) => (app._id === appointmentId ? { ...app, status: newStatus } : app))
    );

    try {
      await updateAppointmentStatus(appointmentId, newStatus);
    } catch {
      // Revert if error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/SignIn');
  };

  // Metrics
  const stats = useMemo(() => {
    const total = appointments.length;
    const completed = appointments.filter((a) => a.status === 'Completed').length;
    const inProgress = appointments.filter((a) => a.status === 'In Progress').length;
    const pending = appointments.filter((a) => !a.status || a.status === 'Scheduled').length;

    return { total, completed, inProgress, pending };
  }, [appointments]);

  // Filtered Appointments
  const filteredList = useMemo(() => {
    return appointments.filter((app) => {
      const matchSearch =
        app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.illness.toLowerCase().includes(searchTerm.toLowerCase());

      const currentStatus = app.status || 'Scheduled';
      const matchStatus = statusFilter === 'All' || currentStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const sName =
    typeof currentDoctor.service === 'object' && currentDoctor.service?.name
      ? currentDoctor.service.name
      : 'General Medicine';

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Banner / Doctor Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Doctor Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
                <FaUserMd />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {currentDoctor.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {sName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentDoctor.location} • {currentDoctor.email}
                </p>
              </div>
            </div>

            {/* Actions / Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOnDuty(!onDuty)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border ${onDuty
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${onDuty ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span>{onDuty ? 'On Duty' : 'On Break'}</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Queue</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FaHospitalUser className="text-base" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.total}</span>
              <p className="text-xs text-slate-500">Assigned patients</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <FaCalendarCheck className="text-base" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.pending}</span>
              <p className="text-xs text-slate-500">Awaiting consultation</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Progress</span>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FaClock className="text-base" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.inProgress}</span>
              <p className="text-xs text-slate-500">Active consultation</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <FaCheckCircle className="text-base" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.completed}</span>
              <p className="text-xs text-slate-500">Visits completed</p>
            </div>
          </div>
        </div>

        {/* Appointment Management Panel */}
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Controls Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Patient Schedule & Queue</h2>
              <p className="text-xs text-slate-500">Review patient visits and update consultation statuses in real-time.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Filter patient or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 w-52 sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {['All', 'Scheduled', 'In Progress', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${statusFilter === st
                        ? 'bg-white text-blue-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table / List View */}
          <div className="overflow-x-auto">
            {filteredList.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">Patient</th>
                    <th className="py-3 px-4">Symptoms / Reason</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredList.map((app) => {
                    const status = app.status || 'Scheduled';
                    return (
                      <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Patient info */}
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                              <FaUserInjured />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{app.patientName}</div>
                              <div className="text-xs text-slate-400">
                                {app.patientId} • {app.age ? `${app.age} yrs` : 'Age N/A'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Symptoms */}
                        <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                          <span className="line-clamp-2 text-xs font-medium">{app.illness}</span>
                        </td>

                        {/* Schedule */}
                        <td className="py-3.5 px-4">
                          <div className="text-xs font-bold text-slate-800">
                            {String(app.date)}
                          </div>
                          <div className="text-xs text-slate-500">{app.timeSlot || '10:00 AM'}</div>
                        </td>

                        {/* Status Chip */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : status === 'In Progress'
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : status === 'Cancelled'
                                    ? 'bg-rose-100 text-rose-700'
                                    : 'bg-amber-100 text-amber-700'
                              }`}
                          >
                            {status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-6 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {status !== 'In Progress' && status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(app._id, 'In Progress')}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                              >
                                Start
                              </button>
                            )}

                            {status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(app._id, 'Completed')}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <FaCheckCircle className="text-xs" />
                                <span>Done</span>
                              </button>
                            )}

                            {status !== 'Cancelled' && status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(app._id, 'Cancelled')}
                                className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Cancel Appointment"
                              >
                                <FaTimesCircle />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center text-slate-500">
                <FaHospitalUser className="mx-auto text-3xl text-slate-300 mb-2" />
                <p className="font-semibold text-sm">No appointments matching this view.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
