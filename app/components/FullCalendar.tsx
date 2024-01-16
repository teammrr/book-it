import useSWR from "swr";
import fetchBookings from "./FetchBookings";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import { useToast, ToastPosition } from "@chakra-ui/react";

async function getBookings() {
  const response = await fetchBookings();
  return response;
}
function getTodoList(date: any) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "10:30 am", title: "Meeting" },
        { time: "12:00 pm", title: "Lunch" },
      ];
    case 16:
      return [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
        { time: "05:00 pm", title: "Product test and acceptance" },
        { time: "06:30 pm", title: "Reporting" },
        { time: "10:00 pm", title: "Going home to walk the dog" },
      ];
    default:
      return [];
  }
}

export default function FullCalendar() {
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const { data, error } = useSWR("/api/bookings", fetchBookings);
  if (error)
    return toast({
      title: "Error",
      description: "Error occured while getting bookings",
      status: "error",
      ...defaultToastProps,
    });
  if (!data)
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen p-5  min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    ); // or return null, or a loading spinner, etc.

  function renderCell(date: any) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }

  return (
    <div className="bg-white shadow-lg h-screen pt-2">
      <Calendar bordered renderCell={renderCell} />
    </div>
  );
}
