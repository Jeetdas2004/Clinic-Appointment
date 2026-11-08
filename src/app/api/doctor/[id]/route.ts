import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doctor = clinicDb.getDoctorById(id);
  if (!doctor) {
    return NextResponse.json({ message: `Doctor with id ${id} not found` }, { status: 404 });
  }
  return NextResponse.json(doctor);
}

