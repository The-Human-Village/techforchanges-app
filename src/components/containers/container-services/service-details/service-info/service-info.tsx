import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { DimensionCards } from '@/components/shared/dimension-cards/dimension-cards'
import { Checkmark, Edit } from '@/components/shared/icon/icon'
import { DATE_FORMAT } from '@/constants'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

type Props = {
  title: string
  createdAt: string
  available: boolean
  dimensions: Dimension[]
  checkedByCommunityMembersLabel: string
}

export const ServiceInfo = ({
  title,
  createdAt,
  available,
  dimensions,
  checkedByCommunityMembersLabel,
}: Props) => {
  return (
    <Flex flexDir="column" gap={pxToRem(8)}>
      <Flex alignItems="center" gap={pxToRem(6)}>
        <Edit width={pxToRem(16)} height={pxToRem(16)} />
        <Text color="gray.500" fontSize={pxToRem(12)}>
          {title}
        </Text>
        <Text color="gray.500">|</Text>
        <Text color="gray.500" fontSize={pxToRem(12)}>
          {dayjs(createdAt).format(DATE_FORMAT)}
        </Text>
      </Flex>
      {available && (
        <Flex alignItems="center" gap={pxToRem(6)}>
          <Checkmark width={pxToRem(16)} height={pxToRem(16)}></Checkmark>
          <Text color="gray.500" fontSize={pxToRem(12)}>
            {checkedByCommunityMembersLabel}
          </Text>
        </Flex>
      )}
      {dimensions?.length > 0 && <DimensionCards data={dimensions} />}
    </Flex>
  )
}
