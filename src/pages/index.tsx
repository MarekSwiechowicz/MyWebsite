import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/developer-pic-1.png';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from '../../public/LinkedArrow';
import { Footer } from '@/components/Footer';
import { HireMe } from '@/components/HireMe';
import lightBulb from '../../public/lightbulb.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
        <Layout className='pt-0'>
          <div className='flex items-center justify-between w-full'>
            <div className='w-1/2'>
              <Image
                src={profilePic}
                alt='CodeBucks'
                className='w-full h-auto'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
                50vw'
              ></Image>
            </div>
            <div className='w-1/2 flex flex-col items-center self-center'>
              <AnimatedText
                className='!text-6xl !text-left'
                text='Turning Vision Into Reality With Code And Design.'
              ></AnimatedText>
              <p className='my-4 text-base font-medium'>
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js and
                web development.
              </p>
              <div className='flex items-center self-start mt-2'>
                <Link
                  className='flex items-center bg-dark text-light p-2.5 px-6
                   rounded-lg text-lg font-semibold hover:bg-light
                    hover:text-dark border-2 border-solid border-transparent
                    
                   hover:border-dark dark:hover:border-light dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light'
                  href='/Web.pdf'
                  target={'_blank'}
                  download={true}
                >
                  Resume
                  <LinkArrow className={'w-6 ml-1'}></LinkArrow>
                </Link>
                <Link
                  className='dark:text-light ml-4 text-lg font-medium capitalize text-dark underline'
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
        <div className='absolute right-8 bottom-8 inline-block w-24'>
          <Image src={lightBulb} alt='marek' className='w-full h-auto'></Image>
        </div>
      </main>
    </>
  );
}
