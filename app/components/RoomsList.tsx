import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import room from "@/models/room";

interface Room {
  id: number;
  picture: string;
  roomName: string;
  description: string;
  roomFloor: number;
  roomCapacity: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  async function getRooms() {
    const localUrl = "http://127.0.0.1:3000/api/rooms";
    const prodUrl = "https://bookit.teamrr.live/api/rooms";
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("fetching");
    const res = axios.get(prodUrl, { headers });
    const data = (await res).data;
    console.log(data);
    setRooms(data);
  }

  useEffect(() => {
    getRooms();
  }, []); // Pass an empty dependency array here

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id} className="flex flex-col justify-center pb-5 ">
          <div className="max-w-lg rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition ease-in-out hover:scale-105  duration-500 ">
            <div
              className="relative overflow-hidden bg-cover bg-no-repeat"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <Image
                className="rounded-t-lg"
                height={500}
                width={600}
                objectFit="cover"
                src={room.picture}
                alt=""
              />
              <a href={`/rooms/${room.id}`}>
                <div className=" bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                {room.roomName}
              </h5>
              <p className="mb-2 text-base text-neutral-600 ">
                {room.description}
              </p>
              <ul className="text-black">
                <li>Floor {room.roomFloor}</li>
                <li>Seats: {room.roomCapacity}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
