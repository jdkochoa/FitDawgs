import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import ClassTime from "@/models/classTime";
import mongoose from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await connectMongoDB();
  const classTime = await ClassTime.findOne({ _id: id });
  return NextResponse.json({ classTime }, { status: 200 });
}