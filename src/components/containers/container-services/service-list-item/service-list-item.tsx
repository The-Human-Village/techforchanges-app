import { CustomSVG } from '@/components/shared/custom-svg/CustomSVG'
import { ArrowRight } from '@/components/shared/icon/icon'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  title: string
  iconUrl?: string
  locale_uid: string | number
}

export const ServiceListItem = ({ title, iconUrl, locale_uid }: Props) => {
  return (
    <Link as={NextLink} href={`/services/details/${locale_uid}`} height="auto">
      <Flex
        w="full"
        justifyContent="flex-start"
        minH={pxToRem(56)}
        borderRadius={pxToRem(8)}
        border="1px solid"
        borderColor="gray.200"
        alignItems="center"
        gap={pxToRem(12)}
        p={pxToRem(16)}
        bg="white"
      >
        {iconUrl && (
          <CustomSVG
            url={iconUrl}
            color="blue.800"
            w={pxToRem(24)}
            h={pxToRem(24)}
          />
        )}
        <Text fontWeight={700} alignItems="center" color="gray.800">
          {title}
        </Text>
        <Flex flex={1} justifyContent="flex-end">
          <ArrowRight fill="blue.900" />
        </Flex>
      </Flex>
    </Link>
  )
}
