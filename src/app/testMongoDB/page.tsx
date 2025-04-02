"use client"; // Only needed if you're using Next.js App Router (app directory)

import { useState } from "react";
import Link from "next/link";

export default function Form() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="border p-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2" />
        <textarea name="message" placeholder="Your message" onChange={handleChange} required className="border p-2" />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2">
          {loading ? "Submitting..." : "Submit"}
        </button>
        {response && <p>{response}</p>}
      </form>

      <Link href="/" className="flex flex-col gap-3 max-w-md mx-auto">
        <button className="bg-blue-500 text-white p-2 mt-3">Go Home</button>
      </Link>
    </div>
  );
}