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
      <div className="max-w-lg rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition ease-in-out hover:scale-105  duration-500 ">
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
          <div className="flex justify-end ">
            <button
              type="button"
              className="px-3 py-2 relative mt-2 rounded group overflow-hidden font-medium bg-blue-50 text-blue-600"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-600 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white">
                Reserve this room
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
