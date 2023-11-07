import Layout from "../../components/layout";
import Image from "next/image";
import BookingStatus from "@/app/components/BookingStatus";

async function getBooking(id: string) {
  const headers = {
    "Content-Type": "application/json",
  };
  const res = await fetch(`api/bookings/${id}`, { headers });
  const data = await res.json();
  return data;
}

export default function Booking({ params }: { params: { id: string } }) {
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <Layout>
          <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-5">
            You are booking {params.id}
          </h1>
          <div className="mt-4 border justify-center align-middle flex">
            <ul
              role="list"
              className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      height={32}
                      width={32}
                      className="w-8 h-8 rounded-full"
                      src="/img/logo-black.png"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                      16:00 - 17:00
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Booked by: Kantaphon Thangthong
                    </p>
                  </div>
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Available
                  </span>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      height={32}
                      width={32}
                      className="w-8 h-8 rounded-full"
                      src="/img/logo-color.png"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                      17:00 - 18:00
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Booked by: Navee Napraporn
                    </p>
                  </div>
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                    Unavailable
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </Layout>
      </main>
    </>
  );
}
