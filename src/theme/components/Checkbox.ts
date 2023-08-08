import { pxToRem } from '@/utilities/pxToRem'

export const CheckboxStyles = {
  variants: {
    lang: {
      container: {
        border: '1px solid',
        borderColor: 'gray.200',
        backgroundColor: 'white.50',
        borderRadius: '8px',
        color: 'gray.700',
        height: '40px',
        _checked: {
          backgroundColor: 'blue.50',
          border: '1px solid',
          borderColor: 'blue.700',
        },
      },
      label: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    badge: {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: pxToRem(6),
        px: pxToRem(12),
        borderRadius: pxToRem(4),
      },
      control: {
        _checked: {
          bg: 'blue.50',
          borderColor: 'blue.700',
          color: 'blue.800',
          _hover: {
            bg: 'blue.50',
            borderColor: 'blue.700',
          },
        },
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: pxToRem(4),
        borderWidth: 1,
      },
      icon: {
        display: 'none',
      },
      label: {
        fontWeight: 500,
        zIndex: '2',
        color: 'gray.500',
        ml: '0 !important',
        _checked: {
          fontWeight: 600,
          color: 'blue.800',
        },
      },
    },
    card: {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: pxToRem(100),
        padding: pxToRem(10),
      },
      control: {
        _checked: {
          bg: 'blue.50',
          borderColor: 'blue.700',
          color: 'blue.800',
          _hover: {
            bg: 'blue.50',
            borderColor: 'blue.700',
          },
        },
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        borderWidth: 1,
        bg: 'white',
      },
      icon: {
        display: 'none',
      },
      label: {
        fontWeight: '500',
        zIndex: '2',
        color: 'gray.500',
        textAlign: 'center',
        _checked: {
          fontWeight: 700,
          color: 'blue.800',
        },
      },
    },
  },
  defaultProps: {
    variant: 'lang',
  },
}
