import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
import { useRouter } from 'next/router';
import GithubIcon from '../../public/GithubIcon';
import LinkedinIcon from '../../public/LinkedinIcon';
import { motion } from 'framer-motion';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';
import AnimatedColorModeIcon from './AnimatedColorModeIcon';

type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
};

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  title,
  className = '',
}) => {
  const router = useRouter();
  return (
    <Link className={`${className} relative group`} href={href}>
      {title}
      <span
        className={`h-[2px] inline-block  bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  return (
    <header className='w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light '>
      <nav>
        <CustomLink href='/' title='Home' className='mr-4'></CustomLink>
        <CustomLink href='/about' title='About' className='mx-4'></CustomLink>
        <CustomLink
          href='/projects'
          title='Projects'
          className='ml-4'
        ></CustomLink>
      </nav>
      <nav className='flex items-center justify-center flex-wrap'>
        <motion.a
          whileHover={{ y: -2 }}
          className='w-6 mx-3'
          whileTap={{ scale: 0.9 }}
          href='https://github.com'
          target={'blank'}
        >
          <GithubIcon></GithubIcon>
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          className='w-6 mx-3'
          whileTap={{ scale: 0.9 }}
          href='https://twitter.com'
          target={'blank'}
        >
          <LinkedinIcon></LinkedinIcon>
        </motion.a>

        <AnimatedColorModeIcon
          mode={mode}
          setMode={setMode}
        ></AnimatedColorModeIcon>
      </nav>
      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo></Logo>
      </div>
    </header>
  );
};

export default NavBar;
