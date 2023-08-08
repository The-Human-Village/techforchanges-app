import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { CustomSVG } from '@/components/shared/custom-svg/CustomSVG'
import { pxToRem } from '@/utilities/pxToRem'
import { Checkbox, CheckboxGroup, Flex, Grid, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

export type Props = {
  name: string
  dimensions: Dimension[]
  value: string[]
  onChange: (checkedItems: string[]) => void
}

export const DimensionCheckbox = ({ name, dimensions, onChange, value }) => {
  const isDimensionSelected = useCallback(
    (dimension) => {
      return value.includes(dimension?.attributes?.locale_uid)
    },
    [value],
  )

  const handleOnChange = useCallback(
    (dimension: Dimension) => {
      if (isDimensionSelected(dimension)) {
        onChange(value.filter((v) => v !== dimension?.attributes?.locale_uid))
      } else {
        onChange([...value, dimension?.attributes?.locale_uid])
      }
    },
    [isDimensionSelected, onChange, value],
  )

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(205px, 1fr))"
      gap={pxToRem(12)}
    >
      <CheckboxGroup onChange={onChange}>
        {dimensions?.map((dimension, index) => (
          <Checkbox
            variant="card"
            name={`${name}[${index}]`}
            checked={isDimensionSelected(dimension)}
            onChange={() => handleOnChange(dimension)}
            key={dimension?.attributes?.locale_uid}
            required={false}
          >
            <Flex alignItems="center" flexDir="column" gap={pxToRem(10)}>
              <CustomSVG
                url={dimension?.attributes?.icon?.data?.attributes?.url}
                w={pxToRem(24)}
                h={pxToRem(24)}
                color={isDimensionSelected(dimension) ? 'blue.800' : 'gray.500'}
              ></CustomSVG>
              <Text>{dimension?.attributes?.title}</Text>
            </Flex>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Grid>
  )
}
