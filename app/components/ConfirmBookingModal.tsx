import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConfirmBookingModal({
  roomId,
  startTime,
  endTime,
  date,
  description,
}: any) {
  let [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession({
    required: true,
  });
  function closeModal() {
    setIsOpen(false);
    location.reload();
  }

  function startToUnix({ startTime, date }: any) {
    // Convert date from DD/MM/YY to MM/DD/YYYY
    const [day, month, year] = date.split("/");
    const formattedDate = `${month}/${day}/20${year}`;

    // Append :00 to startTime to make it HH:MM:SS
    const formattedTime = `${startTime}:00`;

    const dateTime = new Date(`${formattedDate} ${formattedTime}`);
    const unixTime = Math.floor(dateTime.getTime() / 1000);
    return unixTime;
  }

  function endToUnix({ endTime, date }: any) {
    // Convert date from DD/MM/YY to MM/DD/YYYY
    const [day, month, year] = date.split("/");
    const formattedDate = `${month}/${day}/20${year}`;

    // Append :00 to startTime to make it HH:MM:SS
    const formattedTime = `${endTime}:00`;

    const dateTime = new Date(`${formattedDate} ${formattedTime}`);
    const unixTime = Math.floor(dateTime.getTime() / 1000);
    return unixTime;
  }

  function isTimeSlotAvailable(
    startUnix: string,
    endUnix: string,
    bookings: any[]
  ): boolean {
    console.log(startUnix, endUnix);
    if (!Array.isArray(bookings)) {
      console.error("bookings is not an array:", bookings);
      return false; // or false, depending on what makes sense in your application
    }
    for (let booking of bookings) {
      if (booking.roomId !== roomId) {
        continue;
      }
      if (startUnix <= booking.endTime && endUnix > booking.startTime) {
        console.log("Time slot is not available");
        return false;
      }
    }
    return true;
  }

  const [bookings, setBookings] = useState([]);
  async function openModal() {
    const startUnix = startToUnix({ startTime, date }).toString();
    const endUnix = endToUnix({ endTime, date }).toString();
    const bookingDetails = {
      roomId: String(roomId),
      name: String(session?.user?.name),
      startTime: String(startUnix),
      endTime: String(endUnix),
      description: String(description),
    };

    try {
      if (startUnix >= endUnix) {
        toast.error("Start time must be less than end time");
        return;
      }
      const res = await axios.get(`/api/bookings/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }

    if (isTimeSlotAvailable(startUnix, endUnix, bookings)) {
      // Proceed with booking
      try {
        await axios.post("/api/bookings", bookingDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsOpen(true);
      } catch (err) {
        toast.error("Something went wrong. Please try again later.");
      }
    } else {
      // Show an error message to the user
      toast.error(
        "Reservation time overlaps with another booking. Please try selecting different time period."
      );
    }
  }

  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={openModal}
          className="flex rounded-lg border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Confirm Reservation
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Reservation successful
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-sm text-gray-500">
                      Your room has been successfully reserved.
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-500">
                      Reservation For: {description}
                    </p>
                    <div className="mt-2  flex justify-between align-center items-center">
                      <p className="text-sm flex w-32 align-center   text-gray-500">
                        <span className=" align-center border border-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        {startTime} to {endTime}
                      </p>
                      <p className="text-sm w-32 flex  align-center  text-gray-500">
                        <span className=" align-center border border-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                        </span>
                        {date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
