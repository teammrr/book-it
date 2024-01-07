"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import RoomList from "./components/RoomsList";
import TodayBookings from "./components/TodayBookings";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const { scrollYProgress } = useScroll();
  const isDesktop = window.innerWidth > 800; // Adjust this value as needed

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [
      isDesktop ? "0%" : "0%",
      isDesktop ? "0%" : "0%",
      isDesktop ? "0%" : "-100%",
    ]
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
        Hello,{" "}
        {session?.user?.name
          ? session.user.name + " 👋"
          : "You are not logged in"}
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
