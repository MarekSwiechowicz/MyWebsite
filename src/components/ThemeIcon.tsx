import React from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../public/SunIcon";
import MoonIcon from "../../public/MoonIcon";

const ThemeIcon = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="ml-3 flex items-center justify-center rounded-full p-0.5 bg-light text-dark"
    >
      {currentTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeIcon;
