import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import profilePic from "../../public/developer-pic-1.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "../../public/LinkedArrow";
import lightBulb from "../../public/lightbulb.svg";
import { TransitionEffect } from "@/components/TransitionEffect";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("page_title", "Marek Święchowicz - Web Developer")}</title>
        <meta
          name="description"
          content="Explore the creative portfolio of Marek Święchowicz, a professional web developer specializing in modern, user-friendly web solutions."
        ></meta>
      </Head>
      <TransitionEffect></TransitionEffect>
      <main className="flex min-h-screen items-center text-dark w-full  dark:text-light">
        <Layout className="pt-16 md:!pt-0 sm:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full ">
            <div className="w-full lg:w-1/2">
              <Image
                src={profilePic}
                alt={t("profile_pic_alt", "Marek")}
                className="w-full h-auto inline-block md:hidden lg:flex"
                priority
              ></Image>
            </div>
            <div className=" lg:w-1/2 flex flex-col items-center self-center text-center">
              <AnimatedText
                className="text-3xl lg:text-left sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
                text={t("animated_text")}
              ></AnimatedText>
              <p className="my-4 text-xs md:text-base font-medium text-center lg:text-left">
                {t("developer_description")}
              </p>
              <div className="flex items-center mt-2 lg:self-start self-center">
                <Link
                  className="flex items-center bg-dark text-light p-2 px-4 md:p-2.5 md:px-6
                   rounded-lg text-base md:text-lg font-semibold hover:bg-light
                    hover:text-dark border-2 border-solid border-transparent
                    
                   hover:border-dark dark:hover:border-light dark:bg-light dark:text-dark
                    hover:dark:bg-dark hover:dark:text-light"
                  href="/Web.pdf"
                  target={"_blank"}
                  download={true}
                >
                  {t("resume_button")}
                  <LinkArrow className={"w-6 ml-1"}></LinkArrow>
                </Link>
                <Link
                  className="ml-4 text-base md:text-lg font-medium capitalize text-dark  underline dark:text-light"
                  href="mailto:marek.swiechowicz.linkedin@gmail.com"
                >
                  {t("contact_link")}
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <div className="absolute  right-8 bottom-8 w-24 hidden md:inline-block">
          <Image
            src={lightBulb}
            alt={t("lightbulb_pic_alt", "Lightbulb")}
            className="w-full h-auto"
          ></Image>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || "en";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
