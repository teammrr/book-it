"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
type AuthProviderProps = {
  children?: React.ReactNode;
  session: Session | null;
};
const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default AuthProvider;
