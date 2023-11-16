import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/developer-pic-1.png';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from '../../public/LinkedArrow';
import lightBulb from '../../public/lightbulb.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className='flex min-h-screen items-center text-dark w-full  dark:text-light'>
        <Layout className='pt-16 md:!pt-0 sm:pt-8'>
          <div className='flex flex-col lg:flex-row items-center justify-between w-full '>
            <div className='w-full lg:w-1/2'>
              <Image
                src={profilePic}
                alt='Marek'
                className='w-full h-auto inline-block md:hidden lg:flex'
                priority
              ></Image>
            </div>
            <div className=' lg:w-1/2 flex flex-col items-center self-center text-center'>
              <AnimatedText
                className='text-3xl lg:text-left sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'
                text='Turning Vision Into Reality With Code And Design.'
              ></AnimatedText>
              <p className='my-4 text-xs md:text-base font-medium text-center lg:text-left'>
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js and
                web development.
              </p>
              <div className='flex items-center mt-2 lg:self-start self-center'>
                <Link
                  className='flex items-center bg-dark text-light p-2.5 px-6
                   rounded-lg text-lg font-semibold hover:bg-light
                    hover:text-dark border-2 border-solid border-transparent
                    
                   hover:border-dark dark:hover:border-light dark:bg-light dark:text-dark
                    hover:dark:bg-dark hover:dark:text-light
                     md:p-2 md:px-4 md:text-base'
                  href='/Web.pdf'
                  target={'_blank'}
                  download={true}
                >
                  Resume
                  <LinkArrow className={'w-6 ml-1'}></LinkArrow>
                </Link>
                <Link
                  className='ml-4 text-lg font-medium capitalize text-dark  underline dark:text-light md:text-base '
                  href='mailto:marek.swiechowicz.linkedin@gmail.com'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        {/* <HireMe></HireMe> */}
        <div className='absolute  right-8 bottom-8 w-24 hidden md:inline-block'>
          <Image src={lightBulb} alt='marek' className='w-full h-auto'></Image>
        </div>
      </main>
    </>
  );
}
