import React, { useEffect, useState } from "react";

export const useThemeSwitcher = () => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState<"dark" | "light" | "">("");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem("theme");

    const handleChange = () => {
      if (userPref) {
        let check: "dark" | "light" = userPref === "dark" ? "dark" : "light";
        setMode(check);
        document.documentElement.classList.toggle("dark", check === "dark");
      } else {
        let check: "dark" | "light" = mediaQuery.matches ? "dark" : "light";
        setMode(check);
        document.documentElement.classList.toggle("dark", check === "dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return [mode, setMode] as const;
};
