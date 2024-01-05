// app/providers.tsx
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import useSWR, { SWRConfig } from "swr";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        <ChakraProvider>{children}</ChakraProvider>;
      </SWRConfig>
    </>
  );
}
