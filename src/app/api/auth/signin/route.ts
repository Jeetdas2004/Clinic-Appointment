import { NextResponse } from "next/server";
import { clinicDb } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { userName, password } = await req.json();
    const doctor = clinicDb.authenticateDoctor(userName, password);
    if (!doctor) {
      return NextResponse.json({ result: 0, message: "Invalid username or password" }, { status: 401 });
    }
    return NextResponse.json({ result: 1, user: doctor });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

