// Auto-generated Framer Motion components
import { motion, Variants } from 'framer-motion';

// Fade animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: 80, transition: { duration: 0.3 } }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

// Stagger animations
export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

// Special animations
export const bannerGradient = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 8, repeat: Infinity, ease: 'linear' }
  }
};

export const hoverLift = {
  whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }
};

export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  staggerContainer,
  bannerGradient,
  hoverLift,
  dropdownVariants
};
