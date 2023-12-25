"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import { useSession } from "next-auth/react";
import RoomList from "./components/RoomsList";
import TodayBookings from "./components/TodayBookings";
import { redirect } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "./components/layout";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    ["0%", "0%", "-100%"]
  );

  return (
    <main className="bg-[#ECEFF4] dark:bg-slate-950 min-h-screen">
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
      <h1 className="text-2xl font-semibold text-gray-800 mt-6 mx-4 lg:mx-10 ">
        Hello, {session?.user?.name} 👋
      </h1>
      <div>
        <TodayBookings /> {/* Pass the callback function as a prop */}
      </div>
      <div className=" px-3 ">
        <RoomList />
      </div>
      <Footer />
    </main>
  );
}
