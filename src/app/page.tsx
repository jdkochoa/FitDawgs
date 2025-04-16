"use client";
import connectMongoDB from "@/lib/mongodb";

import dynamic from "next/dynamic";

const Splash = dynamic(() => import("./splash/page"));

export default function Home() {
  return <Splash />;
}
