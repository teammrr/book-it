import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear" }}
      >
        <main className="bg-gray-50 min-h-screen text-black">{children}</main>
      </motion.main>
      <Footer />
    </>
  );
}
