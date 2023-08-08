import { pxToRem } from '@/utilities/pxToRem'

export const LinkStyles = {
  baseStyle: {
    transition: 'all 0.3s',
    fontWeight: 500,
    color: 'gray.500',
    _hover: {
      color: 'blue.800',
      textDecoration: 'none',
    },
    _activeLink: {
      color: 'blue.800',
    },
  },
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
      lineHeight: '1.75rem',
    },
  },
  variants: {
    light: {
      color: 'gray.300',
      _hover: {
        color: 'white.50',
        textDecoration: 'underline',
      },
    },
    btn: {
      background: 'blue.800',
      borderRadius: 'lg',
      paddingY: 1,
      paddingX: 2,
      color: 'white',
      _hover: {
        color: 'white',
      },
    },
    'btn-outline': {
      background: 'white',
      borderRadius: 'md',
      paddingY: 1,
      paddingX: 2,
      color: 'blue.800',
      border: '1px solid',
      borderColor: 'blue.800',
      _hover: {
        color: 'blue.900',
      },
    },
    blue: {
      color: 'blue.800',
      _hover: {
        color: 'blue.900',
        textDecoration: 'underline',
      },
    },
    'nav-link': {
      color: 'gray.400',
      fontSize: pxToRem(12),
      lineHeight: pxToRem(16),
      fontWeight: 500,
      display: 'flex',
      flexDir: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: pxToRem(6),
      borderTop: '3px solid',
      px: pxToRem(4),
      py: pxToRem(17),
      textAlign: 'center',
      _hover: {
        color: 'blue.800',
        textDecoration: 'none',
      },
    },
    'nav-link-desktop': {
      color: 'gray.800',
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
      paddingX: pxToRem(16),
      paddingY: pxToRem(14),
      display: 'flex',
      flexDir: 'column',
      flex: 1,
      textTransform: 'uppercase',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '3px solid',
      textAlign: 'center',
      _hover: {
        color: 'blue.800',
        textDecoration: 'none',
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
}
