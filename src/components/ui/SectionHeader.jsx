import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export function SectionHeader({
  number,
  kicker,
  title,
  subtitle,
  tone = 'light',
  align = 'left',
  children,
  className,
}) {
  const isDark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <span
          className={cn(
            'font-display text-sm leading-none tabular-nums tracking-tight',
            isDark ? 'text-cream-50/55' : 'text-navy-700/45',
          )}
        >
          {number}
        </span>
        <span
          className={cn(
            'h-px w-8',
            isDark ? 'bg-crimson-400' : 'bg-crimson-600',
          )}
        />
        <span
          className={cn(
            'text-[11px] font-medium uppercase tracking-[0.24em]',
            isDark ? 'text-crimson-100' : 'text-crimson-600',
          )}
        >
          {kicker}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.65, 0.3, 1] }}
        className={cn(
          'max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl',
          isDark ? 'text-cream-50' : 'text-navy-700',
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn(
            'mt-1 max-w-2xl text-base leading-relaxed text-pretty md:text-lg',
            isDark ? 'text-cream-50/80' : 'text-navy-700/75',
          )}
        >
          {subtitle}
        </motion.p>
      )}

      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}
