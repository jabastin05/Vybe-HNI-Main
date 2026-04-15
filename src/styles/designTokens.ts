/**
 * VYBE Design System Tokens
 * Extracted from SignUp screen as the reference design
 * Use these tokens consistently across all screens
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary Colors (Black/White depending on theme)
  primary: {
    light: '#000000',      // Black (light mode)
    dark: '#FFFFFF',       // White (dark mode)
  },

  // Background Colors
  background: {
    page: {
      light: '#F2F2F2',
      dark: '#0a0a0a',
    },
    card: {
      light: '#FFFFFF',
      dark: '#111111',
    },
    input: {
      light: 'rgb(0, 0, 0, 0.02)',      // black/[0.02]
      dark: 'rgb(255, 255, 255, 0.02)',  // white/[0.02]
    },
    hover: {
      light: 'rgb(0, 0, 0, 0.05)',       // black/[0.05]
      dark: 'rgb(255, 255, 255, 0.05)',  // white/[0.05]
    },
  },

  // Text Colors
  text: {
    primary: {
      light: '#000000',
      dark: 'rgba(255, 255, 255, 0.95)',
    },
    secondary: {
      light: 'rgba(0, 0, 0, 0.6)',
      dark: 'rgba(255, 255, 255, 0.6)',
    },
    tertiary: {
      light: 'rgba(0, 0, 0, 0.4)',
      dark: 'rgba(255, 255, 255, 0.4)',
    },
    placeholder: {
      light: 'rgba(0, 0, 0, 0.3)',
      dark: 'rgba(255, 255, 255, 0.3)',
    },
  },

  // Border Colors
  border: {
    light: {
      subtle: 'rgba(0, 0, 0, 0.05)',     // black/5
      default: 'rgba(0, 0, 0, 0.1)',     // black/10
      strong: 'rgba(0, 0, 0, 0.2)',      // black/20
    },
    dark: {
      subtle: 'rgba(255, 255, 255, 0.05)',
      default: 'rgba(255, 255, 255, 0.1)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // Status Colors
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },

  // Semantic Colors
  error: {
    background: 'rgba(239, 68, 68, 0.05)',   // red-500/5
    border: 'rgba(239, 68, 68, 0.1)',        // red-500/10
    text: 'rgb(248, 113, 113)',              // red-400
  },
  info: {
    background: 'rgba(59, 130, 246, 0.05)',  // blue-500/5
    border: 'rgba(59, 130, 246, 0.1)',       // blue-500/10
    text: 'rgb(96, 165, 250)',               // blue-400
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  fontFamily: {
    body: 'system-ui, -apple-system, sans-serif',
  },

  // Font Sizes (based on Tailwind classes used)
  fontSize: {
    h1: 'var(--text-h1, 2rem)',           // text-h1 (from tailwind.config)
    body: 'var(--text-body, 1rem)',        // text-body
    small: 'var(--text-small, 0.875rem)',  // text-small
    caption: 'var(--text-caption, 0.75rem)', // text-caption
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',     // tracking-wider
    widest: '0.1em',     // tracking-widest
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  // Padding - used for form cards, containers
  card: {
    sm: '1rem',       // p-4 (mobile)
    md: '1.25rem',    // p-5 (tablet)
    lg: '1.5rem',     // p-6 (desktop)
  },

  // Input Fields
  input: {
    padding: {
      x: '0.75rem',    // px-3
      y: '0.625rem',   // py-2.5 (10px)
    },
    height: '2.75rem', // ~44px with py-2.5
  },

  // Button Fields
  button: {
    padding: {
      x: '1.5rem',     // px-6
      y: '0.625rem',   // py-2.5
    },
    height: '2.75rem', // ~44px with py-2.5
  },

  // Gap/Spacing between elements
  gap: {
    xs: '0.5rem',      // gap-2
    sm: '0.75rem',     // gap-3
    md: '1rem',        // gap-4
    lg: '1.5rem',      // gap-6
  },

  // Margins
  margin: {
    xs: '0.375rem',    // mb-1.5
    sm: '0.75rem',     // mb-3
    md: '1rem',        // mb-4
    lg: '1.5rem',      // mb-6
  },
};

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  sm: '0.5rem',     // rounded (default)
  md: '0.5rem',     // rounded-lg
  lg: '0.75rem',    // rounded-xl
  full: '9999px',   // rounded-full
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',  // shadow-lg (used on buttons)
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // PRIMARY CALL-TO-ACTION BUTTONS (Reference: SignUp screen)
  cta: {
    padding: {
      x: '1.5rem',       // px-6
      y: '0.625rem',     // py-2.5
    },
    height: '2.75rem',   // ~44px
    borderRadius: '0.5rem', // rounded-lg (SignUp reference)
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // shadow-lg
    light: {
      background: '#000000',
      text: '#FFFFFF',
      hover: 'rgba(0, 0, 0, 0.9)',
      disabled: 'rgba(0, 0, 0, 0.5)',
    },
    dark: {
      background: '#FFFFFF',
      text: '#000000',
      hover: 'rgba(255, 255, 255, 0.9)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    transition: 'all 0.2s ease',
  },

  // PRIMARY BUTTONS (general)
  button: {
    primary: {
      light: {
        background: '#000000',
        text: '#FFFFFF',
        hover: 'rgba(0, 0, 0, 0.9)',
        disabled: 'rgba(0, 0, 0, 0.5)',
      },
      dark: {
        background: '#FFFFFF',
        text: '#000000',
        hover: 'rgba(255, 255, 255, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
    },
    secondary: {
      light: {
        background: '#FFFFFF',
        border: 'rgba(0, 0, 0, 0.1)',
        text: '#000000',
        hover: 'rgba(0, 0, 0, 0.02)',
      },
      dark: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        text: '#FFFFFF',
        hover: 'rgba(255, 255, 255, 0.1)',
      },
    },
    padding: spacing.button.padding,
    height: spacing.button.height,
    borderRadius: borderRadius.md,
  },

  // INPUT FIELDS
  input: {
    light: {
      background: 'rgba(0, 0, 0, 0.02)',
      border: 'rgba(0, 0, 0, 0.1)',
      borderFocus: 'rgba(0, 0, 0, 0.2)',
      text: '#000000',
      placeholder: 'rgba(0, 0, 0, 0.3)',
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderFocus: 'rgba(255, 255, 255, 0.2)',
      text: 'rgba(255, 255, 255, 0.95)',
      placeholder: 'rgba(255, 255, 255, 0.3)',
    },
    padding: spacing.input.padding,
    height: spacing.input.height,
    borderRadius: borderRadius.md,
  },

  // CARDS (Reference: CaseManagement screen)
  card: {
    light: {
      background: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.05)',
    },
    dark: {
      background: '#0a0a0a',
      border: 'rgba(255, 255, 255, 0.05)',
    },
    padding: spacing.card,
    borderRadius: borderRadius.lg,
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },

  // HEADERS (Reference: MyProperties screen)
  header: {
    light: {
      background: '#FFFFFF',
      borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    dark: {
      background: '#1A1A1A',
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    borderBottom: 'border-b border-black/5 dark:border-white/10',
    padding: {
      vertical: '1rem',    // py-4
      verticalMd: '1.5rem', // md:py-6
      horizontal: 'container-padding',
    },
    label: {
      fontSize: 'text-caption',
      fontWeight: 'font-normal',
      letterSpacing: 'tracking-[0.05em]',
      textTransform: 'uppercase',
      light: '#000000/40',
      dark: 'rgba(255, 255, 255, 0.5)',
    },
    title: {
      fontSize: 'text-h1',
      fontWeight: 'font-normal',
      letterSpacing: 'tracking-tight',
      light: '#000000',
      dark: 'rgba(255, 255, 255, 0.95)',
    },
    description: {
      fontSize: 'text-small',
      light: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(255, 255, 255, 0.6)',
      marginTop: 'mt-1',
    },
  },
};

// ============================================================================
// TAILWIND CLASS MAPPINGS (for reference)
// ============================================================================

export const tailwindClasses = {
  // CTA Button Classes (from SignUp reference)
  ctaPrimary: 'w-full bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all text-small font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',

  // Button Classes
  buttonPrimary: 'bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all text-small font-medium shadow-lg',
  buttonSecondary: 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-small text-black dark:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.05] transition-all',
  buttonDisabled: 'disabled:opacity-50 disabled:cursor-not-allowed',

  // Input Classes
  inputBase: 'w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-lg text-small text-black dark:text-white/95 placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors',
  inputWithIcon: 'pl-10 pr-3 py-2.5',

  // Card Classes (from CaseManagement reference)
  cardBase: 'bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-xl p-4 md:p-5 lg:p-6',
  cardWithBorder: 'bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6',

  // Header Classes (from MyProperties reference)
  headerBase: 'border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]',
  headerLabel: 'text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2',
  headerTitle: 'text-h1 tracking-tight text-black dark:text-white',
  headerDescription: 'text-small text-black/50 dark:text-white/60 mt-1',
  headerContent: 'max-w-[1200px] mx-auto container-padding py-4 md:py-6',

  // Text Classes
  textH1: 'text-h1 tracking-tight text-black dark:text-white/95',
  textBody: 'text-body text-black dark:text-white/95',
  textSmall: 'text-small text-black dark:text-white/95',
  textCaption: 'text-caption text-black/60 dark:text-white/60',
  textCaptionUppercase: 'text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50',

  // Layout Classes
  pageBackground: 'min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300',
  centerContainer: 'flex items-center justify-center min-h-screen p-4 md:p-5 lg:p-6',
  maxWidthContainer: 'w-full max-w-md',

  // Space Classes
  spaceY3: 'space-y-3',
  spaceY2: 'space-y-2',
  gap2: 'gap-2',
  gap3: 'gap-3',
  gap6: 'gap-6',
  mb1_5: 'mb-1.5',
  mb3: 'mb-3',
  mb6: 'mb-6',
  mt4: 'mt-4',
  mt5: 'mt-5',
  mt6: 'mt-6',
  pt4: 'pt-4',
  pb1: 'pb-1',
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  tailwindClasses,
};
