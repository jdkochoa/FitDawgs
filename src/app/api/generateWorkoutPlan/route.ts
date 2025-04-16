// app/api/generateWorkout/route.ts
import { NextResponse } from "next/server";
import https from "https";

export async function POST(req: Request) {
  const body = await req.json();

  const options = {
    method: "POST",
    hostname:
      "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
    path: "/generateWorkoutPlan?noqueue=1",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!, // secure key
      "x-rapidapi-host":
        "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve) => {
    const apiReq = https.request(options, function (apiRes) {
      const chunks: Uint8Array[] = [];

      apiRes.on("data", (chunk) => chunks.push(chunk));

      apiRes.on("end", () => {
        const responseBody = Buffer.concat(chunks).toString();
        resolve(NextResponse.json(JSON.parse(responseBody)));
      });
    });

    apiReq.on("error", (e) => {
      console.error("API request error:", e);
      resolve(
        NextResponse.json({ error: "API request failed" }, { status: 500 })
      );
    });

    apiReq.write(JSON.stringify(body));
    apiReq.end();
  });
}
