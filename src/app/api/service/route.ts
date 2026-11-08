import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function GET() {
  const services = clinicDb.getServices();
  return NextResponse.json(services);
}

