import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import GithubIcon from "../../public/GithubIcon";
import CKeditorImage from "../../public/CKeditor_image.png";
import GithubIcon2 from "../../public/githubIcon2.svg";

export const Projects2 = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("page_title", "Projects")}</title>
        <meta name="description" content={t("about_me_content")}></meta>
      </Head>
      <main className="flex items-center text-dark w-full  dark:text-light">
        <Layout className="">
          <AnimatedText
            className="text-4xl md:text-7xl lg:text-8xl mb-8"
            text={t("projects_header")}
          ></AnimatedText>

          <section className="flex order-1 p-4 md:p-8 lg:p-12 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light">
            <div className="absolute top-1 -right-3 -z-10 w-[100%] h-[102%] rounded-3xl bg-dark dark:bg-light" />
            <div className="flex flex-col lg:flex-row items-center ">
              <Image
                src={CKeditorImage}
                alt={t("profile_pic_alt")}
                className="w-full h-auto rounded-2xl lg:w-1/2"
              />
              <div className="flex-col lg:w-1/2 lg:pl-6">
                <h1 className="text-base lg:text-xl font-medium text-primary dark:text-primaryDark xs:text-base pt-6">
                  Featured Project
                </h1>
                <p className="my-2 w-full text-left text-2xl lg:text-3xl xl:text-4xl font-bold  ">
                  {t("CKEditor_title")}
                </p>
                <p className="text-sm">{t("CKEditor_summary")}</p>
                <Link
                  className="flex mt-2"
                  href="https://github.com/MarekSwiechowicz/rest-api-testing-tool"
                >
                  <Image
                    src={GithubIcon2}
                    alt="Github Icon"
                    className="w-10 h-10 bg-light dark:bg-dark rounded-full"
                  />
                  <button className="ml-4 rounded-lg bg-dark p-2 px-6 text-lg font-semibold text-light dark:bg-light dark:text-dark  sm:px-4 sm:text-base ">
                    Visit Project
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </Layout>
      </main>
    </>
  );
};

export default Projects2;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || "en";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
