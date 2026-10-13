import { motion } from 'motion/react'
import { type ReactNode, useMemo } from 'react'
import { useShouldReduceMotion } from '../../hooks/useShouldReduceMotion'

interface PageTransitionProps {
  children: ReactNode
}

const fullVariants = {
  initial: {
    opacity: 0,
    y: '4%',
  },
  animate: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: '-4%',
    transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] as const },
  },
}

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useShouldReduceMotion()

  const variants = useMemo(
    () => (shouldReduceMotion ? reducedVariants : fullVariants),
    [shouldReduceMotion]
  )

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  )
}