import { Redirect } from '@/components/shared/icon/icon'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  title: string
  text?: string
  href: string
  onClick: () => void
}
export const BoxRedirectContainer = ({ title, text, href, onClick }: Props) => {
  return (
    <Link as={NextLink} href={href} onClick={onClick}>
      <Box
        bgColor="blue.700"
        color="white"
        p={pxToRem(12)}
        borderRadius={pxToRem(8)}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            as="h4"
            fontSize={pxToRem(16)}
            lineHeight={pxToRem(24)}
            fontWeight={600}
          >
            {title}
          </Heading>
          <Redirect fill="white" w={pxToRem(20)} h={pxToRem(20)} />
        </Flex>

        {text && (
          <Text
            fontSize={pxToRem(14)}
            lineHeight={pxToRem(20)}
            fontWeight={400}
          >
            {text}
          </Text>
        )}
      </Box>
    </Link>
  )
}
