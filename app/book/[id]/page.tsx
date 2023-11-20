"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import ConfirmBookingModal from "@/app/components/ConfirmBookingModal";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import GetBookings from "@/app/components/AvailableBookings";
import SelectStartTime from "@/app/components/SelectStartTime";
import SelectEndTime from "@/app/components/SelectEndTime";
import ShowBookingModal from "@/app/components/ShowBookingModal";
import Calendar from "@/app/components/Calendar";
import DescriptionBox from "@/app/components/DescriptionBox";

function Booking({ params }: { params: { id: string; name: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedEndTime, setSelectedEndTime] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [endDateUnix, setEndDateUnix] = useState("");
  const [usrDescription, setUsrDescription] = useState();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const today = new Date();
  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));
  const startUnix = Math.floor(start.getTime() / 1000);
  const endUnix = Math.floor(end.getTime() / 1000);
  // console.log(`start ${startUnix} , end ${endUnix}`);
  console.log(`date: ${selectedDate}, end: ${endDateUnix}`);

  return (
    <>
      <main className="bg-gray-50">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-4">
              {name}
            </h1>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              // theme="colored"
            />
          </div>
          {isLoading ? ( // Render a loading spinner if isLoading is true
            <div className="flex justify-center items-center min-h-screen">
              <PropagateLoader color="#3676d6" />
            </div>
          ) : (
            <div className="mt-4 rounded-lg shadow shadow-black/10 ml-2 mr-2 pt-3 pb-4 ">
              <div className="flex pb-2 pr-4 pl-4 gap-4">
                <div className="col col-span-1 mb-1">
                  <p className="truncate mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                    Date{" "}
                  </p>
                  <Calendar
                    setSelectedDate={setSelectedDate}
                    setEndDateUnix={setEndDateUnix}
                  />
                </div>
                <div className="col col-span-1">
                  <span className="truncate block text-sm font-medium text-gray-900 dark:text-white">
                    Start Time
                  </span>
                  <SelectStartTime
                    userStartTime={selectedStartTime}
                    setUserStartTime={setSelectedStartTime}
                  />
                </div>
                <div className="col col-span-1">
                  <span className="truncate block text-sm font-medium text-gray-900 dark:text-white">
                    End Time
                  </span>
                  <SelectEndTime
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
              <div className="flex justify-between z-50 pl-4 pr-4 pt-2">
                <ShowBookingModal
                  params={{
                    id: params.id,
                    startUnix: selectedDate,
                    endUnix: endDateUnix,
                  }}
                />
                <ConfirmBookingModal
                  startTime={selectedStartTime}
                  endTime={selectedEndTime}
                  date={selectedDate}
                  description={usrDescription}
                  roomId={params.id}
                />
              </div>
              <div className="flex pt-4 font-medium justify-between pl-4 pr-6">
                <p>
                  Room Schedule :{" "}
                  <span className="text-gray-700 text-sm">{selectedDate}</span>
                </p>
              </div>
              <div className="justify-center align-middle flex flex-col gap-2 mr-2 ml-2">
                <GetBookings
                  params={{
                    id: params.id,
                    startUnix: selectedDate,
                    endUnix: endDateUnix,
                  }}
                />
              </div>
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Booking;
