import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { useGetMembers } from '@/api/services/members/queries/useGetMembers'
import { useGetMissions } from '@/api/services/mission/queries/useGetMissions'
import type { News } from '@/api/services/news/newsTypes'
import { useGetNews } from '@/api/services/news/queries/useGetNews'
import { useGetSingleNews } from '@/api/services/news/queries/useGetSingleNews'
import { useGetServices } from '@/api/services/services-entity/queries/useGetServices'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CommunityBox } from '@/components/containers/container-community/community-box/community-box'
import { ServiceListItem } from '@/components/containers/container-services/service-list-item/service-list-item'
import { BackButton } from '@/components/shared/back-button/back-button'
import { CardList } from '@/components/shared/card-list/card-list'
import { DetailsScreenHeader } from '@/components/shared/details-screen-header/details-screen-header'
import { DimensionCards } from '@/components/shared/dimension-cards/dimension-cards'
import { Back, Checkmark, Edit } from '@/components/shared/icon/icon'
import { RichText } from '@/components/shared/rich-text/rich-text'
import { DATE_FORMAT } from '@/constants'
import { getTranslationText, getUniqueListBy } from '@/helpers/helpers'
import { BookmarkType } from '@/store/bookmarks'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { useMemo } from 'react'

type Props = {
  id: string
}
export const NewsDetails = ({ id }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  const { data: singleNews } = useGetSingleNews({
    params: {
      populate:
        'dimensions, dimensions.icon, dimensions.alt-icon, reviewer,author, header_image',
      filters: {
        locale_uid: id,
      },
    },
    options: {
      enabled: !!id,
    },
  })

  const dimensions = useMemo(
    () => singleNews?.dimensions ?? [],
    [singleNews?.dimensions],
  )

  const { news } = useGetNews({
    params: {
      populate:
        'header_image, dimensions, dimensions.alt_icon, dimensions.icon',
      sort: 'publishedAt:desc',
      filters: {
        dimensions: {
          id: {
            $in: dimensions?.map((item) => item.locale_uid),
          },
        },
      },
    },
    options: {
      enabled: !!dimensions?.length,
    },
  })

  const { missions } = useGetMissions({
    params: {
      populate:
        'header_image, dimensions, dimensions.alt_icon, dimensions.icon',
      sort: 'publishedAt:desc',
      filters: {
        dimensions: {
          id: {
            $in: dimensions?.map((item) => item.locale_uid),
          },
        },
      },
    },
    options: {
      enabled: !!dimensions?.length,
    },
  })

  const { members } = useGetMembers({
    params: {
      populate:
        'city,languages, languages.icon,dimensions, dimensions.alt_icon,image, dimensions.icon',
      verified: true,
      filters: {
        dimensions: { id: { $in: dimensions?.map((item) => item.locale_uid) } },
      },
    },
    options: {
      enabled: !!dimensions?.length,
    },
  })

  const { services } = useGetServices({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image',
      filters: {
        dimensions: { id: { $in: dimensions?.map((item) => item.locale_uid) } },
      },
    },
    options: { enabled: !!dimensions.length },
  })

  const formattedServices = useMemo(() => {
    let dimensions = [] as Dimension[]
    services?.forEach((item) => {
      dimensions.push(...(item.dimensions ?? []))
    })
    dimensions = getUniqueListBy(dimensions, 'id') as Dimension[]

    return dimensions
  }, [services])

  const formattedSingleNews = useMemo(() => {
    return {
      preview_text: singleNews?.preview_text,
      dimensions: singleNews?.dimensions,
      header_image: singleNews?.header_image,
      title: singleNews?.title,
      locale_uid: singleNews?.locale_uid,
      reviewer: singleNews?.reviewer,
      createdAt: singleNews?.createdAt,
      main_text: singleNews?.main_text,
    } as News
  }, [
    singleNews?.createdAt,
    singleNews?.dimensions,
    singleNews?.header_image,
    singleNews?.locale_uid,
    singleNews?.main_text,
    singleNews?.preview_text,
    singleNews?.reviewer,
    singleNews?.title,
  ])

  return (
    <Box>
      <DetailsScreenHeader
        bgImage={singleNews?.header_image?.url}
        backButton={
          <BackButton
            label={getTranslationText(translations, 'app-button-back')}
            color="white"
          />
        }
      />
      <Flex
        justifyContent="space-between"
        borderRadius="lg"
        backgroundColor="white.50"
        mt={pxToRem(16)}
      >
        <Heading
          color="gray.900"
          fontSize={pxToRem(20)}
          lineHeight={pxToRem(28)}
          fontWeight={800}
        >
          {formattedSingleNews?.title}
        </Heading>
      </Flex>
      <Flex flexDir="column" gap={pxToRem(8)}>
        <Flex alignItems="center" gap={pxToRem(6)}>
          <Edit width={pxToRem(16)} height={pxToRem(16)} />
          {formattedSingleNews?.reviewer && (
            <>
              <Text pr={pxToRem(6)} color="gray.500" fontSize={pxToRem(12)}>
                {`${formattedSingleNews?.reviewer?.first_name} ${formattedSingleNews?.reviewer?.last_name}`}
              </Text>
              <Text color="gray.500">|</Text>
            </>
          )}
          <Text pl={pxToRem(6)} color="gray.500" fontSize={pxToRem(12)}>
            {dayjs(formattedSingleNews?.createdAt).format(DATE_FORMAT)}
          </Text>
        </Flex>
        <Flex alignItems="center" gap={pxToRem(6)}>
          <Checkmark width={pxToRem(16)} height={pxToRem(16)} />
          <Text color="gray.500" fontSize={pxToRem(12)}>
            {getTranslationText(translations, 'app-article-checked')}
          </Text>
        </Flex>
        <Flex justifyContent="flex-start">
          {dimensions.length > 0 && <DimensionCards data={dimensions} />}
        </Flex>
      </Flex>
      <Box my={pxToRem(16)}>
        <RichText text={formattedSingleNews?.main_text} />
      </Box>

      {news?.length > 0 && (
        <Box mt={pxToRem(32)}>
          <Box mt={pxToRem(16)}>
            <CardList
              data={news?.slice(0, 2)}
              bookmarkType={BookmarkType.News}
              title={getTranslationText(translations, 'app-related-news')}
              linkText={getTranslationText(
                translations,
                'app-more-related-news',
              )}
              navigationLink={RoutePath.News}
            />
          </Box>
        </Box>
      )}

      {missions?.length > 0 && (
        <Box mt={pxToRem(32)}>
          <Box mt={pxToRem(16)}>
            <CardList
              data={missions?.slice(0, 2)}
              bookmarkType={BookmarkType.Knowledge}
              title={getTranslationText(translations, 'app-related-knowledge')}
              linkText={getTranslationText(
                translations,
                'app-more-related-knowledge',
              )}
              navigationLink={RoutePath.Knowledge}
            />
          </Box>
        </Box>
      )}

      {/* related services */}
      <Box mt={pxToRem(32)}>
        <Text color="gray.900" fontWeight={800} fontSize={pxToRem(20)}>
          {getTranslationText(translations, 'app-related-services')}
        </Text>

        {formattedServices?.map((item, index) => (
          <Box mt={pxToRem(12)} key={`${item.locale_uid}${index}`}>
            <ServiceListItem
              title={item.title}
              iconUrl={item.alt_icon?.url}
              locale_uid={item.locale_uid}
            />
          </Box>
        ))}

        <Flex
          flexDir="row"
          alignItems="center"
          cursor="pointer"
          mt={`${pxToRem(16)} !important`}
          as={NextLink}
          href={RoutePath.Services}
        >
          <Text
            display="flex"
            fontWeight={800}
            alignItems="center"
            color="blue.800"
            fontSize={pxToRem(16)}
          >
            {getTranslationText(translations, 'app-button-go-to')}{' '}
            {getTranslationText(translations, 'app-services-title')}
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

        {/* community */}
        <Box mt={pxToRem(32)}>
          <CommunityBox
            members={members}
            title={getTranslationText(translations, 'app-community-title')}
            text={getTranslationText(translations, 'app-community-description')}
          />
        </Box>
      </Box>
    </Box>
  )
}
