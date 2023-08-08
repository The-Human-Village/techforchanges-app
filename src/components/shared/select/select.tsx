import { pxToRem } from '@/utilities/pxToRem'
import { useBreakpointValue, useTheme } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import type { Props as SelectProps } from 'react-select'
import ReactSelect from 'react-select'

export const Select = (props: PropsWithChildren<SelectProps>) => {
  const theme = useTheme()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const styles = {
    menu: (provided) => ({
      ...provided,
      width: isMobile ? '100%' : pxToRem(200),
      padding: isMobile ? `0 0 ${pxToRem(12)}` : pxToRem(12),
      paddingLeft: isMobile ? '0' : pxToRem(28),
      borderRadius: isMobile ? '0' : pxToRem(12),
      border: isMobile ? 'none' : `1px solid ${theme.colors.gray[300]}`,
      boxShadow: 'none',
      position: isMobile ? 'relative' : 'absolute',
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'inherit',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        color: 'white',
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: 'inherit',
      padding: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      color: state.isSelected ? theme.colors.blue[800] : theme.colors.gray[500],
      fontWeight: state.isSelected ? 800 : 400,
      '&:hover': {
        color: state.isSelected
          ? theme.colors.blue[800]
          : theme.colors.blue[700],
        fontWeight: state.isSelected ? 800 : 400,
      },
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      padding: `${pxToRem(4)} ${pxToRem(8)}`,
    }),
  }
  return <ReactSelect styles={styles} {...props} />
}
