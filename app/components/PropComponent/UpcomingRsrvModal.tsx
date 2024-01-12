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
} from "@chakra-ui/react";
import CancelReservation from "../CancelReservation";

interface BookingProps {
  roomName: string;
  description: string;
  startTime: number;
  endTime: number;
  resrvId: string;
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
  resrvId,
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

  //TODO Create a function to edit the reservation details
  //TODO Create a function to cancel the reservation
  // TODO Create a function to send a reminder line message to the user

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
            justifyContent="flex-end"
            pb={4}
          >
            <ButtonGroup size="sm">
              {/* <Button colorScheme="blue">Edit</Button> */}
              <CancelReservation
                size="sm"
                onCancel={() => onClose()}
                resrvId={resrvId}
              />
              {/* <Button colorScheme="red" ref={initialFocusRef}>
                Cancel Reservation
              </Button> */}
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
