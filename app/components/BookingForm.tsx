// components/BookingForm.tsx

import { useState, useEffect } from "react";

const BookingForm: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission here
    const reservationData = {
      date,
      time: time.split("-")[0],
      room,
      // Add other user-related data like name and email here
    };

    // Send a POST request to your API route to save the reservation to MongoDB
    const response = await fetch("/api/reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Reservation created:", data);
      // You can display a confirmation message to the user here
    } else {
      console.error("Reservation creation failed");
      // Handle error and display an error message to the user
    }
  };

  useEffect(() => {
    // Fetch available room and time slot data from your database
    // You can populate these values in your room and time slot dropdowns
  }, []);

  return (
    <div className="space-y-2 mt-4 text-black mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="text-xl font-medium ">Book a Meeting Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <div>
            <label className="text-lg" htmlFor="date">
              Date:{" "}
            </label>
            <input
              type="date"
              id="date"
              className="bg-grey-100 border-2 p-1 rounded-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-lg" htmlFor="time">
              Time:{" "}
            </label>
            <select
              id="time"
              value={time}
              className="bg-grey-100 border-2 p-1 rounded-lg"
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option disabled value="">
                Select a time slot
              </option>
              {/* Populate the options dynamically */}
            </select>
          </div>
          <div>
            <label className="text-lg" htmlFor="room">
              Room:{" "}
            </label>
            <select
              id="room"
              value={room}
              className="bg-grey-100 border-2 p-1 rounded-lg"
              onChange={(e) => setRoom(e.target.value)}
              required
            >
              <option disabled value="">
                Select a room
              </option>
              {/* Add a default room option */}
              <option value="Room A">Room A</option>{" "}
              <option value="Room B">Room B</option>
              <option value="Room C">Room C</option>
              {/* Populate the options dynamically */}
            </select>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg mt-2"
          type="submit"
        >
          Book Room
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
