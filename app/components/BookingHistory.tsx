import axios from "axios";
import { useSession } from "next-auth/react";
import { Table } from "flowbite-react";
import { Button, useToast, ToastPosition, Tag } from "@chakra-ui/react";
import CancelReservation from "./CancelReservation";

export default function BookingStatusHistory({
  reservation,
  mutateData,
}: {
  reservation: any;
  mutateData: () => void;
}) {
  const { data: session } = useSession({
    required: true,
  });
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const startTime = new Date(reservation.startTime * 1000);
  const formattedStartTime = `${startTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`;

  const endTime = new Date(reservation.endTime * 1000);
  const formattedEndTime = `${endTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;

  const currentDate = new Date();
  // Check if the reservation has already ended
  const hasEnded = endTime < currentDate;

  function mutateRsrv() {
    mutateData();
  }

  async function handleCancel(resrvId: any) {
    const cancelDetails = {
      name: session?.user?.name,
      resrvId: resrvId,
    };
    try {
      await axios.delete("/api/bookings", {
        data: cancelDetails,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      toast({
        title: "Reservation Canceled",
        description: "Your reservation has been cancelled",
        status: "success",
        ...defaultToastProps,
      });
      // After canceling, mutate the reservations data
      mutateData();
    } catch (err) {
      toast({
        title: "Error",
        description: `Something went wrong, error: ${err}`,
        status: "error",
        ...defaultToastProps,
      });
    }
  }

  return (
    <>
      <div className="shadow-sm overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>{startTime.toDateString()}</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>description</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white  dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-zinc-900 dark:text-white">
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
                    onCancel={() => mutateRsrv()}
                  />
                ) : (
                  // <Button
                  //   size={"xs"}
                  //   colorScheme="red"
                  //   onClick={() => handleCancel(reservation.resrvId)}
                  // >
                  //   Cancel
                  // </Button>
                  <Button isDisabled size={"xs"} colorScheme="red">
                    Cancel Reservation
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
