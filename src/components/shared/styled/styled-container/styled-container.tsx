import { CONTENT_MAX_WIDTH } from '@/constants'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex } from '@chakra-ui/react'

export const StyledContainer = (props) => {
  return (
    <Flex
      flexDir="column"
      mx="auto"
      mt={{ base: pxToRem(24), xl: pxToRem(100) }}
      maxW={{ xl: pxToRem(CONTENT_MAX_WIDTH) }}
      w="full"
      {...props}
    />
  )
}
