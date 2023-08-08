import type { Mission } from '@/api/services/mission/missionTypes'
import type { News } from '@/api/services/news/newsTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { Card } from '@/components/shared/card/card'
import { DimensionCards } from '@/components/shared/dimension-cards/dimension-cards'
import { Back } from '@/components/shared/icon/icon'
import { getFormattedDate, getTranslationText } from '@/helpers/helpers'
import type { BookmarkType } from '@/store/bookmarks'
import type { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  data: News[] | Mission[]
  bookmarkType: BookmarkType
  title?: string
  navigationLink: RoutePath
  linkText?: string
  leadUserToAdditionalPage?: boolean
}

export const CardList = ({
  data,
  bookmarkType,
  title,
  navigationLink,
  linkText,
  leadUserToAdditionalPage,
}: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })
  const router = useRouter()

  return (
    <>
      <Heading
        as="h6"
        fontWeight={800}
        lineHeight={pxToRem(28)}
        fontSize={pxToRem(20)}
        mb={pxToRem(16)}
      >
        {title}
      </Heading>
      <Flex flexDir="column" alignItems="center" gap={pxToRem(12)}>
        {data?.map((item, index) => (
          <Card
            key={`item.attributes.title ${index}`}
            onClick={() =>
              router.push(`${navigationLink}/details/${item.locale_uid}`)
            }
            dimensions={<DimensionCards data={item.dimensions} />}
            bgImageUrl={item?.header_image?.url}
            date={getFormattedDate(item.preview_text)}
            title={item?.title}
            description={item.preview_text}
            locale_uid={item.locale_uid}
            bookmarkType={bookmarkType}
          />
        ))}
        {leadUserToAdditionalPage && (
          <Flex
            flexDir="row"
            alignItems="center"
            cursor="pointer"
            mt={`${pxToRem(16)} !important`}
            as={NextLink}
            href={navigationLink}
          >
            <Text
              display="flex"
              as="p"
              fontWeight={800}
              alignItems="center"
              color="blue.800"
              fontSize={pxToRem(16)}
            >
              {linkText
                ? linkText
                : `${getTranslationText(
                    translations,
                    'app-button-go-to',
                  )} ${title}`}
            </Text>
            <IconButton
              ms={0}
              textAlign="center"
              pointerEvents="none"
              icon={<Back width={pxToRem(20)} height={pxToRem(20)}></Back>}
              variant="unstyled"
              aria-label="Back"
              color="blue.800"
              display="flex"
              alignItems="center"
              transform="rotate(180deg)"
              pl={pxToRem(10)}
              width={pxToRem(20)}
              height={pxToRem(20)}
            />
          </Flex>
        )}
      </Flex>
    </>
  )
}
