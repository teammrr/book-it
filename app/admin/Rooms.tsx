import axios from "axios";

interface Room {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
  id: string;
}
type RoomProps = {
  room: Room;
  deleteRoom: (id: string) => void;
};

export default function Room({ room, deleteRoom }: RoomProps) {
  const handleDelete = () => {
    axios
      .delete(`/rooms/${room.id}`)
      .then(() => {
        deleteRoom(room.id.toString());
      })
      .catch((error) => {
        console.error("An error occurred while deleting the room:", error);
      });
  };

  return (
    <div className="bg-white flex shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 f sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {room.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          <dt className="text-sm font-medium text-gray-500">Floor</dt>
          <dd className="mt-1 text-sm text-gray-900">{room.floor}</dd>
          <dt className="text-sm font-medium text-gray-500">Capacity</dt>
          <dd className="mt-1 text-sm text-gray-900">{room.capacity}</dd>
        </p>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
