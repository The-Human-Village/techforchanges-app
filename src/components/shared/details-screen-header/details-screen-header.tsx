import { pxToRem } from '@/utilities/pxToRem'
import { Box } from '@chakra-ui/react'

type Props = {
  bgImage: string
  backButton: React.ReactNode
}

export const DetailsScreenHeader = ({ bgImage, backButton }: Props) => {
  return (
    <Box
      bgSize="cover"
      bgPosition="center"
      position="relative"
      bgImage={bgImage}
      w="100%"
      h={pxToRem(180)}
    >
      <Box p={pxToRem(16)}>{backButton}</Box>
    </Box>
  )
}
