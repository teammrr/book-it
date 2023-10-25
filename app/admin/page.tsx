"use client";

import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import RoomList from "./RoomListAdmin";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data);
  };

  const deleteRoom = async (id: string) => {
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    fetchRooms();
    toast.success("Room deleted");
  };

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }
  return (
    <main className="bg-gray-50 min-h-screen">
      <Layout>
        <h1 className="text-2xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 ">
          Welcome to admin page {session?.user?.name}
        </h1>
        <div className="pt-4">
          <RoomList rooms={rooms} deleteRoom={deleteRoom} />
        </div>
        <ToastContainer />
      </Layout>
    </main>
  );
}
