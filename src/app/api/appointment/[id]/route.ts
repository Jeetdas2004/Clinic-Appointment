import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { status } = await req.json();
    const updated = clinicDb.updateAppointmentStatus(id, status);
    if (!updated) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

