import React from "react";
import Link from "next/link";

const SkipToContent: React.FC = () => {
  return (
    <Link
      href="#main-content"
      className="absolute -top-40 left-4 z-50 px-4 py-2 bg-dark text-light dark:bg-light dark:text-dark rounded-lg font-semibold outline-none ring-2 ring-primary focus:top-4 transition-top duration-200"
    >
      Skip to main content
    </Link>
  );
};

export default SkipToContent;

