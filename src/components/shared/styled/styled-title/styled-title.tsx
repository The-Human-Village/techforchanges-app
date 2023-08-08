import { pxToRem } from '@/utilities/pxToRem'
import { Text } from '@chakra-ui/react'

export const StyledTitle = (props) => {
  return (
    <Text
      fontWeight={800}
      lineHeight={{ base: pxToRem(28), xl: pxToRem(32) }}
      fontSize={{ base: pxToRem(20), xl: pxToRem(24) }}
      color="gray.900"
      {...props}
    />
  )
}
