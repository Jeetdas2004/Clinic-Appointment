import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  const { patientId } = await params;
  const decoded = decodeURIComponent(patientId);
  const list = clinicDb.getAppointmentsByPatient(decoded);
  return NextResponse.json(list);
}

