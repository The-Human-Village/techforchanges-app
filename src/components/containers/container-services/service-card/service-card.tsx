import type { Service } from '@/api/services/services-entity/servicesTypes'
import { BookmarkItem } from '@/components/shared/bookmark-item/bookmark-item'
import { RichText } from '@/components/shared/rich-text/rich-text'
import { BookmarkType } from '@/store/bookmarks'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Text } from '@chakra-ui/react'

type Props = {
  onClick: (service) => void
  service: Service
}

export const ServiceCard = ({ service, onClick }: Props) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      borderRadius={pxToRem(8)}
      p={pxToRem(16)}
      onClick={() => onClick(service)}
    >
      <Flex justifyContent="space-between">
        <Text color="gray.900" fontWeight={700}>
          {service.title}
        </Text>
        <BookmarkItem
          bookmarkType={BookmarkType.Services}
          locale_uid={service.locale_uid}
        />
      </Flex>
      <Box maxH={pxToRem(100)} overflow="hidden">
        <RichText text={service?.description} />
      </Box>
    </Box>
  )
}
