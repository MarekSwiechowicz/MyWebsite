import React from 'react';
import Layout from './Layout';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      className=' w-full border-t-2 border-solid border-dark font-medium 
    dark:text-light dark:border-light text-base md:text-lg '
    >
      <Layout className=' flex flex-col lg:flex-row py-8 md:!py-6 items-center justify-between'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved. </span>
        <div className=' flex items-center py-2 '>
          Build With{' '}
          <span className='text-primary dark:text-primaryDark text-2xl  px-2'>
            {' '}
            &#9825;{' '}
          </span>
          by &nbsp;
          <span className='underline'>Marek</span>
        </div>
        <Link
          href='/'
          target={'_blank'}
          className=' underline underline-offset-2'
        >
          Say Hello
        </Link>
      </Layout>
    </footer>
  );
};
