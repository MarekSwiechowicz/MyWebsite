import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../public/SunIcon";
import MoonIcon from "../../public/MoonIcon";

const ThemeIcon = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="ml-3 flex items-center justify-center rounded-full p-0.5 bg-light text-dark"
        aria-label="Toggle theme"
      >
        <MoonIcon />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-3 flex items-center justify-center rounded-full p-0.5 bg-light text-dark"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeIcon;
