"use client";
import FullCalendar from "../components/FullCalendar";
import Layout from "../components/layout";
import RoomCalendar from "../components/RoomCalendar";

export default function Page() {
  return (
    <Layout>
      {/* <FullCalendar /> */}
      <div className="pt-6 pl-4 pr-4">
        <RoomCalendar />
      </div>
      {/* <h1>asdas</h1> */}
    </Layout>
  );
}
