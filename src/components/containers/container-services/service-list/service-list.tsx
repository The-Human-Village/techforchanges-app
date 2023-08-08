import type { Service } from '@/api/services/services-entity/servicesTypes'
import { ServiceListItem } from '@/components/containers/container-services/service-list-item/service-list-item'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'

type Props = {
  title: string
  data: Service[]
}

export const ServiceList = ({ title, data }: Props) => {
  return (
    <Flex flexDir="column" gap={pxToRem(8)}>
      <Text
        fontWeight={800}
        lineHeight={pxToRem(28)}
        fontSize={pxToRem(20)}
        color="gray.900"
        mb={pxToRem(8)}
      >
        {title}
      </Text>

      {data?.map((item, index) => (
        <ServiceListItem
          key={`item.attributes.title ${index}`}
          iconUrl={item?.icon?.url}
          locale_uid={item?.locale_uid}
          title={item?.title}
        />
      ))}
    </Flex>
  )
}
