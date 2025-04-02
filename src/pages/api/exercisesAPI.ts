import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0", {
    method: "GET",
    headers: {
      "x-rapidapi-key": 'bdeda5672cmshfb88324abac5ff4p1d0db2jsnaba3ac39865d',
      "x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch exercises" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
