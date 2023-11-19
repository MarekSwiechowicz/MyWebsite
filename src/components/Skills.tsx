import React from 'react';
import { motion } from 'framer-motion';

type SkillProps = {
  name: string;
  x: string;
  y: string;
};

const Skill: React.FC<SkillProps> = ({ name, x, y }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className='absolute cursor-pointer flex items-center
       rounded-full font-semibold bg-transparent sm:bg-dark text-dark sm:text-light  py-2 lg:py-3 px-4 lg:px-6
        shadow-dark dark:text-light dark:sm:text-dark dark:bg-transparent sm:dark:bg-light'
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <>
      <h2 className='font-bold text-6xl sm:text-8xl mt-32 sm:mt-64 w-full text-center'>
        Skills
      </h2>
      <div
        className='w-full h-[50vh] sm:h-[80vh] lg:h-[100vh] mb-32 relative flex items-center
       justify-center rounded-full bg-circularLightSm sm:bg-circularLightLg lg:bg-circularLightXl dark:bg-circularDarkSm sm:dark:bg-circularDarkLg lg:dark:bg-circularDarkXl '
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className='cursor-pointer flex items-center rounded-full
           font-semibold  bg-dark text-light p-2  md:p-6 lg:p-8
            shadow-dark dark:text-dark dark:bg-light'
        >
          Web
        </motion.div>
        <Skill name='HTML' x='-18vw' y='2vw'></Skill>
        <Skill name='Css' x='-8vw' y='-10vw'></Skill>
        <Skill name='JavaScript' x='21vw' y='6vw'></Skill>
        <Skill name='ReactJS' x='0vw' y='11vw'></Skill>
        <Skill name='NextJS' x='-20vw' y='-9vw'></Skill>
        <Skill name='GatsbyJS' x='23vw' y='-5vw'></Skill>
        <Skill name='Figma' x='0vw' y='-19vw'></Skill>
        <Skill name='Tailwind CSS' x='10vw' y='-14vw'></Skill>
      </div>
    </>
  );
};
