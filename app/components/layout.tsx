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
      <motion.div className="sticky top-0 z-50">
        <Header />
      </motion.div>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <main className="bg-gray-50 text-black min-h-max">{children}</main>
        <Footer />
      </motion.main>
    </>
  );
}
