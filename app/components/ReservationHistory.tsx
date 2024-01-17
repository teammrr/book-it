import BookingsHistory from "@/app/components/BookingsHistory";

export function ReservationHistory() {
  return (
    <div className="flex lg:mx-4">
      <main className="max-sm:p-2 pr-6 pl-6 overflow-x-auto ">
        <div className="flex justify-between items-center mb-4"></div>
        <div>
          <BookingsHistory />
        </div>
      </main>
    </div>
  );
}
