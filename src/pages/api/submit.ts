import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../lib/mongodb";
import User from "../../Models/userInput";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectMongoDB();
    
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUserInput = new User({ name, email, message });
    await newUserInput.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit form" });
  }
}
