import Image from "next/image";
import Link from "next/link";

interface RoomProps {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
  id: string;
}

export default function RoomCard(room: RoomProps) {
  return (
    <div key={room.name} className="flex flex-col justify-center p-2">
      <div className="max-w-lg rounded-lg bg-[#E1E7EE] shadow-lg transition ease-in-out duration-500 ">
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
          <p className="mb-2 text-base text-neutral-600 ">{room.description}</p>
          <ul className="text-black">
            <li>📍: {room.floor}</li>
            <li>🪑: {room.capacity}</li>
          </ul>
          <div className="justify-end items-end flex ">
            <Link
              href={{
                pathname: `/book/${room.id}`,
                query: { name: room.name },
              }}
              className="flex rounded-lg border border-transparent bg-[#546A8C] px-4 py-2 text-sm font-medium text-slate-100 transition ease-in-out duration-200 hover:bg-[#3b4c63] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 shadow shadow-black/10 "
            >
              📘 {room.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
