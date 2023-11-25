import Link from 'next/link';
import React, { useState } from 'react';
import Logo from './Logo';
import { useRouter } from 'next/router';
import GithubIcon from '../../public/GithubIcon';
import LinkedinIcon from '../../public/LinkedinIcon';
import { motion } from 'framer-motion';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';
import AnimatedColorModeIcon from './AnimatedColorModeIcon';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'next-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
};

type CustomMobileLinkProps = {
  href: string;
  title: string;
  className?: string;
  toggle: () => void;
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

const CustomMobileLink: React.FC<CustomMobileLinkProps> = ({
  href,
  title,
  className = '',
  toggle,
}) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[2px] inline-block  bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-dark `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common'); // Assuming 'common' is your namespace for common texts

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header
      className={twMerge(
        'w-full px-8 md:px-16 lg:px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 '
      )}
    >
      <button
        className=' flex lg:hidden flex-col justify-center items-center'
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm  ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6
     rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm  ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      {/* desktop bar */}
      <div className='w-full hidden justify-between items-center lg:flex'>
        <nav>
          <CustomLink href='/' title={t('home')} className='mr-4'></CustomLink>

          <CustomLink
            href='/about'
            title={t('about')}
            className='mx-4'
          ></CustomLink>
        </nav>

        <nav className='flex items-center justify-center flex-wrap'>
          <motion.a
            whileHover={{ y: -2 }}
            className='w-6 mx-3 bg-light dark:bg-dark rounded-full'
            whileTap={{ scale: 0.9 }}
            href='https://github.com/MarekSwiechowicz'
            target={'blank'}
          >
            <GithubIcon></GithubIcon>
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            className='w-6 mx-3'
            whileTap={{ scale: 0.9 }}
            href='https://www.linkedin.com/in/marek%C5%9Bwi%C4%99chowicz/'
            target={'blank'}
          >
            <LinkedinIcon></LinkedinIcon>
          </motion.a>

          <AnimatedColorModeIcon
            mode={mode}
            setMode={setMode}
          ></AnimatedColorModeIcon>
          <LanguageSwitcher></LanguageSwitcher>
        </nav>
      </div>

      {/* mobile bar */}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className='min-w-[70vw] flex flex-col justify-between items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32'
        >
          <nav className='flex items-center flex-col justify-center'>
            <CustomMobileLink
              toggle={handleClick}
              href='/'
              title='Home'
              className=''
            ></CustomMobileLink>
            <CustomMobileLink
              toggle={handleClick}
              href='/about'
              title='About'
              className=''
            ></CustomMobileLink>
            <CustomMobileLink
              toggle={handleClick}
              href='/projects'
              title='Projects'
              className=''
            ></CustomMobileLink>
          </nav>

          <nav className='flex items-center justify-center flex-wrap mt-2'>
            <motion.a
              whileHover={{ y: -2 }}
              className='w-6 mx-3 bg-light dark:bg-dark rounded-full sm:mx-1'
              whileTap={{ scale: 0.9 }}
              href='https://github.com/MarekSwiechowicz'
              target={'blank'}
            >
              <GithubIcon></GithubIcon>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              className='w-6 mx-3 sm:mx-1'
              whileTap={{ scale: 0.9 }}
              href='https://www.linkedin.com/in/marek%C5%9Bwi%C4%99chowicz/'
              target={'blank'}
            >
              <LinkedinIcon></LinkedinIcon>
            </motion.a>

            <AnimatedColorModeIcon
              mode={mode}
              setMode={setMode}
            ></AnimatedColorModeIcon>
            <LanguageSwitcher></LanguageSwitcher>
          </nav>
        </motion.div>
      ) : null}

      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo></Logo>
      </div>
    </header>
  );
};

export default NavBar;
