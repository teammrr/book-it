"use client";
import useSWR from "swr";
import fetchBookings from "./FetchBookings";
import { BeatLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { Table } from "flowbite-react";
import CancelReservation from "./CancelReservation";
import { Button } from "@chakra-ui/react";

function BookingsHistory() {
  const { data: session } = useSession({
    required: true,
  });
  const {
    data: allReservations,
    error,
    mutate,
  } = useSWR("/api/bookings", fetchBookings);

  // Filter the reservations to only include those that match the session name
  const reservations = allReservations?.filter(
    (booking: any) => booking.name === session?.user?.name
  );

  const mutateData = () => {
    mutate();
  };

  if (error) {
    console.log(error);
    return null; // Return null instead of console.log
  }

  if (!reservations) {
    return (
      <div className="flex w-screen pt-10 pb-8 justify-center items-center">
        <BeatLoader color="#3676d6" />
      </div>
    );
  }

  return (
    <>
      <div className="justify-center pb-2 overflow-x-auto align-middle flex flex-col">
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Room</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>description</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {reservations
              .sort((a: any, b: any) => b.startTime - a.startTime)
              .map((reservation: any) => {
                const startTime = new Date(reservation.startTime * 1000);
                const formattedStartTime = `${startTime
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${startTime
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`;

                const endTime = new Date(reservation.endTime * 1000);
                const formattedEndTime = isNaN(endTime.getTime())
                  ? "Invalid Date"
                  : endTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                const currentDate = new Date();
                // Check if the reservation has already ended
                const hasEnded = endTime < currentDate;
                return (
                  <Table.Row
                    key={reservation.resrvId}
                    className="bg-white  dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-zinc-900 dark:text-white">
                      {startTime.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-zinc-900 dark:text-white">
                      {reservation.roomName}
                    </Table.Cell>
                    <Table.Cell className=" p-0 truncate text-zinc-900 ">
                      {formattedStartTime} to {formattedEndTime}
                    </Table.Cell>
                    <Table.Cell className="text-zinc-900 text-ellipsis overflow-hidden">
                      {reservation.description}
                    </Table.Cell>
                    <Table.Cell className=" ">
                      {!hasEnded ? (
                        <CancelReservation
                          resrvId={reservation.resrvId}
                          size={"xs"}
                          onCancel={() => mutate()}
                        />
                      ) : (
                        <Button isDisabled size={"xs"} colorScheme="green">
                          Success
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default BookingsHistory;
