"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import { useSession } from "next-auth/react";
import RoomList from "./components/RoomsList";
import TodayBookings from "./components/TodayBookings";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { data: session, status } = useSession({
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

  // Define a state variable to track whether there are any bookings
  const [hasBookings, setHasBookings] = useState(true);

  // Define a callback function to update the state variable
  const handleBookingsChange = (bookings: any[]) => {
    setHasBookings(bookings.length > 0);
  };

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
      <h1 className="text-2xl font-semibold text-gray-800 mt-8 mx-4 lg:mx-10 ">
        Hello, {session?.user?.name} 👋
      </h1>
      <div>
        {hasBookings && ( // Conditionally render based on whether there are any bookings
          <div>
            <h1 className="text-xl font-medium text-gray-800 mt-4 mx-4 lg:mx-10 ">
              Upcoming reservation
            </h1>
            <TodayBookings onBookingsChange={handleBookingsChange} />{" "}
            {/* Pass the callback function as a prop */}
          </div>
        )}
      </div>
      <div className="px-4 space-y-4">
        <RoomList />
      </div>
      <Footer />
    </main>
  );
}
