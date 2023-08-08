export const AccordionStyles = {
  parts: ['container', 'button'],
  baseStyle: {
    container: {
      bg: 'white.100',
      border: 'none',
    },
    button: {
      fontWeight: 700,
      color: 'gray.800',
      padding: 0,
      '&[aria-expanded="true"]': {
        bg: 'white.100',
      },
      _hover: {
        bg: 'white.100',
      },
    },
  },
}
