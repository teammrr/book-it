interface BookingStatusProps {
  name: string | undefined;
  description: string | undefined;
}

const BookedUser: React.FC<BookingStatusProps> = ({ name, description }) => {
  return name !== undefined ? (
    <p className="text-sm text-[#546C8C] dark:text-gray-400">
      {description}
      <br />
      By: {name}
    </p>
  ) : (
    <p className="text-sm text-[#546C8C]  dark:text-gray-400"></p>
  );
};

export default BookedUser;
