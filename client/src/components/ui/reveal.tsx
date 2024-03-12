import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

export const Reveal = ({ children, className }: RevealProps) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
