"use client";

import dynamic from "next/dynamic";

const Splash = dynamic(() => import("./splash/page"));

export default function Home() {
  return <Splash />;
}