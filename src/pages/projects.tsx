import React from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { TransitionEffect } from "@/components/TransitionEffect";

import GithubIcon from "../../public/githubIcon2.svg";
import CKeditorImage from "../../public/CKeditor_image.png";
import TMobileImage from "../../public/tmobile.png";
import TMexpressImage from "../../public/tm.png";
import PortfolioSite from "../../public/site.png";

interface ProjectProps {
  title: string;
  summary?: string;
  link: string;
  image: StaticImageData;
  projectType?: string;
}

const FeaturedProject: React.FC<ProjectProps> = ({
  title,
  summary,
  link,
  image,
  projectType,
}) => {
  return (
    <section className="col-span-12 p-4 md:p-8 lg:p-12 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light">
      <div className="absolute top-1 -right-3 -z-10 w-[100%] h-[102%] rounded-3xl bg-dark dark:bg-light" />
      <div className="flex flex-col lg:flex-row items-center">
        <Link className="w-full h-auto rounded-2xl lg:w-1/2" href={link}>
          <Image
            src={image}
            alt={`${title} project image`}
            className="rounded-2xl"
          />
        </Link>
        <div className="flex-col lg:w-1/2 lg:pl-6">
          <h1 className="text-base lg:text-xl font-medium text-primary dark:text-primaryDark xs:text-base pt-6">
            {projectType}
          </h1>
          <p className="my-2 w-full text-left text-2xl lg:text-3xl xl:text-4xl font-bold">
            {title}
          </p>
          <p className="text-sm">{summary}</p>
          <div className="flex mt-2 items-center">
            <Link
              href={link}
              className="mr-4 rounded-lg bg-dark p-2 px-6 text-lg font-semibold text-light dark:bg-light dark:text-dark sm:px-4 sm:text-base"
            >
              Visit Project
            </Link>
            <Image
              src={GithubIcon}
              alt="GitHub Icon"
              className="w-10 h-10 bg-light  rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Project: React.FC<ProjectProps> = ({
  title,
  link,
  image,
  projectType,
}) => {
  return (
    <section className="col-span-12 md:col-span-6 p-4 md:p-6 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light">
      <div className="absolute top-1 -right-3 -z-10 w-[100%] h-[102%] rounded-3xl bg-dark dark:bg-light" />
      <div className="flex flex-col">
        <Link className="rounded-2xl" href={link}>
          <Image
            src={image}
            alt={`${title} project image`}
            className="rounded-2xl"
          />
        </Link>
        <div className="flex-col pt-6">
          <h1 className="text-base lg:text-xl font-medium text-primary dark:text-primaryDark xs:text-base">
            {projectType}
          </h1>
          <p className="my-2 w-full text-left text-2xl lg:text-3xl xl:text-4xl font-bold">
            {title}
          </p>
          <div className="flex mt-2 items-center justify-between">
            <Link
              href={link}
              className="text-lg font-semibold text-dark dark:bg-dark dark:text-light sm:text-base underline"
            >
              Visit
            </Link>
            <Image
              src={GithubIcon}
              alt="GitHub Icon"
              className="w-8 h-8 bg-light  rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("page_title", "Projects")}</title>
        <meta name="description" content={t("about_me_content")}></meta>
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full dark:text-light">
        <Layout>
          <AnimatedText
            className="text-4xl md:text-7xl lg:text-8xl mb-8"
            text={t("projects_header")}
          />
          <div className="grid grid-cols-12 gap-7">
            <FeaturedProject
              title={t("CKEditor_title")}
              projectType={t("CKEditor_projectType")}
              summary={t("CKEditor_summary")}
              link="https://github.com/MarekSwiechowicz/rest-api-testing-tool"
              image={CKeditorImage}
            />
            <Project
              title="T-Mobile Product Purchase Automation"
              projectType="UI automation testing"
              link="https://github.com/MarekSwiechowicz/selenium-cucumber-test"
              image={TMobileImage}
            />
            <Project
              title="TMexpress"
              projectType="Static nextjs site"
              link="https://www.tmexpress.pl/"
              image={TMexpressImage}
            />
            <FeaturedProject
              title="Portfolio Website"
              summary="This portfolio website was created using Next.js, Tailwind CSS, and TypeScript. It is hosted on Vercel."
              link="https://github.com/MarekSwiechowicz/MyWebsite"
              image={PortfolioSite}
            />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
