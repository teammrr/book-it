import React, { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  Button,
  ButtonGroup,
  extendTheme,
} from "@chakra-ui/react";

interface BookingProps {
  roomName: string;
  description: string;
  startTime: number;
  endTime: number;
  isOpen: boolean;
  status: string;
  onOpen: () => void;
  onClose: () => void;
}

export default function UpcomingRsrvModal({
  roomName,
  description,
  startTime,
  endTime,
  isOpen,
  onOpen,
  onClose,
  status,
}: BookingProps) {
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const formattedStartTime = new Date(startTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedEndTime = new Date(endTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <Popover
        initialFocusRef={initialFocusRef}
        placement="bottom"
        closeOnBlur={false}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button size={"sm"} colorScheme={status}>
            {formattedStartTime} to {formattedEndTime}
          </Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            {roomName}
          </PopoverHeader>
          <PopoverArrow bg="blue.800" />
          <PopoverCloseButton />
          <PopoverBody>{description}</PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <ButtonGroup size="sm">
              <Button colorScheme="blue">Edit</Button>
              <Button colorScheme="red" ref={initialFocusRef}>
                Cancel Reservation
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
