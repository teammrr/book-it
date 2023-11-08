interface BookingStatusProps {
  name: string | undefined;
}

const BookedUser: React.FC<BookingStatusProps> = ({ name }) => {
  return name !== undefined ? (
    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
      Booked by: {name}
    </p>
  ) : (
    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
      Nobody booked this time slot
    </p>
  );
};

export default BookedUser;