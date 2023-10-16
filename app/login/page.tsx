"use client";

import React from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
          <h2 className="font-bold text-2xl text-[#002D74] text-center">
            Welcome Back
          </h2>
          <button
            onClick={() => signIn("google")}
            className="bg-white px-2 py-2 mt-5 border w-full rounded-xl 
          flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            <Image
              src="/img/google-logo.png"
              width={30}
              height={30}
              alt="Google Logo"
            />
            <span className="px-2">Sign In With Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}
