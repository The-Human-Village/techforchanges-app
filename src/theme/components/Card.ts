export const CardStyles = {
  variants: {
    elevated: {
      container: {
        background: 'white',
        boxShadow: '0px 5px 20px rgba(13, 66, 119, 0.06)',
        borderRadius: '1rem',
      },
      body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultProps: {
    variant: 'elevated',
    size: 'xl',
  },
}
