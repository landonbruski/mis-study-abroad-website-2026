import { motion } from 'framer-motion'

export function FadeIn({ children, delay = 0, y = 24, className, as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
