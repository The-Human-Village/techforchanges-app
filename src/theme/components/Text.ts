import { pxToRem } from '@/utilities/pxToRem'

export const TextStyles = {
  sizes: {
    sm: {
      fontSize: 'sm',
      lineHeight: '1.25rem',
    },
    md: {
      fontSize: 'md',
      lineHeight: '1.5rem',
    },
    lg: {
      fontSize: 'lg',
    },
  },
  defaultProps: {
    size: 'md',
  },
  variants: {
    regular: {
      color: 'gray.800',
      maxWidth: 532,
    },
    onboardingTitle: {
      color: 'gray.900',
      fontSize: pxToRem(30),
      lineHeight: pxToRem(36),
      fontWeight: 800,
    },
  },
}
