import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { CustomSVG } from '@/components/shared/custom-svg/CustomSVG'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'

type Props = {
  data: Dimension[]
  justifyContent?: string
}

export const DimensionCards = ({
  data,
  justifyContent = 'flex-end',
}: Props) => {
  return (
    <Flex gap={pxToRem(4)} flexWrap="wrap" justifyContent={justifyContent}>
      {data?.map((item, index) => (
        <Flex
          key={`${item.locale_uid}${index}`}
          bg="blue.50"
          borderRadius={pxToRem(4)}
          px={pxToRem(8)}
          py={pxToRem(4)}
          alignItems="center"
          justifyContent="center"
          gap={pxToRem(4)}
        >
          {item?.icon?.url && (
            <CustomSVG
              url={
                item?.icon?.url ?? item?.attributes?.icon?.data?.attributes?.url
              }
              color="blue.800"
              w={pxToRem(18)}
              h={pxToRem(18)}
            ></CustomSVG>
          )}

          <Text
            fontWeight={500}
            color="blue.800"
            fontSize={pxToRem(12)}
            lineHeight={pxToRem(16)}
          >
            {item?.attributes?.title ?? item.title}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
