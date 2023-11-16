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
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  function closeModal() {
    setIsOpen(false);
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

  function isTimeSlotAvailable(startUnix: string, bookings: any[]): boolean {
    for (let booking of bookings) {
      if (startUnix >= booking.startTime && startUnix <= booking.endTime) {
        toast.error(
          "This time is not available. Please try selecting different time period."
        );
        return false;
      }
    }
    return true;
  }

  async function openModal() {
    const startUnix = startToUnix({ startTime, date }).toString();
    const endUnix = endToUnix({ endTime, date }).toString();
    const res = await axios.get(`/api/bookings/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const bookings = res.data;

    const bookingDetails = {
      roomId: String(roomId),
      name: String(session?.user?.name),
      startTime: String(startUnix),
      endTime: String(endUnix),
      description: String(description),
    };
    if (isTimeSlotAvailable(startUnix, bookings)) {
      // Proceed with booking
      const response = await axios.post("/api/bookings", bookingDetails);
      console.log("Booking confirmed:", response.data);
      setIsOpen(true);
    } else {
      // Show an error message to the user
      console.error(
        "Error:",
        Error("Booking times overlap with an existing booking.")
      );
    }
    // try {
    //   console.log("checking overlap");
    //   // await checkOverlap(bookingDetails);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="justify-center rounded-lg border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your room has been successfully reserved. We&apos;ll
                      notify you when your room is ready.
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-500">
                      Reservation Details:
                    </p>
                    <p className="text-sm text-gray-500">
                      From {startTime} to {endTime} on {date}
                    </p>
                    <p className="text-sm text-gray-500">
                      Description: {description}
                    </p>
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
