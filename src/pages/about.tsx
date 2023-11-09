import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import React from 'react';
import profilePic from '../../public/profilePic.png';
import Image from 'next/image';

const about = () => {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name='description' content='any description'></meta>
      </Head>
      <main className='flex w-full flex-col items-center justify-center'>
        <Layout className='pt-16'>
          <AnimatedText
            className='mb-16'
            text='Passion Fuels Purpose!'
          ></AnimatedText>
          <div className='grid w-full grid-cols-8 gap-16'>
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
            {/* <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8'>
              <div className=' top-0 -right-3 -z-10 '>
                <Image
                  src={profilePic}
                  alt='Marek'
                  className='w-full h-auto rounded-2xl'
                />
              </div>
            </div> */}
            <div className=' col-span-3 p-8 relative bg-transparent rounded-xl overflow-hidden border-4 border-dark bg-light shadow-2xl'>
              <Image
                src={profilePic} // Replace with your image path
                alt='Descriptive Alt Text'
                className='w-full h-auto' // Apply the same border-radius as the div
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default about;
