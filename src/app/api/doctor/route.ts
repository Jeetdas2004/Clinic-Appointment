import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET() {
  const doctors = clinicDb.getDoctors();
  return NextResponse.json(doctors);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "Doctor registered", doctor: body }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
  }
}

