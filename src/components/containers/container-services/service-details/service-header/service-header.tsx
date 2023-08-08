import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Image, Text } from '@chakra-ui/react'

type Props = {
  title: string
  imageUrl: string
}

export const ServiceHeader = ({ title, imageUrl }: Props) => {
  return (
    <Flex justifyContent="space-between" gap={pxToRem(10)}>
      <Text
        color="blue.800"
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
        fontWeight={800}
      >
        {title}
      </Text>
      <Image
        src={imageUrl}
        alt={title}
        w={{ base: pxToRem(156), xl: pxToRem(207) }}
        h={{ base: pxToRem(135), xl: pxToRem(160) }}
        borderTopLeftRadius={pxToRem(8)}
        borderTopRightRadius={pxToRem(8)}
      />
    </Flex>
  )
}
