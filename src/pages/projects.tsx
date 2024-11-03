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

type FeaturedProjectProps = {
  type: string;
  title: string;
  summary: string;
  img: any;
  link: string;
  github: string;
};

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  type,
  title,
  summary,
  img,
  link,
  github,
}) => {
  return (
    <article className=" w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12">
      <Link
        href={link}
        target="blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg"
      >
        <Image src={img} alt={title} className="w-full h-auto"></Image>
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6">
        <span className="text-primary font-medium text-xl">{type}</span>
        <Link
          href={link}
          target="blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 font-medium text-dark">{summary}</p>
      </div>
      
      <Link href={github} target="blank">
        <GithubIcon />
      </Link>
      <Link href={github} target="blank">
        Visit Project
      </Link>
    </article>
  );
};

export const Projects = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("page_title", "Projects")}</title>
        <meta name="description" content={t("about_me_content")}></meta>
      </Head>
      <main className="w-full mb-16 flex flex-col items-center">
        <Layout className="pt-16">
          <AnimatedText text={t("projects_header")}></AnimatedText>
          <div className="grid grid-cols-12 gap-24">
            <div className="col-span-12">
              <FeaturedProject
                title={t("CKEditor_title")}
                summary={t("CKEditor_summary")}
                link="https://github.com/MarekSwiechowicz/rest-api-testing-tool"
                github="https://github.com/MarekSwiechowicz/rest-api-testing-tool"
                type="Featured Project"
                img={CKeditorImage}
              ></FeaturedProject>
            </div>
            <div className="col-span-6">Project-1</div>
            <div className="col-span-6">Project-2</div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || "en";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
