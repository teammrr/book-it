import axios from "axios";
import RoomCard from "./PropComponent/RoomCard";
import { Skeleton, Stack } from "@chakra-ui/react";
import useSwr from "swr";
import { useToast, ToastPosition } from "@chakra-ui/react";
import RoomCardSkeleton from "./skeleton/RoomCard";

interface Rooms {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
  id: string;
}

export default function RoomList() {
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSwr("/api/rooms", fetcher);

  if (isLoading)
    return (
      <div className="items-center justify-center">
        <div className=" grid grid-flow-row md:gap-8 pt-2 gap-6  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
        </div>
      </div>
    );
  if (error)
    return toast({
      title: "Whoops!",
      description: "Something went wrong. Please try again later.",
      status: "error",
      ...defaultToastProps,
    });

  return (
    <div className="items-center flex justify-center">
      <div className=" grid grid-flow-row md:gap-8 pt-2  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((room: Rooms) => (
          <RoomCard
            key={room.name}
            name={room.name}
            description={room.description}
            floor={room.floor}
            capacity={room.capacity}
            picture={room.picture}
            id={room.id}
          />
        ))}
      </div>
    </div>
  );
}
