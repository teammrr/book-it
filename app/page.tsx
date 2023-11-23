"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import { useSession } from "next-auth/react";
import RoomList from "./components/RoomsList";
import { redirect } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import DarkModeButton from "./components/DarkMode";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    ["0%", "0%", "-100%"]
  );

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="bg-gray-50 dark:bg-slate-950 min-h-screen">
      <motion.header
        className="z-50"
        style={{
          position: "sticky",
          top: 0,
          y: headerY,
        }}
      >
        <Header />
      </motion.header>
      <h1 className="text-2xl font-medium text-gray-800 mt-8 mx-4 lg:mx-10 ">
        Hello, {session?.user?.name} 👋
      </h1>
      <div className="px-4 space-y-6 ">
        <div className="">
          <RoomList />
        </div>
      </div>
      <Footer />
    </main>
  );
}
