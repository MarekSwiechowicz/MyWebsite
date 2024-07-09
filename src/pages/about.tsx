/* eslint-disable react/no-unescaped-entities */
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import profilePic from '../../public/dalleDeveloperblonde.png';
import Image from 'next/image';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { TransitionEffect } from '@/components/TransitionEffect';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface AnimatedNumbersProps {
  value: number;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });

    return unsubscribe;
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const About = () => {
  const { t } = useTranslation('common'); // Initialize useTranslation

  return (
    <>
      <Head>
        <title>{t('page_title', 'About')}</title>
        <meta name='description' content='any description'></meta>
      </Head>
      <TransitionEffect />
      <main className='flex w-full flex-col items-center justify-center dark:text-light'>
        <Layout className=''>
          <AnimatedText
            className='mb-8 sm:mb-16 text-4xl sm:text-7xl lg:text-8xl w-full items-center '
            text={t('passion_fuels_purpose')}
          ></AnimatedText>

          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-8 sm:gap-16'>
            <div className='order-2 xl:col-span-3 sm:order-none '>
              <h2 className='mb-4 mt-5 sm:mt-0 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>
                {t('biography_heading')}
              </h2>

              <p className=' xxl:text-2xl font-medium '>
                {t('biography_paragraph_1')}
              </p>
              <p className=' xxl:text-2xl my-4 font-medium'>
                {t('biography_paragraph_2')}
              </p>
            </div>
            <div className='order-1 xl:col-span-3 sm:order-none p-8 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light'>
              <div className='absolute top-1 -right-3 -z-10 w-[102%] h-[103%] rounded-3xl  bg-dark dark:bg-light' />
              <Image
                src={profilePic}
                alt={t('profile_pic_alt')}
                className='w-full h-auto rounded-2xl'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='order-3 sm:col-span-2 xl:col-span-2 xl:flex xl:flex-col grid grid-cols-3 justify-between'>
              <div className='flex flex-col xl:items-end justify-center items-center'>
                <span className=' inline-block text-4xl md:text-7xl font-bold'>
                  <AnimatedNumbers value={10}></AnimatedNumbers>+
                </span>
                <h2 className=' text-xxs sm:text-xl font-medium capitalize text-dark/75 dark:text-light/75'>
                  {t('satisfied_clients_heading')}
                </h2>
              </div>
              <div className=' flex flex-col xl:items-end justify-center items-center'>
                <span className=' inline-block text-4xl md:text-7xl font-bold'>
                  <AnimatedNumbers value={20}></AnimatedNumbers>+
                </span>
                <h2 className=' text-xxs sm:text-xl font-medium capitalize text-dark/75 dark:text-light/75'>
                  {t('projects_completed_heading')}
                </h2>
              </div>
              <div className=' flex flex-col xl:items-end justify-center items-center'>
                <span className=' inline-block text-4xl md:text-7xl font-bold'>
                  <AnimatedNumbers value={4}></AnimatedNumbers>+
                </span>
                <h2 className=' text-xxs sm:text-xl font-medium capitalize text-dark/75 dark:text-light/75'>
                  {t('years_of_experience_heading')}
                </h2>
              </div>
            </div>
          </div>

          <Skills></Skills>
          <Experience></Experience>
          <Education></Education>
        </Layout>
      </main>
    </>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'en';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
