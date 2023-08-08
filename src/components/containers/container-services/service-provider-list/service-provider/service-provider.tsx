import type { ServiceProvider as TServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'
import { ArrowRight, Phone } from '@/components/shared/icon/icon'
import { pxToRem } from '@/utilities/pxToRem'
import { Button, Flex, Image, Link, Text } from '@chakra-ui/react'

type Props = {
  serviceProvider: TServiceProvider
  onClick: (id: string | number) => void
}

export const ServiceProvider = ({ serviceProvider, onClick }: Props) => {
  return (
    <Button
      variant="unstyled"
      onClick={() => onClick(serviceProvider?.locale_uid)}
      height="auto"
      w="full"
    >
      <Flex
        w="full"
        borderRadius={pxToRem(8)}
        border="1px solid"
        borderColor="gray.200"
        alignItems="center"
        gap={pxToRem(32)}
        p={pxToRem(16)}
        bg="white"
      >
        <Flex flexDir="column" alignItems="flex-start">
          <Text fontWeight={700} alignItems="center" color="gray.800">
            {serviceProvider?.title}
          </Text>
          {serviceProvider?.logo?.url && (
            <Image
              src={serviceProvider?.logo?.url}
              alt={serviceProvider?.title}
              w={pxToRem(100)}
            />
          )}
          <Link
            href={`tel:${serviceProvider?.telephone_number}`}
            display="flex"
            gap={pxToRem(10)}
            mt={pxToRem(10)}
            onClick={(event) => event.stopPropagation()}
          >
            <Phone w={pxToRem(24)} h={pxToRem(24)} color="blue.900" />
            <Text fontSize={pxToRem(14)} color="gray.900">
              {serviceProvider?.telephone_number ?? '-'}
            </Text>
          </Link>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <ArrowRight fill="blue.900" />
        </Flex>
      </Flex>
    </Button>
  )
}
