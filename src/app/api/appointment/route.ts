import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET() {
  const appointments = clinicDb.getAppointments();
  return NextResponse.json(appointments);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.patientName || !data.doctor) {
      return NextResponse.json(
        { message: "Patient name and Doctor selection are required" },
        { status: 400 }
      );
    }
    const newAppointment = clinicDb.addAppointment(data);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating appointment";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

