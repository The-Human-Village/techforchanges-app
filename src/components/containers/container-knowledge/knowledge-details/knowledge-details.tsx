import { useGetMembers } from '@/api/services/members/queries/useGetMembers'
import type { Mission } from '@/api/services/mission/missionTypes'
import { useGetMission } from '@/api/services/mission/queries/useGetMission'
import { useGetMissions } from '@/api/services/mission/queries/useGetMissions'
import { useGetNews } from '@/api/services/news/queries/useGetNews'
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
import { getTranslationText } from '@/helpers/helpers'
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

export const KnowledgeDetails = ({ id }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  const { data: mission } = useGetMission({
    params: {
      populate:
        'dimensions, dimensions.icon, dimensions.alt-icon, reviewer, header_image',
      filters: {
        locale_uid: id,
      },
    },
    options: {
      enabled: !!id,
    },
  })

  const dimensions = useMemo(
    () => mission?.dimensions ?? [],
    [mission?.dimensions],
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

  const formattedMission = useMemo(() => {
    return {
      preview_text: mission?.preview_text,
      dimensions: mission?.dimensions,
      header_image: mission?.header_image,
      title: mission?.title,
      locale_uid: mission?.locale_uid,
      reviewer: mission?.reviewer,
      createdAt: mission?.createdAt,
      main_text: mission?.main_text,
    } as Mission
  }, [
    mission?.createdAt,
    mission?.dimensions,
    mission?.header_image,
    mission?.locale_uid,
    mission?.main_text,
    mission?.preview_text,
    mission?.reviewer,
    mission?.title,
  ])

  return (
    <Box>
      <DetailsScreenHeader
        bgImage={formattedMission?.header_image?.url}
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
          {formattedMission?.title}
        </Heading>
      </Flex>
      <Flex flexDir="column" gap={pxToRem(8)}>
        <Flex alignItems="center" gap={pxToRem(6)}>
          <Edit width={pxToRem(16)} height={pxToRem(16)} />
          {formattedMission?.reviewer && (
            <>
              <Text color="gray.500" fontSize={pxToRem(12)}>
                {`${formattedMission?.reviewer?.first_name} ${formattedMission?.reviewer?.last_name}`}
              </Text>
              <Text color="gray.500">|</Text>
            </>
          )}
          <Text pl={pxToRem(6)} color="gray.500" fontSize={pxToRem(12)}>
            {dayjs(formattedMission?.createdAt).format(DATE_FORMAT)}
          </Text>
        </Flex>
        <Flex alignItems="center" gap={pxToRem(8)}>
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
        <RichText text={formattedMission.main_text} />
      </Box>

      {missions?.length > 0 && (
        <Box mt={pxToRem(16)}>
          <Box mt={pxToRem(16)}>
            <CardList
              data={missions?.slice(0, 2)}
              bookmarkType={BookmarkType.Knowledge}
              title={getTranslationText(translations, 'app-related-articles')}
              linkText={getTranslationText(
                translations,
                'app-more-related-articles',
              )}
              navigationLink={RoutePath.Knowledge}
            />
          </Box>
        </Box>
      )}

      {news?.length > 0 && (
        <Box mt={pxToRem(16)}>
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

      {/* community */}
      <Box my={pxToRem(16)}>
        <CommunityBox
          members={members}
          title={getTranslationText(translations, 'app-community-title')}
          text={getTranslationText(translations, 'app-community-description')}
        ></CommunityBox>
      </Box>

      {/* related services */}
      <Box>
        <Text color="gray.900" fontWeight={800} fontSize={pxToRem(20)}>
          {getTranslationText(translations, 'app-related-services')}
        </Text>

        {services?.map((item, index) => (
          <Box mt={pxToRem(12)} key={`${item.id}${index}`}>
            <ServiceListItem title={item.title} locale_uid={item.locale_uid} />
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
            as="p"
            fontWeight={800}
            alignItems="center"
            color="blue.800"
            fontSize={pxToRem(16)}
          >
            {getTranslationText(translations, 'app-button-go-to')} Services
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
      </Box>
    </Box>
  )
}
