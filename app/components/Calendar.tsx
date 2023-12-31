import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { useState, useEffect } from "react";

export default function Calendar({
  setSelectedDate,
  setEndDateUnix,
  setDateName,
}: any) {
  const today = new Date();
  const minimumDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  }; // Setting minimum date to current day only

  const maximumDate = new Date();
  maximumDate.setDate(today.getDate() + 7); // Add 7 days to current date

  const maximumDateObject = {
    year: maximumDate.getFullYear(),
    month: maximumDate.getMonth() + 1,
    day: maximumDate.getDate(),
  }; // Allows user to only book up to 7 days in advance

  const [selectedDay, setSelectedDay] = useState<DayValue>(minimumDate);
  const formattedDate = selectedDay
    ? `${String(selectedDay.day).padStart(2, "0")}/${String(
        selectedDay.month
      ).padStart(2, "0")}/${String(selectedDay.year).slice(-2)}`
    : "";

  useEffect(() => {
    if (selectedDay) {
      const date = new Date(
        selectedDay.year,
        selectedDay.month - 1,
        selectedDay.day
      );
      const startUnixTimestamp = Math.floor(date.getTime() / 1000);
      const endUnixTimestamp = startUnixTimestamp + 86400;
      setSelectedDate(startUnixTimestamp);
      setEndDateUnix(endUnixTimestamp);
      setDateName(formattedDate);
    }
  }, [
    selectedDay,
    setSelectedDate,
    setEndDateUnix,
    formattedDate,
    setDateName,
  ]);

  const renderCustomInput = ({ ref }: any) => (
    <div className="z-4">
      <input
        readOnly
        ref={ref} // necessary
        placeholder="Choose date here"
        value={formattedDate}
        className="h-9 w-24 text-gray-900 text-sm text-center rounded-lg bg-white shadow-md  sm:text-sm"
      />
    </div>
  );

  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      minimumDate={minimumDate}
      maximumDate={maximumDateObject}
      inputPlaceholder="Select a day"
      colorPrimary="#3D4C83" // added this
      colorPrimaryLight="rgba(200, 220, 250, 0.4)" // and this
      renderInput={renderCustomInput} // render a custom input
      shouldHighlightWeekends
    />
  );
}
