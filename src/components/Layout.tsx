import React from "react";

type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light dark:bg-dark p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32 lg:pt-16 xl:pt-16    ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
