"use client";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import fetchBookings from "@/app/components/FetchBookings";
import Layout from "../../components/layout";
import ConfirmBookingModal from "@/app/components/ConfirmBookingModal";
import SelectStartTime from "@/app/components/SelectStartTime";
import SelectEndTime from "@/app/components/SelectEndTime";
import DescriptionBox from "@/app/components/DescriptionBox";
import AntDatepicker from "@/app/components/NewCalendar";
import AllBookings from "@/app/components/AllBookings";
import { useToast, ToastPosition } from "@chakra-ui/react";

function Booking({ params }: { params: { id: string; name: string } }) {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedEndTime, setSelectedEndTime] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [dateName, setDateName] = useState(" ");
  const [endDateUnix, setEndDateUnix] = useState("");
  const [usrDescription, setUsrDescription] = useState();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const {
    data: bookings,
    error,
    mutate,
  } = useSWR("/api/bookings", fetchBookings);
  if (!bookings) {
    return (
      <div>
        <Layout>
          <div className="flex items-center justify-center min-h-screen p-5  min-w-screen">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </Layout>
      </div>
    ); // or return null, or a loading spinner, etc.
  }
  if (error) return toast({ title: "An error occurred", status: "error" });

  const handleData = async () => {
    try {
      await mutate();
    } catch (err) {
      toast({
        title: "Error",
        description: `Something went wrong, error: ${err}`,
        status: "error",
        ...defaultToastProps,
      });
    }
  };

  // #TODO - Disable the time that is behind the current time
  // #TODO - Disable the time that is already booked
  // #TODO - Fix the size of the date start end time

  return (
    <>
      <main className="">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-2xl font-medium text-[#040506] mt-8 mx-4 lg:mx-10 ">
              {name}
            </h1>
          </div>

          <div className="mt-4 bg-[] rounded-lg  lg:mx-10 mx-2 pb-4 ">
            <div className="flex pb-2 pr-4 pl-4 gap-4">
              <div className="col col-span-1 mb-1">
                <p className="truncate mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  Date{" "}
                </p>
                <AntDatepicker
                  className="w-full h-12"
                  setSelectedDate={setSelectedDate}
                  setEndDateUnix={setEndDateUnix}
                  setDateName={setDateName}
                />
              </div>
              <div className="col col-span-1">
                <span className="truncate block text-sm font-medium text-gray-900 dark:text-white">
                  Start Time
                </span>
                <SelectStartTime
                  className="w-full h-12"
                  userStartTime={selectedStartTime}
                  setUserStartTime={setSelectedStartTime}
                />
              </div>
              <div className="col col-span-1">
                <span className="truncate block text-sm font-medium text-gray-900 dark:text-white">
                  End Time
                </span>
                <SelectEndTime
                  className="w-full h-12"
                  userEndTime={selectedEndTime}
                  setUserEndTime={setSelectedEndTime}
                />
              </div>
            </div>
            <div className="pb-2 pr-4 pl-4 gap-4">
              <div className="col col-span-1 mb-1">
                <DescriptionBox
                  required
                  setUserDescription={setUsrDescription}
                />
              </div>
            </div>
            <div className="flex justify-end pl-4 pr-4 pt-2">
              <ConfirmBookingModal
                startTime={selectedStartTime}
                endTime={selectedEndTime}
                date={dateName}
                description={usrDescription}
                roomId={params.id}
                roomName={name}
                onConfirm={handleData}
              />
            </div>
            <div className="flex pt-4 font-medium justify-between pl-4 pr-6">
              <p>
                Room Schedule :{" "}
                <span className="text-gray-700 text-sm">{dateName}</span>
              </p>
            </div>
            <div className="justify-center align-middle flex flex-col mr-2 ml-2">
              <AllBookings
                params={{
                  id: params.id,
                  startUnix: selectedDate,
                  endUnix: endDateUnix,
                }}
                bookings={bookings}
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}

export default Booking;
