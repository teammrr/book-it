"use client";
import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
// import { navigation, classNames } from "./page";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <h1>Please Login To Proceed</h1>
    </main>
  );
}
