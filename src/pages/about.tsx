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

const about = () => {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name='description' content='any description'></meta>
      </Head>
      <main className='flex w-full flex-col items-center justify-center '>
        <Layout className='pt-16'>
          <AnimatedText
            className='mb-16'
            text='Passion Fuels Purpose!'
          ></AnimatedText>
          <div className='grid w-full grid-cols-8 gap-16 '>
            <div className='col-span-3 flex flex-col items-start justify-start'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75'>
                Biography
              </h2>
              <p className=' font-medium'>
                Hi, I'm Marek, a web developer with a year of professional
                experience in creating functional and user-friendly digital
                experiences. I take pride in delivering designs that are not
                just aesthetically pleasing but also solve real problems and
                provide seamless user experiences.
              </p>
              <p className=' my-4 font-medium'>
                I believe that great design transcends mere looks—it’s about
                crafting solutions and enjoyable interactions. My focus extends
                across various digital mediums, from websites to mobile apps,
                where I apply my dedication to design brilliance and
                user-centric principles.
              </p>
              <p className=' my-4 font-medium'>
                With every project, I aim to leverage my skills and enthusiasm
                to realize your vision. I’m eager to contribute my knowledge and
                fresh perspective to your next project.
              </p>
            </div>
            <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8'>
              <div className='absolute top-1 -right-4 -z-10 w-[102%] h-[103%] rounded-2xl bg-dark' />
              <Image
                src={profilePic}
                alt='Codebucks'
                className='w-full h-auto rounded-2xl'
              />
            </div>
            <div className='col-span-2 flex flex-col items-end justify-between'>
              <div className='flex flex-col items-end justify-center'>
                <span className=' inline-block text-7xl font-bold'>
                  <AnimatedNumbers value={50}></AnimatedNumbers>+
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>
                  satisfied clients
                </h2>
              </div>
              <div>
                <div className=' col-span-2 flex flex-col items-end justify-center'>
                  <span className=' inline-block text-7xl font-bold'>
                    <AnimatedNumbers value={50}></AnimatedNumbers>+
                  </span>
                  <h2 className='text-xl font-medium capitalize text-dark/75'>
                    projects completed
                  </h2>
                </div>
              </div>
              <div>
                <div className=' col-span-2 flex flex-col items-end justify-center'>
                  <span className=' inline-block text-7xl font-bold'>
                    <AnimatedNumbers value={1}></AnimatedNumbers>+
                  </span>
                  <h2 className='text-xl font-medium capitalize text-dark/75'>
                    years of experience
                  </h2>
                </div>
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

export default about;
