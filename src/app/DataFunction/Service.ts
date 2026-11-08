import { clinicDb } from "@/lib/data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export const getServices = async () => {
  // Return instant in-memory services for 0ms response time
  const services = clinicDb.getServices();
  if (services && services.length > 0) {
    if (API_BASE) {
      fetch(`${API_BASE}/api/service`, { method: 'GET' }).catch(() => {});
    }
    return services;
  }

  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/service`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  return clinicDb.getServices();
};
