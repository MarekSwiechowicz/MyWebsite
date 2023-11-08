import React from 'react';
import { motion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: React.ReactNode;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  return (
    <div className='w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden'>
      <motion.h1
        className={`inline-block w-full text-dark font-bold capitalize text-8xl ${className}`}
      >
        {text.split(' ').map((word, index) => (
          <span className='inline-block' key={word + '-' + index}>
            {word}&nbsp;{' '}
          </span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
