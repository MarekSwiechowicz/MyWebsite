import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { LiIcon } from './LiIcon';

type DetailsProps = {
  type: string;
  time: string;
  place: string;
  info: string;
};

const Details: React.FC<DetailsProps> = ({ type, time, place, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'
    >
      <LiIcon reference={ref}></LiIcon>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div>
          <h3 className='capitalize font-bold text-2xl'>{type}</h3>
          <span className='capitalize font-medium text-dark/75 dark:text-light/75 '>
            {time} | {place}
          </span>
          <p className='font-medium w-full'>{info}</p>
        </div>
      </motion.div>
    </li>
  );
};

export const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });
  return (
    <div className='my-64'>
      <h2 className=' font-bold text-4xl md:text-8xl text-center w-full mb-32'>
        Education
      </h2>
      <div ref={ref} className='w-[75%] mx-auto relative'>
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className='absolute left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top'
        ></motion.div>
        <ul>
          <Details
            type='Batchelor Of Science In Computer Science'
            time='2017-2021'
            place='Cracow University of Technology'
            info='Relevant courses included Data Structures and Algorithms, Computer Systems Engineering, and Artificial Intelligence'
          ></Details>
          <Details
            type='Master of Science in Computer Science Specialization in Cybersecurity'
            time='2021-2022'
            place='Cracow University of Technology'
            info="Master's coursework included hands-on experience with security assessment and penetration testing tools such as Nmap, SonarQube, Burp Suite, and BeEF, emphasizing practical approaches to vulnerability analysis and network security."
          ></Details>
        </ul>
      </div>
    </div>
  );
};
