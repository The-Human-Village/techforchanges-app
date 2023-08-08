import { parseApiResponse } from '@/utilities/parseAPIResponse'
import { pxToRem } from '@/utilities/pxToRem'
import { Text } from '@chakra-ui/react'

type Props = {
  text: string
}

export const RichText = ({ text }: Props) => {
  return (
    <Text
      color="gray.700"
      fontSize={pxToRem(14)}
      lineHeight={pxToRem(20)}
      dangerouslySetInnerHTML={{
        __html: parseApiResponse(text),
      }}
    />
  )
}
