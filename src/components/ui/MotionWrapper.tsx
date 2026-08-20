'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FadeIn = ({ children, delay = 0, duration = 0.5, className = '' }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children, delay = 0, duration = 0.5, className = '' }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, staggerDelay = 0.1, delayChildren = 0, className = '' }: { children: React.ReactNode, staggerDelay?: number, delayChildren?: number, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delayChildren,
        },
      },
    }}
    initial="hidden"
    animate="show"
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const PageTransition = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, filter: 'blur(10px)' }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);
