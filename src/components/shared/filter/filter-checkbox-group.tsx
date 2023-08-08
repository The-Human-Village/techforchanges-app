import type { FilterType } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Checkbox, CheckboxGroup, Flex, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

export type Props = {
  title: string
  name: string
  items: FilterType[]
  value: string[]
  onChange: (checkedItems: string[]) => void
}

export const FilterCheckboxGroup = ({
  title,
  name,
  items,
  onChange,
  value,
}: Props) => {
  const isSelected = useCallback(
    (filter: FilterType) =>
      value.includes(filter?.locale_uid?.toString() || filter?.uid?.toString()),
    [value],
  )

  const handleOnChange = useCallback(
    (filter: FilterType) => {
      const filterId = filter?.locale_uid?.toString() || filter?.uid?.toString()
      const updatedValue = isSelected(filter)
        ? value.filter((v) => v !== filterId)
        : [...value, filterId]

      onChange(updatedValue)
    },
    [isSelected, onChange, value],
  )

  return (
    <Box>
      <Text
        fontSize={pxToRem(12)}
        lineHeight={pxToRem(16)}
        mb={pxToRem(12)}
        color="gray.800"
        textTransform="capitalize"
      >
        {title}
      </Text>
      <Flex gap={pxToRem(12)} flexWrap="wrap">
        <CheckboxGroup onChange={onChange} value={value}>
          {items?.map((item) => (
            <Checkbox
              variant="badge"
              name={`${name}[${item?.locale_uid || item?.uid}]`}
              checked={isSelected(item)}
              onChange={() => handleOnChange(item)}
              key={item?.locale_uid || item?.uid}
              value={item?.locale_uid || item?.uid}
              required={false}
              flex="0 0 auto"
            >
              <Flex alignItems="center" flexDir="column" gap={pxToRem(10)}>
                <Text fontSize={pxToRem(14)} lineHeight={pxToRem(20)}>
                  {item.title}
                </Text>
              </Flex>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Flex>
    </Box>
  )
}
