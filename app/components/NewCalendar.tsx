import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function AntDatepicker({
  setSelectedDate,
  setEndDateUnix,
  setDateName,
}: any) {
  const dateFormat = "DD/MM/YY";
  const [selectedDay, setSelectedDay] = useState(dayjs().format(dateFormat));

  useEffect(() => {
    const selectedDate = dayjs(selectedDay, dateFormat);
    const startOfDay = selectedDate.startOf("day").unix();
    const endOfDay = selectedDate.endOf("day").unix();
    // Update values in parent component
    setSelectedDate(startOfDay);
    setEndDateUnix(endOfDay);
    setDateName(selectedDay);
  }, [selectedDay, setSelectedDate, setEndDateUnix, setDateName, dateFormat]);

  function onChange(date: any, dateString: string) {
    if (date) {
      setSelectedDay(dateString);
    }
  }

  return (
    <DatePicker
      className="h-9 w-24 text-gray-900 text-sm text-center border border-transparent rounded-lg bg-white shadow-sm "
      style={{ width: "100px" }}
      onChange={onChange}
      defaultValue={dayjs()}
      format={dateFormat}
      disabledDate={(current) => {
        // Disable dates that are less than today or more than 14 days from today
        const today = dayjs().startOf("day");
        const twoWeeksFromNow = dayjs().add(14, "day").endOf("day");
        return current && (current < today || current > twoWeeksFromNow);
      }}
    />
  );
}
