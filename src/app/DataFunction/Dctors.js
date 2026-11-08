import { clinicDb } from "@/lib/data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export const getDoctors = async () => {
  // Return instant in-memory data for 0ms response time
  const doctors = clinicDb.getDoctors();
  if (doctors && doctors.length > 0) {
    // Optionally revalidate in background if external API is set
    if (API_BASE) {
      fetch(`${API_BASE}/api/doctor`, { method: 'GET' }).catch(() => {});
    }
    return doctors;
  }

  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/doctor`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  return clinicDb.getDoctors();
};
