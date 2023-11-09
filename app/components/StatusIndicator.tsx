interface BookingStatusProps {
  status: string;
  description?: string;
}

const StatusIndicator: React.FC<BookingStatusProps> = ({ status }) => {
  return status === "booked" ? (
    <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
      Unavailable
    </span>
  ) : (
    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
      Available
    </span>
  );
};

export default StatusIndicator;
