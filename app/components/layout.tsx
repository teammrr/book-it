import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen text-black">{children}</main>
      <Footer />
    </>
  );
}
