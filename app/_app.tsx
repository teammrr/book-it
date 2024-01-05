import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const liffId = process.env.AUTH_LIFF_ID;
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
  Error: return (
    <>
      <script src="https://static.line-scdn.net/liff/edge/2.1/liff.js" async />

      <SessionProvider>
        <ThemeProvider attribute="class">
          <Providers>
            <Component {...pageProps} />
          </Providers>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
