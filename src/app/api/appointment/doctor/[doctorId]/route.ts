import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  const { doctorId } = await params;
  const list = clinicDb.getAppointmentsByDoctor(doctorId);
  return NextResponse.json(list);
}

