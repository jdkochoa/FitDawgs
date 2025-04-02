import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch exercises" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
