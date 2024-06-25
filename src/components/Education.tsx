import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { LiIcon } from './LiIcon';
import { useTranslation } from 'next-i18next';

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
      className='my-8 first:mt-0 last:mb-0 w-[80%] sm:w-[60%] mx-auto flex flex-col items-center justify-between'
    >
      <LiIcon reference={ref}></LiIcon>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div>
          <h3 className='capitalize font-bold text-lg sm:text-2xl'>{type}</h3>
          <span className='font-medium text-dark/75 dark:text-light/75 text-sm sm:text-base '>
            {time} | {place}
          </span>
          <p className='font-medium w-full text-sm sm:text-base'>{info}</p>
        </div>
      </motion.div>
    </li>
  );
};

export const Education = () => {
  const { t } = useTranslation('common');

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });
  return (
    <div className='my-16 md:my-64'>
      <h2 className=' font-bold text-4xl md:text-8xl text-center w-full mb-16 sm:mb-32'>
        {t('educationTitle')}
      </h2>
      <div
        ref={ref}
        className=' w-[100%] sm:w-[90%] lg:w-[75%] mx-auto relative'
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className='absolute left-[20px] md:left-[40px] top-0 w-[2px] sm:w-[4px] h-full
           bg-dark origin-top dark:shadow-primaryDark dark:shadow-3xl dark:bg-primaryDark'
        ></motion.div>
        <ul className='w-full flex flex-col items-start justify-between ml-2 sm:ml-4'>
          <Details
            type={t('masters')}
            time='2021-2022'
            place={t('mastersAcademy')}
            info={t('mastersInfo')}
          ></Details>
          <Details
            type={t('bachelor')}
            time='2017-2021'
            place={t('bachelorAcademy')}
            info={t('bachelorInfo')}
          ></Details>
        </ul>
      </div>
    </div>
  );
};
