import { pxToRem } from '@/utilities/pxToRem'

export const InputStyles = {
  variants: {
    outline: {
      field: {
        _placeholder: {
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
          fontWeight: 500,
          color: 'gray.500',
        },
      },
    },
  },
  defaultProps: {
    variant: 'outline',
  },
}
