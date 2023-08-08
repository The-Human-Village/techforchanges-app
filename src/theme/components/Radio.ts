export const RadioStyles = {
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
    location: {
      container: {
        height: '40px',
      },
      control: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'none',
        background: 'none',
        borderColor: 'none',
        border: 'none',
        _checked: {
          background: 'green.500',
          borderColor: 'green.500',
          _before: {
            content: `"L"`,
            display: 'inline-block',
            position: 'relative',
            transform: 'scaleX(-1) rotate(-35deg)',
            fontSize: '12px',
            marginBottom: '2px',
            width: 'auto',
            height: 'auto',
            borderRadius: 'unset',
            background: 'none',
          },
        },
        _focus: {
          border: 'unset',
          boxShadow: 'unset',
        },
      },
      label: {
        _checked: {
          fontWeight: 700,
        },
      },
    },
  },
  defaultProps: {
    variant: 'lang',
  },
}
