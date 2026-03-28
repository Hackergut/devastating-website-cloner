"use client";

import { motion, Variants } from 'framer-motion';

// Animation variants extracted from Ledger.com
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.3, ease: 'easeIn' } 
  }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 80 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    y: 80,
    transition: { duration: 0.3, ease: 'easeIn' } 
  }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -80 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' } 
  }
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const bannerGradient = {
  initial: { backgroundPosition: '0% 50%' },
  animate: { 
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { 
      duration: 8,
      repeat: Infinity,
      ease: 'linear'
    } 
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

export const hoverLift = {
  whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' },
  transition: { duration: 0.2 }
};

// Scroll-triggered animation wrapper
export const ScrollReveal = ({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      initial: { opacity: 0, y: 80 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, delay, ease: 'easeOut' } 
      }
    }}
  >
    {children}
  </motion.div>
);

// Animated number counter
export const AnimatedNumber = ({ 
  value, 
  duration = 2 
}: { 
  value: number;
  duration?: number;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  );
};

// Staggered list animation
export const StaggeredList = ({ 
  children, 
  delay = 0.1 
}: { 
  children: React.ReactNode[];
  delay?: number;
}) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={{
      animate: {
        transition: {
          staggerChildren: delay
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeInUp}
  >
    {children}
  </motion.div>
);

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  bannerGradient,
  hoverScale,
  hoverLift,
  ScrollReveal,
  AnimatedNumber,
  StaggeredList,
  StaggerItem
};