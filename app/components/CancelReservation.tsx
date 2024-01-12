import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
  ToastPosition,
} from "@chakra-ui/react";
import axios from "axios";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import * as React from "react";

export default function CancelReservation({
  resrvId,
  size,
  onCancel,
}: {
  resrvId: string;
  size: string;
  onCancel: () => void;
}) {
  const { data: session } = useSession({
    required: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const cancelRef = useRef<HTMLButtonElement>(null);

  async function handleCancel() {
    const cancelDetails = {
      resrvId: resrvId,
      name: session?.user?.name,
    };
    try {
      await axios.delete("/api/bookings", {
        data: cancelDetails,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      onClose();
      onCancel();
      mutate("/api/bookings");
      toast({
        ...defaultToastProps,
        title: "Reservation cancelled",
        description: "Your reservation has been cancelled",
        status: "success",
      });
    } catch (err) {
      toast({
        ...defaultToastProps,
        title: "Error",
        description: `Something went wrong, error: ${err}`,
        status: "error",
      });
      console.log(err);
    }
  }

  return (
    <>
      <Button size={`${size}`} colorScheme="red" onClick={onOpen}>
        Cancel Reservation
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Reservation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleCancel} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
