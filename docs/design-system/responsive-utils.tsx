// Auto-generated responsive utilities
// Based on extracted design system

import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('lg');
  
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    width: typeof window !== 'undefined' ? window.innerWidth : 1024
  };
}

// Responsive image component
export function ResponsiveImage({ 
  src, 
  alt, 
  mobileSrc, 
  tabletSrc, 
  desktopSrc 
}: {
  src: string;
  alt: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
}) {
  const { breakpoint } = useBreakpoint();
  
  const getSource = () => {
    if (breakpoint === 'xs' || breakpoint === 'sm') return mobileSrc || src;
    if (breakpoint === 'md') return tabletSrc || src;
    return desktopSrc || src;
  };
  
  return (
    <img 
      src={getSource()} 
      alt={alt}
      className="w-full h-auto"
    />
  );
}

// Responsive typography utility
export const responsiveTypography = {
  heading1: {
    mobile: 'text-3xl',
    tablet: 'text-4xl',
    desktop: 'text-5xl'
  },
  heading2: {
    mobile: 'text-2xl',
    tablet: 'text-3xl',
    desktop: 'text-4xl'
  },
  body: {
    mobile: 'text-sm',
    tablet: 'text-base',
    desktop: 'text-lg'
  }
} as const;
