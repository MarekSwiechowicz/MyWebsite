import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pl" : "en";
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-2 bg-transparent ">
        <div className="relative w-24 h-8 rounded-full bg-dark dark:bg-light">
          <div
            className={`absolute top-1 left-1 w-10 h-6 bg-white dark:bg-dark rounded-full shadow-md transform duration-300 ease-in-out ${
              currentLanguage === "en" ? "translate-x-12" : "translate-x-0"
            }`}
          />
          <button
            className={`absolute inset-y-0 left-0 flex items-center justify-center w-1/2 h-full text-sm font-medium
          ${
            currentLanguage === "en"
              ? "text-light dark:text-dark"
              : "text-dark dark:text-light"
          }   transition-colors duration-300 ease-in-out focus:outline-none`}
            onClick={toggleLanguage}
          >
            PL
          </button>
          <button
            className={`absolute inset-y-0 right-0 flex items-center justify-center w-1/2 h-full text-sm font-medium
          ${
            currentLanguage === "en"
              ? "text-dark dark:text-light"
              : "text-light dark:text-dark"
          }  transition-colors duration-300 ease-in-out focus:outline-none`}
            onClick={toggleLanguage}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};
