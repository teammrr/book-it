import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

interface Rooms {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRooms() {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = axios.get("api/rooms", { headers });
    const data = (await res).data;
    console.log(data);
    setRooms(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getRooms();
  }, []); // Pass an empty dependency array here

  return (
    <div>
      {isLoading ? ( // Render a loading spinner if isLoading is true
        <div role="status" className="text-center pt-64">
          <Image
            src="/Magnify.svg"
            alt="Loading..."
            width={190}
            height={190}
            className="mx-auto"
          />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="items-center flex justify-center">
          <div className="pt-10 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4  ">
            {rooms.map((room) => (
              <div
                key={room.name}
                className="flex flex-col justify-center pb-5  "
              >
                <div className="max-w-lg rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition ease-in-out ß duration-500 ">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <Image
                      className="rounded-t-lg transition ease-in-out hover:opacity-90 duration-500"
                      height={500}
                      width={600}
                      objectFit="cover"
                      src={room.picture}
                      alt=""
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                      {room.name}
                    </h5>
                    <p className="mb-2 text-base text-neutral-600 ">
                      {room.description}
                    </p>
                    <ul className="text-black">
                      <li>Floor {room.floor}</li>
                      <li>Capacity: {room.capacity}</li>
                    </ul>
                    <div className="justify-end items-end flex ">
                      <Link
                        href={{
                          pathname: `/book/${room.name}`,
                          query: { name: room.name },
                        }}
                        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 transition ease-in-out duration-300  hover:text-blue-600 text-blue-500 rounded-lg text-sm"
                      >
                        Book {room.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
