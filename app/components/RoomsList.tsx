import Image from "next/image";

export default function RoomList({
  picture,
  title,
  description,
  floor,
  seats,
}: any) {
  return (
    <div className="flex flex-col justify-center pb-5 ">
      <div className="max-w-lg rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <Image
            className="rounded-t-lg"
            //   layout="fill"
            height={500}
            width={600}
            objectFit="cover"
            src={picture}
            alt=""
          />
          <a href="/rooms/:id">
            <div className=" bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
            {title}
          </h5>
          <p className="mb-2 text-base text-neutral-600 ">{description}</p>
          <ul className="text-black">
            <li>Floor {floor}</li>
            <li>Seats: {seats}</li>
          </ul>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg mt-2"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Reserve this room
          </button>
        </div>
      </div>
    </div>
  );
}
