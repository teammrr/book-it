"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.classList.remove("dark");
    } else {
      setTheme("dark");
      document.body.classList.remove("light");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkModeButton;
