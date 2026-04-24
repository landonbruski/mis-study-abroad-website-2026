/**
 * Brand tokens for UA MIS Portugal 2026.
 *
 * Use these constants when you build your own personal page. Every student page
 * should use the same palette, type, spacing, and motion values so the site
 * reads as one cohort and not twenty different websites stitched together.
 *
 * All values are also defined in CSS custom properties in `src/index.css` under
 * the `@theme` block, so you can use the matching Tailwind utility classes
 * (`bg-crimson-600`, `text-navy-700`, `font-display`, etc.) in JSX if you
 * prefer. This file exists as the JavaScript source of truth and for any
 * component that needs a token inline (e.g., an SVG fill or a motion color).
 */

export const brand = {
  name: 'UA MIS Portugal 2026',
  programme: 'University of Alabama MIS',
  cohortYear: 2026,

  colors: {
    crimson: {
      50:  '#FBE9EC',
      100: '#F3C3CB',
      200: '#E48796',
      500: '#B0223A',
      600: '#9E1B32', // primary accent, brand red
      700: '#7A1326',
      800: '#560B1A', // footer
    },
    cream: {
      50:  '#FCF8F1', // page background
      100: '#F7EFE1', // alternating section background
      200: '#EFE2C9',
      300: '#E2CFA8',
    },
    navy: {
      500: '#14304F',
      700: '#0B1F3A', // body text
      800: '#081629',
      900: '#050D1B',
    },
    azulejo: {
      300: '#8BB5D1',
      500: '#3F7AA3', // Porto accent
      700: '#1F4E75',
    },
    gold: {
      400: '#D9A441', // footer accent
      500: '#B8862A',
    },
  },

  fonts: {
    display: "'Fraunces', 'Playfair Display', Georgia, serif",
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },

  radius: {
    sm: '0.25rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '1.75rem', // card radius used across the site
    '3xl': '2rem',    // hero / feature card radius
    pill: '9999px',
  },

  shadow: {
    soft: '0 15px 40px -20px rgba(158, 27, 50, 0.35)',
    deep: '0 30px 60px -20px rgba(11, 31, 58, 0.35), 0 10px 20px -10px rgba(11, 31, 58, 0.25)',
  },

  motion: {
    easeOut: [0.2, 0.65, 0.3, 1],
    durationSm: 0.35,
    durationMd: 0.7,
    durationLg: 1,
    spring: { type: 'spring', stiffness: 260, damping: 22 },
  },

  spacing: {
    sectionPyMobile: 'py-20',   // mobile vertical padding per section
    sectionPyDesktop: 'md:py-24',
    containerMax: 'max-w-7xl',
    pagePx: 'px-5 md:px-10',
  },

  copy: {
    voice: 'First-person plural, warm, specific, lightly self-aware. Avoid em dashes. No marketing-speak.',
    audience: 'Friends and family, after the trip.',
  },
}

export const {
  colors,
  fonts,
  radius,
  shadow,
  motion,
  spacing,
  copy,
} = brand

export default brand
