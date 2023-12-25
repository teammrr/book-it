import { Table } from "flowbite-react";

export default function BookingStatusHistory(Bookings: any) {
  const roomName = Bookings.roomName;
  const resrvId = Bookings.resrvId;
  const description = Bookings.description;
  const startTime = new Date(Bookings.startTime * 1000);
  const formattedStartTime = `${startTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`;

  const endTime = new Date(Bookings.endTime * 1000);
  const formattedEndTime = `${endTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;

  return (
    <>
      <div className="shadow-sm overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>{startTime.toDateString()}</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>description</Table.HeadCell>
            {/* <Table.HeadCell>Reservation ID</Table.HeadCell> */}

            {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-zinc-900 dark:text-white">
                {roomName}
              </Table.Cell>
              <Table.Cell className=" p-0 truncate text-zinc-900 ">
                {formattedStartTime} to {formattedEndTime}
              </Table.Cell>
              <Table.Cell className="text-zinc-900 ">{description}</Table.Cell>
              {/* <Table.Cell>{resrvId}</Table.Cell> */}
              {/* <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Cancel
                </a>
              </Table.Cell> */}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
