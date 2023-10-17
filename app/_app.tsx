import { SessionProvider } from "next-auth/react";
import "./globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
