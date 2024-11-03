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
import GithubIcon2 from "../../public/githubIcon.svg";

export const Projects2 = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("page_title", "Projects")}</title>
        <meta name="description" content={t("about_me_content")}></meta>
      </Head>
      <main className="flex min-h-screen items-center text-dark w-full  dark:text-light">
        <Layout className="">
          <AnimatedText
            className="text-4xl md:text-7xl"
            text={t("projects_header")}
          ></AnimatedText>

          <section className="flex order-1 p-8 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light">
            <div className="absolute top-1 -right-3 -z-10 w-[100%] h-[102%] rounded-3xl bg-dark dark:bg-light " />
            <div className="flex-col">
              <Image
                src={CKeditorImage}
                alt={t("profile_pic_alt")}
                className="w-full h-auto rounded-2xl"
              />
              <div className="flex-col">
                <h1 className="text-xl font-medium text-primary dark:text-primaryDark xs:text-base">
                  Featured Project
                </h1>
                <p className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
                  {t("CKEditor_title")}
                </p>
                <p>{t("CKEditor_summary")}</p>
                <Image src={GithubIcon2} alt="Github Icon" className="w-5" />
                <div>Visit Project</div>
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
