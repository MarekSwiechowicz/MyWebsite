import React from 'react';
import Layout from './Layout';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className=' w-full border-t-2 border-solid border-dark font-medium text-lg'>
      <Layout className=' flex py-8  items-center justify-between'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved. </span>
        <div className=' flex items-center'>
          Build With{' '}
          <span className='text-primary text-2xl px-1'> &#9825; </span>by &nbsp;
          <span className='underline'>Marek</span>
        </div>
        <Link href='/'>Say hello</Link>
      </Layout>
    </footer>
  );
};
