import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { LiIcon } from "./LiIcon";
import { useTranslation } from "next-i18next";

type DetailsProps = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  work: string;
  adress: string;
};

const Details: React.FC<DetailsProps> = ({
  position,
  company,
  companyLink,
  time,
  work,
  adress,
}) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[80%] sm:w-[60%] mx-auto flex flex-col items-center justify-between"
    >
      <LiIcon reference={ref}></LiIcon>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div>
          <h3 className="capitalize font-bold text-lg sm:text-2xl">
            {position}&nbsp;{" "}
            <a
              href={companyLink}
              className=" text-primary dark:text-primaryDark capitalize"
              target="_blank"
            >
              @{company}
            </a>
          </h3>
          <span className="font-medium text-dark/75 dark:text-light/75 text-sm sm:text-base ">
            {time} | {adress}
          </span>
          <p className="font-medium w-full text-sm sm:text-base">{work}</p>
        </div>
      </motion.div>
    </li>
  );
};

export const Experience = () => {
  const { t } = useTranslation("common");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const workExperiences = [
    {
      position: "Software Engineer III",
      company: "SiriusXM",
      time: "2025 - present",
      companyLink: "https://www.siriusxm.com/",
      workDescriptionKey: "workDescriptionSiriusXM",
      address: "SiriusXM",
    },
    {
      position: "Quality Assurance",
      company: "3MK Protection ",
      time: "2024 - present",
      companyLink: "https://3mk.pl/",
      workDescriptionKey: "workDescription3MK",
      address: "3MK Protection",
    },
    {
      position: "Test Engineer",
      company: "ThunderSoft",
      time: "2022-2024",
      companyLink: "https://www.thundersoft.com/",
      workDescriptionKey: "workDescriptionThunderSoft",
      address: "ThunderSoft",
    },
    {
      position: "Software Engineer",
      company: "Geeknauts",
      time: "2020-2022",
      companyLink: "https://geeknauts.com/pl/",
      workDescriptionKey: "workDescriptionGeeknauts",
      address: "Geeknauts",
    },
  ];

  return (
    <div className="">
      <h2 className=" font-bold text-4xl md:text-7xl text-center w-full mb-16 sm:mb-32">
        {t("experienceTitle")}
      </h2>
      <div
        ref={ref}
        className=" w-[100%] sm:w-[90%] lg:w-[75%] mx-auto relative"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[20px] md:left-[40px] top-0 w-[2px] sm:w-[4px] h-full
           bg-dark origin-top  dark:bg-primaryDark dark:shadow-primaryDark dark:shadow-3xl  "
        ></motion.div>
        <ul className="w-full flex flex-col items-start justify-between ml-2 sm:ml-4">
          {workExperiences.map((experience, index) => (
            <Details
              key={index}
              position={experience.position}
              company={experience.company}
              time={experience.time}
              companyLink={experience.companyLink}
              work={t(experience.workDescriptionKey)}
              adress={experience.address}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
