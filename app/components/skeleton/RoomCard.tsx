import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function RoomCardSkeleton() {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-lg rounded-lg bg-[#E1E7EE] shadow-lg transition ease-in-out duration-500 ">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <Skeleton />
        </div>
        <div className="p-6">
          <Skeleton height="150px" />
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 "></h5>
          <ul className="text-black">
            <li>
              <SkeletonText
                mt="4"
                noOfLines={1}
                spacing="4"
                skeletonHeight="2"
              />
            </li>
            <li>
              <SkeletonText
                mt="4"
                noOfLines={1}
                spacing="4"
                skeletonHeight="2"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
