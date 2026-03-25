import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function AnimateIn({ children, delay = 0, className, y = 30 }: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      variants={{
        hidden: { opacity: 0, y },
        visible: (i: number = 0) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateInGroup({ children, className }: { children: React.ReactNode[]; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={className}>
      {(children as React.ReactNode[]).map((child, i) => (
        <motion.div
          key={i}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={i}
          variants={fadeUpVariants}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
