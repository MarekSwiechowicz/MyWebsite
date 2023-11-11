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
      whileHover={{ scale: 1.05 }}
      className='absolute cursor-pointer flex items-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark'
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <>
      <h2 className='font-bold text-8xl mt-64 w-full text-center'>Skills</h2>
      <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='cursor-pointer flex items-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark'
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
