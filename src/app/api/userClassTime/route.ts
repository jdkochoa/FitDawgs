import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserClassTime from "@/models/userClassTime";

export async function POST(request: NextRequest) {
  const { userId, classTimes } = await request.json();
  await connectMongoDB();

  const updated = await UserClassTime.findOneAndUpdate(
    { userId },
    { classTimes },
    { upsert: true, new: true }
  );

  return NextResponse.json(
    { message: "User class times saved", data: updated },
    { status: 200 }
  );
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const userClassTime = await UserClassTime.findOne({ userId });

    if (!userClassTime || !userClassTime.classTimes.length) {
      return NextResponse.json({ error: "No class times found" }, { status: 404 });
    }

    return NextResponse.json({ classTimes: userClassTime.classTimes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};



// export async function GET(request: NextRequest) {
//   await connectMongoDB(); 
//   const userClassTime = await UserClassTime.find();
//   return NextResponse.json(userClassTime, { status: 200 });
// }
