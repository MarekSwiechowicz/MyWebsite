import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import GithubIcon from "../../../public/GithubIcon";
import LinkedinIcon from "../../../public/LinkedinIcon";
import { CustomLink } from "./CustomLink";
import ThemeIcon from "../ThemeIcon";
import { LanguageSwitcher } from "../LanguageSwitcher";

// Define prop types for the SocialMotionLink component
interface SocialMotionLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const SocialMotionLink: React.FC<SocialMotionLinkProps> = ({
  href,
  icon: Icon,
  label,
}) => (
  <motion.a
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.9 }}
    className="w-6 mx-3 bg-light dark:bg-dark rounded-full"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    <Icon />
  </motion.a>
);

const DesktopNav: React.FC = () => {
  const { t } = useTranslation("common");

  const Links: { href: string; title: string; className: string }[] = [
    { href: "/", title: "home", className: "mr-4" },
    { href: "/about", title: "about", className: "mx-4" },
  ];

  return (
    <div className="w-full hidden lg:flex justify-between items-center">
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
        <SocialMotionLink
          href="https://github.com/MarekSwiechowicz"
          icon={GithubIcon}
          label="Marek's GitHub"
        />
        <SocialMotionLink
          href="https://www.linkedin.com/in/marek%C5%9Bwi%C4%99chowicz/"
          icon={LinkedinIcon}
          label="Marek's LinkedIn"
        />

        <ThemeIcon />
        <LanguageSwitcher />
      </nav>
    </div>
  );
};

export default DesktopNav;
