"use client";

import { SignUpProvider } from "./context/SignUpContext"; // adjust path as needed

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SignUpProvider>{children}</SignUpProvider>;
}
