import React, { useState, useEffect, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "next-i18next";
import MoonIcon from "../../../public/MoonIcon";
import Logo from "../Logo";
import DesktopNav from "./DesktopNav";
import { MobileNavModal } from "./MobileNavModal";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      const modal = document.getElementById("modalId");
      const button = document.getElementById("buttonId");
      if (
        isOpen &&
        modal &&
        button &&
        !modal.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeOnOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick]);

  const Links = [
    { href: "/", title: "home", className: "mr-4" },
    { href: "/about", title: "about", className: "mx-4" },
  ];

  return (
    <header
      className={twMerge(
        "w-full px-8 md:px-16 lg:px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10"
      )}
    >
      <button
        id="buttonId"
        className="flex lg:hidden flex-col justify-center items-center"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>
      <div className="opacity-0">
        <MoonIcon />
      </div>
      <DesktopNav />
      <MobileNavModal isOpen={isOpen} handleClick={handleClick} />
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
