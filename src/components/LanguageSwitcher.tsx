import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');

  useEffect(() => {
    const language = isEnglish ? 'en' : 'pl';
    i18n.changeLanguage(language);
    router.push(router.pathname, router.asPath, { locale: language });
  }, [isEnglish, i18n, router]);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className='flex items-center justify-center p-2 bg-light dark:bg-dark'>
      <div className='relative w-24 h-10 rounded-full bg-dark dark:bg-primaryDark'>
        <div
          className={`absolute top-1 left-1 w-10 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md transform duration-300 ease-in-out ${
            isEnglish ? 'translate-x-12' : 'translate-x-0'
          }`}
        />
        <button
          className='absolute inset-y-0 left-0 flex items-center justify-center w-1/2 h-full text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300 ease-in-out focus:outline-none'
          onClick={toggleLanguage}
        >
          PL
        </button>
        <button
          className='absolute inset-y-0 right-0 flex items-center justify-center w-1/2 h-full text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300 ease-in-out focus:outline-none'
          onClick={toggleLanguage}
        >
          EN
        </button>
      </div>
    </div>
  );
};
