import React from "react";
import Layout from "./Layout";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer
      className=" w-full border-t-2 border-solid border-dark font-medium 
    dark:text-light dark:border-light text-base md:text-lg "
    >
      <Layout className=" flex flex-col lg:flex-row py-8 md:!py-6 items-center justify-between">
        <span>
          {new Date().getFullYear()} &copy; {t("allRightsReserved")}{" "}
        </span>
        <div className=" flex items-center py-2 ">
          {t("buildWithLove")}
          <span className="text-primary dark:text-primaryDark text-2xl  px-2">
            &#9825;
          </span>
          {t("by")} &nbsp;
          <span className="underline">{t("Marka")}</span>
        </div>
        <Link
          href="mailto:marek.swiechowicz.linkedin@gmail.com"
          target={"_blank"}
          className=" underline underline-offset-2"
        >
          {t("sayHello")}
        </Link>
      </Layout>
    </footer>
  );
};
