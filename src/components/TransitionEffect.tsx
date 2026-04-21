import { motion } from "framer-motion";

type Props = { skipEntry?: boolean; skipExit?: boolean };

const instant = { duration: 0 };
const noChange = { x: "0%", width: "0%" };

export const TransitionEffect = ({ skipEntry = false, skipExit = false }: Props) => {
  const exitPrimary = skipExit ? { ...noChange, transition: instant } : { x: ["0%", "100%"], width: ["0%", "100%"] };
  const exitOther = skipExit ? { ...noChange, transition: instant } : undefined;

  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-primary"
        initial={skipEntry ? false : { x: "100%", width: "100%" }}
        animate={noChange}
        exit={exitPrimary}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-light"
        initial={skipEntry ? false : { x: "100%", width: "100%" }}
        animate={noChange}
        exit={exitOther}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-dark"
        initial={skipEntry ? false : { x: "100%", width: "100%" }}
        animate={noChange}
        exit={exitOther}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
      />
    </>
  );
};
