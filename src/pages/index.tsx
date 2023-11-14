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
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light '>
        <Layout className='pt-0 md:p-16 sm:pt-8'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            <div className='w-1/2 md:w-full '>
              <Image
                src={profilePic}
                alt='Marek'
                className='w-full h-auto hide-between-md-lg'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
                50vw'
              ></Image>
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText
                className='!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text=6xl md:!text-5xl sm:!text-3xl'
                text='Turning Vision Into Reality With Code And Design.'
              ></AnimatedText>
              <p className='my-4 text-base font-medium md:text-small sm:text-xs'>
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js and
                web development.
              </p>
              <div className='flex items-center self-start mt-2 lg:self-center'>
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
          {/* <Footer></Footer> */}
        </Layout>
        {/* <HireMe></HireMe> */}
        <div className='absolute right-8 bottom-8 inline-block w-24 md:hidden'>
          <Image src={lightBulb} alt='marek' className='w-full h-auto'></Image>
        </div>
      </main>
    </>
  );
}
