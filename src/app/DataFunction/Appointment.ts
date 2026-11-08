import { AppointmentType } from "../Types";
import { clinicDb } from "@/lib/data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export const createAppointment = async (data: Partial<AppointmentType>): Promise<AppointmentType> => {
  // Instant in-memory creation for 0ms execution
  const newApp = clinicDb.addAppointment(data);

  // Sync with backend API in background non-blockingly
  if (API_BASE) {
    fetch(`${API_BASE}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});
  }

  return newApp;
};

export const getAppointments = async (): Promise<AppointmentType[]> => {
  const localList = clinicDb.getAppointments();
  if (localList && localList.length > 0) {
    if (API_BASE) {
      fetch(`${API_BASE}/api/appointment`, { method: 'GET' }).catch(() => {});
    }
    return localList;
  }

  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/appointment`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }
  return clinicDb.getAppointments();
};

export const getDoctorAppointments = async (doctorId: string): Promise<AppointmentType[]> => {
  // Instant local retrieval
  const localList = clinicDb.getAppointmentsByDoctor(doctorId);
  if (API_BASE) {
    fetch(`${API_BASE}/api/appointment/doctor/${doctorId}`, { method: 'GET' }).catch(() => {});
  }
  return localList;
};

export const getPatientAppointments = async (patientId: string): Promise<AppointmentType[]> => {
  // Instant local retrieval
  const localList = clinicDb.getAppointmentsByPatient(patientId);
  if (API_BASE) {
    fetch(`${API_BASE}/api/appointment/patient/${encodeURIComponent(patientId)}`, { method: 'GET' }).catch(() => {});
  }
  return localList;
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
) => {
  // Instant optimistic update
  const updated = clinicDb.updateAppointmentStatus(appointmentId, status);
  if (API_BASE) {
    fetch(`${API_BASE}/api/appointment/${appointmentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  }
  return updated;
};
