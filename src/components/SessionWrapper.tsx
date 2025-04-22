// src/components/SessionWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

interface SessionWrapperProps {
  children: ReactNode;
  session: Session | null | undefined;
}

export default function SessionWrapper({
  children,
  session,
}: SessionWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
