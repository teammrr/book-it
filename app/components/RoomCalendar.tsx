import useSWR from "swr";
import fetchBookings from "./FetchBookings";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Tooltip } from "antd";

// https://fullcalendar.io/docs/date-clicking-selecting-resource-demo
// Create a new event when clicking on a date/time slot

export default function RoomCalendar() {
  const { data, error } = useSWR("/api/bookings", fetchBookings);
  const events = data?.map((item: any) => {
    return {
      title: item.description + " - " + item.name,
      start: new Date(item.startTime * 1000), // Convert Unix timestamp to JavaScript Date
      end: new Date(item.endTime * 1000), // Convert Unix timestamp to JavaScript Date
      resourceId: item.roomId,
    };
  });

  if (error) return <div>Failed to load calendar</div>;
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
    );

  function renderEventContent(eventInfo: any) {
    const startTime = eventInfo.event.start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const endTime = eventInfo.event.end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return (
      <>
        <Tooltip title={`${startTime} - ${endTime} : ${eventInfo.event.title}`}>
          <div className="text-xs truncate">{eventInfo.event.title}</div>
        </Tooltip>
      </>
    );
  }

  return (
    <FullCalendar
      plugins={[interactionPlugin, resourceTimelinePlugin]}
      initialView="resourceTimelineDay"
      eventColor="#1b4c82"
      slotDuration={"01:00:00"}
      slotMinTime={"09:00:00"}
      slotMaxTime={"19:00:00"}
      nowIndicator={true}
      editable={false}
      events={events}
      eventContent={renderEventContent}
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      resourceAreaColumns={[
        {
          group: true,
          field: "floor",
          headerContent: "Floor",
        },
        {
          field: "title",
          headerContent: "Room",
        },
        {
          field: "occupancy",
          headerContent: "Occupancy",
        },
      ]}
      initialResources={[
        { id: "1", floor: "9A", title: "Multipurpose 1", occupancy: "4" },
        { id: "2", floor: "9A", title: "Multipurpose 2", occupancy: "10" },
        { id: "3", floor: "9", title: "Counseling Room 1", occupancy: "2" },
        { id: "4", floor: "9", title: "Counseling Room 2", occupancy: "2" },
        { id: "5", floor: "9", title: "Room 11-12", occupancy: "20" },
        { id: "5", floor: "9", title: "Room 8-10", occupancy: "20" },
        { id: "6", floor: "9A", title: "Room 8-9", occupancy: "20" },
        { id: "7", floor: "9A", title: "Room 10", occupancy: "20" },
        { id: "8", floor: "9A", title: "Room 2", occupancy: "20" },
        { id: "9", floor: "9A", title: "Room 3", occupancy: "20" },
        { id: "10", floor: "8", title: "Auditorium 2", occupancy: "20" },
        { id: "11", floor: "8", title: "Room 1", occupancy: "20" },
        { id: "12", floor: "8", title: "Room 2", occupancy: "20" },
        { id: "13", floor: "8", title: "Room 3", occupancy: "20" },
        { id: "14", floor: "11", title: "Big Room", occupancy: "20" },
        { id: "15", floor: "11", title: "Auditorium 1", occupancy: "20" },
      ]}
    />
  );
}
