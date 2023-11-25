"use client";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import ConfirmBookingModal from "@/app/components/ConfirmBookingModal";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import GetBookings from "@/app/components/AvailableBookings";
import SelectStartTime from "@/app/components/SelectStartTime";
import SelectEndTime from "@/app/components/SelectEndTime";
import ShowBookingModal from "@/app/components/ShowBookingModal";
import DescriptionBox from "@/app/components/DescriptionBox";
import AntDatepicker from "@/app/components/NewCalendar";
import Calendar from "@/app/components/Calendar";
import ListBookings from "@/app/components/UsersBookings";

function Booking({ params }: { params: { id: string; name: string } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedEndTime, setSelectedEndTime] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [dateName, setDateName] = useState("");
  const [endDateUnix, setEndDateUnix] = useState("");
  const [usrDescription, setUsrDescription] = useState();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      <main className="bg-gray-50">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-2xl font-medium text-gray-800 mt-8 mx-4 lg:mx-10 ">
              {name}
            </h1>
            <ToastContainer
              position="top-right"
              autoClose={3000}
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
            <div className="mt-4 rounded-lg shadow shadow-black/10 lg:mx-10 mx-2 pt-3 pb-4 ">
              <div className="flex pb-2 pr-4 pl-4 gap-4">
                <div className="col col-span-1 mb-1">
                  <p className="truncate mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                    Date{" "}
                  </p>
                  {/* <Calendar
                    setSelectedDate={setSelectedDate}
                    setEndDateUnix={setEndDateUnix}
                    setDateName={setDateName}
                  /> */}
                  <AntDatepicker
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
              <div className="flex justify-end pl-4 pr-4 pt-2">
                {/* <ShowBookingModal
                  params={{
                    id: params.id,
                    startUnix: selectedDate,
                    endUnix: endDateUnix,
                  }}
                /> */}
                <ConfirmBookingModal
                  startTime={selectedStartTime}
                  endTime={selectedEndTime}
                  date={dateName}
                  description={usrDescription}
                  roomId={params.id}
                />
              </div>
              <div className="flex pt-4 font-medium justify-between pl-4 pr-6">
                <p>
                  Room Schedule :{" "}
                  <span className="text-gray-700 text-sm">{dateName}</span>
                </p>
              </div>
              <div className="justify-center align-middle flex flex-col mr-2 ml-2">
                <GetBookings
                  params={{
                    id: params.id,
                    startUnix: selectedDate,
                    endUnix: endDateUnix,
                  }}
                />
                <ListBookings
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
