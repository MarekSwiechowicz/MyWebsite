import React from 'react';

type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light p-8 md:p-12 lg:p-16 xl:p-24 dark:bg-dark ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
