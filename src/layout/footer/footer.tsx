import { MOBILE_MAX_WIDTH } from '@/constants'
import { BottomToolbar } from '@/layout/footer/bottom-toolbar/bottom-toolbar'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box
      as="footer"
      w="100%"
      backgroundColor="white"
      position="fixed"
      bottom={0}
      zIndex={10}
    >
      <Flex maxW={pxToRem(MOBILE_MAX_WIDTH)} m="0 auto" w="full">
        <BottomToolbar />
      </Flex>
    </Box>
  )
}
