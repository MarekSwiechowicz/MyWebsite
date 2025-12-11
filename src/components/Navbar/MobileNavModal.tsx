import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import GithubIcon from "../../../public/GithubIcon";
import LinkedinIcon from "../../../public/LinkedinIcon";
import { CustomMobileLink } from "./CustomMobileLink";
import ThemeIcon from "../ThemeIcon";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface MobileNavModalProps {
  isOpen: boolean;
  handleClick: () => void;
}

export const MobileNavModal: React.FC<MobileNavModalProps> = ({
  isOpen,
  handleClick,
}) => {
  const { t } = useTranslation("common");
  const Links = [
    { href: "/", title: "home" },
    { href: "/about", title: "about" },
    { href: "/projects", title: "projects" },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      id="modalId"
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{ scale: 1, opacity: 1 }}
      className="min-w-[70vw] flex flex-col justify-between items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
    >
      <nav className="flex items-center flex-col justify-center">
        {Links.map((link) => (
          <CustomMobileLink
            key={link.title}
            toggle={handleClick}
            href={link.href}
            title={t(link.title)}
          />
        ))}
      </nav>

      <nav className="flex items-center justify-center flex-wrap mt-2">
        <motion.a
          whileHover={{ y: -2 }}
          className="w-6 mx-3 bg-light dark:bg-dark rounded-full sm:mx-1"
          whileTap={{ scale: 0.9 }}
          href="https://github.com/MarekSwiechowicz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("github", "Marek's GitHub")}
        >
          <GithubIcon />
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          className="w-6 mx-3 sm:mx-1"
          whileTap={{ scale: 0.9 }}
          href="https://www.linkedin.com/in/marek%C5%9Bwi%C4%99chowicz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedin", "Marek's LinkedIn")}
        >
          <LinkedinIcon />
        </motion.a>
        <ThemeIcon />
        <LanguageSwitcher />
      </nav>
    </motion.div>
  );
};
