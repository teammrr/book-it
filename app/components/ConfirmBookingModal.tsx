import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast, ToastPosition } from "@chakra-ui/react";
import fetchBookings from "./FetchBookings";
import { set } from "mongoose";

export default function ConfirmBookingModal({
  roomId,
  startTime,
  endTime,
  date,
  description,
  roomName,
  onConfirm,
}: any) {
  let [isOpen, setIsOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const { data: session } = useSession({
    required: true,
  });
  function closeModal() {
    setIsOpen(false);
    setIsButtonClicked(false);
    onConfirm();
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

  function generateReservationId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 2; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    result += Math.floor(1000 + Math.random() * 9000).toString();
    return result;
  }

  function canCreateBooking(
    newBookingStart: string,
    newBookingEnd: string,
    bookings: any[]
  ) {
    // Sort bookings by start time
    bookings.sort((a, b) => a.startTime - b.startTime);
    // Find the last booking that ends before the new booking starts
    const lastBooking = bookings
      .reverse()
      .find((booking) => booking.endTime < newBookingStart);
    // Find the first booking that starts after the new booking ends
    const nextBooking = bookings.find(
      (booking) => booking.startTime > newBookingEnd
    );

    // If the new booking's start time is equal to or after the end time of the last booking
    // AND the new booking's end time is equal to or before the start time of the next booking
    // then the new booking does not overlap and can be created
    return (
      (!lastBooking || newBookingStart > lastBooking.endTime) &&
      (!nextBooking || newBookingEnd < nextBooking.startTime)
    );
  }

  function isTimeSlotAvailable(
    startUnix: string,
    endUnix: string,
    bookings: any[]
  ): boolean {
    if (!Array.isArray(bookings)) {
      console.error("bookings is not an array:", bookings);
      return false; // or false, depending on what makes sense in your application
    }
    for (let booking of bookings) {
      if (booking.roomId !== roomId) {
        continue;
      }
      if (startUnix < booking.endTime && endUnix > booking.startTime) {
        return false;
      }
    }
    return true;
  }

  async function openModal() {
    const startUnix = startToUnix({ startTime, date }).toString();
    const endUnix = endToUnix({ endTime, date }).toString();
    const bookingDetails = {
      resrvId: String(generateReservationId()),
      roomId: String(roomId),
      roomName: String(roomName),
      name: String(session?.user?.name),
      startTime: String(startUnix),
      endTime: String(endUnix),
      description: String(description),
    };

    if (!description) {
      setIsButtonClicked(false);
      toast({
        title: "Mhmmm!",
        description: "Description is required. Please try again",
        status: "warning",
        ...defaultToastProps,
      });
      return;
    }

    if (startUnix >= endUnix) {
      setIsButtonClicked(false);
      toast({
        title: "Invalid Time.",
        description: "Start time must be less than end time.",
        status: "warning",
        ...defaultToastProps,
      });
      return;
    }

    const bookings = await fetchBookings();

    if (!isTimeSlotAvailable(startUnix, endUnix, bookings)) {
      setIsButtonClicked(false);
      toast({
        title: "Whoops!",
        description: "This time slot has been reserved.",
        status: "error",
        ...defaultToastProps,
      });
      return;
    }
    if (canCreateBooking(startUnix, endUnix, bookings)) {
      // Proceed with booking

      try {
        await axios.post("/api/bookings", bookingDetails, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        setIsOpen(true);
      } catch (err) {
        console.error("Something went wrong. Please try again later.");
        toast({
          title: "Error",
          description: `Something went wrong, error: ${err}`,
          status: "error",
          ...defaultToastProps,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        ...defaultToastProps,
      });
    }
  }

  const handleButtonClicked = () => {
    setIsButtonClicked(true);
    openModal();
  };

  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={handleButtonClicked}
          disabled={isButtonClicked}
          className="flex rounded-lg border border-transparent bg-[#546A8C] px-4 py-2 text-sm font-medium text-slate-100 transition ease-in-out duration-200 hover:bg-[#3b4c63] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 shadow shadow-black/10 "
        >
          {isButtonClicked ? (
            <>
              <div className="h-5 w-5 mr-2 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
              Processing
            </>
          ) : (
            "Confirm Reservation"
          )}
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
                      Description: {description}
                    </p>
                    <div className="mt-2 flex flex-row justify-between ">
                      <p className="text-sm flex w-36 align-center   text-gray-500">
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
                      <p className="text-sm w-36 flex  align-center  text-gray-500">
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
                    <div className="mt-1">
                      <p className="text-sm w-36 flex  align-center  text-gray-500">
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
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                        </span>
                        {roomName}
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
