import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import GithubIcon from "../../../public/GithubIcon";
import LinkedinIcon from "../../../public/LinkedinIcon";
import { CustomLink } from "./CustomLink";
import ThemeIcon from "../ThemeIcon";
import { LanguageSwitcher } from "../LanguageSwitcher";

const DesktopNav = () => {
  const { t } = useTranslation("common");
  const Links = [
    { href: "/", title: "home", className: "mr-4" },
    { href: "/about", title: "about", className: "mx-4" },
  ];

  return (
    <div className="w-full hidden lg:flex justify-between items-center ">
      <nav>
        {Links.map((link) => (
          <CustomLink
            key={link.title}
            href={link.href}
            title={t(link.title)}
            className={link.className}
          />
        ))}
      </nav>

      <nav className="flex items-center justify-center flex-wrap">
        <motion.a
          whileHover={{ y: -2 }}
          className="w-6 mx-3 bg-light dark:bg-dark rounded-full"
          whileTap={{ scale: 0.9 }}
          href="https://github.com/MarekSwiechowicz"
          target={"blank"}
        >
          <GithubIcon />
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          className="w-6 mx-3"
          whileTap={{ scale: 0.9 }}
          href="https://www.linkedin.com/in/marek%C5%9Bwi%C4%99chowicz/"
          target={"blank"}
        >
          <LinkedinIcon />
        </motion.a>

        <ThemeIcon />
        <LanguageSwitcher />
      </nav>
    </div>
  );
};

export default DesktopNav;
