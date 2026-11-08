import { clinicDb } from "@/lib/data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export const SignIn = async (data: { userName: string; password?: string }) => {
  // Instant local check first for zero-latency response
  const localDoctor = clinicDb.authenticateDoctor(data.userName, data.password);
  if (localDoctor) {
    // Sync with remote server non-blockingly if external API is configured
    if (API_BASE) {
      fetch(`${API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    }
    return { result: 1, user: localDoctor };
  }

  // If local not found and API_BASE exists, attempt network fetch
  if (API_BASE) {
    try {
      const response = await fetch(`${API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }
  }

  return { result: 0, message: "Invalid username or password" };
};
