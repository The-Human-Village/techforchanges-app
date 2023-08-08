import type { ServiceProvider as TServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ServiceProvider } from './service-provider/service-provider'

type Props = {
  title: string
  serviceProvider: TServiceProvider
}

export const ServiceProviderList = ({ title, serviceProvider }: Props) => {
  const router = useRouter()
  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Text
        color="gray.900"
        fontWeight={800}
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
      >
        {title}
      </Text>
      <Flex flexDir="column" gap={pxToRem(8)}>
        {[serviceProvider].map((item, index) => (
          <ServiceProvider
            key={`${item?.locale_uid}${index}`}
            serviceProvider={item}
            onClick={() => router.push(`/service-provider/${item?.locale_uid}`)}
          />
        ))}
      </Flex>
    </Flex>
  )
}
