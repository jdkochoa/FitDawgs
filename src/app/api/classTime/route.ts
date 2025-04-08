import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import ClassTime from "@/models/classTime";

export async function POST(request: NextRequest) {
  const body = await request.json();
  await connectMongoDB();

  if (Array.isArray(body)) {
    await ClassTime.insertMany(body);
  } else {
    const { day, start, end } = body;
    await ClassTime.create({ day, start, end });
  }

  return NextResponse.json(
    { message: "ClassTime(s) added successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const classTimes = await ClassTime.find().sort({ day: 1, start: 1 });
  return NextResponse.json(classTimes);
}
