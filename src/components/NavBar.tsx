import Link from 'next/link';
import React from 'react';
import Logo from './Logo';

const NavBar = () => {
  return (
    <div className='w-full px-32 py-8 font-medium flex items-center justify-between'>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/articles'>Articles</Link>
      </nav>
      <Logo></Logo>
      <nav>
        <Link href='/' target={'blank'}>
          Github
        </Link>
        <Link href='/' target={'blank'}>
          LinkedIn
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
