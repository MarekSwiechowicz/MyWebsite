import { motion, useScroll } from 'framer-motion';
import React, { useRef } from 'react';

export const LiIcon = ({ reference }: { reference: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['center end', 'center center'],
  });
  return (
    <figure className='absolute left-0 stroke-dark dark:stroke-light'>
      <svg
        className=' -rotate-90 '
        width='75'
        height='75'
        viewBox='0 0 100 100'
      >
        <circle
          cx='75'
          cy='50'
          r='20'
          className='stroke-primary dark:stroke-primaryDark stroke-1 fill-none'
        ></circle>
        <motion.circle
          className=' stroke-[5px] fill-light dark:fill-dark'
          cx='75'
          cy='50'
          r='20'
          style={{ pathLength: scrollYProgress }}
        ></motion.circle>
        <circle
          className=' stroke-1 fill-primary dark:fill-primaryDark animate-pulse'
          cx='75'
          cy='50'
          r='10'
        ></circle>
      </svg>
    </figure>
  );
};
