import { pxToRem } from '@/utilities/pxToRem'

export const ButtonStyles = {
  baseStyles: {
    fontWeight: 600,
    fontSize: 'md',
    lineHeight: '1.5',
  },
  colors: {
    'blue.900': 'blue.900',
  },
  sizes: {
    md: {
      padding: '1rem',
    },
    lg: {
      padding: '1.5rem 1.875rem',
    },
  },
  variants: {
    primary: {
      bg: 'blue.700',
      backgroundColor: 'blue.700',
      color: 'white',
      _hover: {
        _disabled: {
          bg: 'blue.100',
        },
      },
      _disabled: {
        bg: 'blue.100',
        backgroundColor: 'blue.100',
        opacity: 1,
      },
      _focus: {
        background: 'inherited',
      },
    },
    secondary: {
      bg: 'gray.100',
      color: 'gray.900',
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
      fontWeight: 400,
      borderRadius: pxToRem(4),
      py: pxToRem(6),
      px: `${pxToRem(12)} !important`,
      _hover: {
        bg: 'gray.200',
      },
    },
    ghost: {
      _hover: {
        bg: 'inherit',
      },
      _active: {
        bg: 'inherit',
      },
    },
    transparent: {
      bg: 'transparent',
      padding: 0,
    },
    card: {
      height: 'unset',
      p: 0,
      whiteSpace: 'unset',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      textAlign: 'left',
      borderRadius: 0,
    },
    onboarding: {
      height: pxToRem(48),
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 600,
      bg: 'blue.700',
      color: 'white',
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
}
