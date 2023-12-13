import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { useEffect } from "react";
const liffId = process.env.AUTH_LIFF_ID;
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: any) {
  useEffect(() => {
    (async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId: liffId || "" });
      } catch (error) {
        console.error("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    })();
  }, []);

  return (
    <>
      <script src="https://static.line-scdn.net/liff/edge/2.1/liff.js" async />
      <SessionProvider>
        <ThemeProvider attribute="class">
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
