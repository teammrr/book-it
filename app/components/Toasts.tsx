import { useToast, ToastPosition } from "@chakra-ui/react";

interface ToastProps {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

export default function Toast(ToastProps: ToastProps) {
  const toast = useToast();
  const defaultToastProps = {
    position: "top-right" as ToastPosition,
    duration: 5000,
    isClosable: true,
  };
  const toastProps = { ...defaultToastProps, ...ToastProps };

  return toast({
    ...toastProps,
    title: toastProps.title,
    description: toastProps.description,
    status: toastProps.status,
    duration: 5000,
    isClosable: true,
  });
}
