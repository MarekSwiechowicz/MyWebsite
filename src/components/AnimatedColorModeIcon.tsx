import React from "react";
import SunIcon from "../../public/SunIcon";
import MoonIcon from "../../public/MoonIcon";

// Define a type for your component's props
type AnimatedColorModeIconProps = {
  mode: "dark" | "light" | "";
  setMode: (mode: "dark" | "light") => void;
};

const AnimatedColorModeIcon: React.FC<AnimatedColorModeIconProps> = ({
  mode,
  setMode,
}) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className={`ml-3 flex items-center justify-center rounded-full p-0.5 ${
        mode === "dark" ? "bg-light text-dark" : "bg-dark text-light"
      } `}
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};

export default AnimatedColorModeIcon;
