import { useGetMissions } from '@/api/services/mission/queries/useGetMissions'
import { useGetNews } from '@/api/services/news/queries/useGetNews'
import { useGetService } from '@/api/services/services-entity/queries/useGetService'
import { useGetServices } from '@/api/services/services-entity/queries/useGetServices'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import defaultIllustration from '@/assets/illustration.png'
import { CommunityBox } from '@/components/containers/container-community/community-box/community-box'
import { ServiceHeader } from '@/components/containers/container-services/service-details/service-header/service-header'
import { ServiceInfo } from '@/components/containers/container-services/service-details/service-info/service-info'
import { ServiceList } from '@/components/containers/container-services/service-list/service-list'
import { ServiceProviderList } from '@/components/containers/container-services/service-provider-list/service-provider-list'
import { BackButton } from '@/components/shared/back-button/back-button'
import { BookmarkItem } from '@/components/shared/bookmark-item/bookmark-item'
import { BoxRedirectContainer } from '@/components/shared/box-redirect-container/box-redirect-container'
import { CardList } from '@/components/shared/card-list/card-list'
import { RichText } from '@/components/shared/rich-text/rich-text'
import { StyledContainer } from '@/components/shared/styled/styled-container/styled-container'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { BookmarkType } from '@/store/bookmarks'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex } from '@chakra-ui/react'
import { useMemo } from 'react'

type Props = {
  id: string
}
export const ServiceDetails = ({ id }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })
  const { data: service } = useGetService({
    params: {
      populate:
        'dimensions.icon, dimensions.alt-icon, header_image, service_provider, service_provider.logo, service_provider.contacts, service_provider.contacts.image, service_provider.contacts.languages, service_provider.contacts.languages.icon',
      filters: {
        locale_uid: id,
      },
    },
    options: {
      enabled: !!id,
    },
  })

  const dimensions = useMemo(
    () => service?.dimensions ?? [],
    [service?.dimensions],
  )

  const { services: relatedServices } = useGetServices({
    params: {
      filters: {
        dimensions: {
          id: {
            $in: dimensions.map((item) => item.locale_uid),
          },
        },
      },
    },
  })

  const { news: relatedNews } = useGetNews({
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
      enabled: !!dimensions,
    },
  })

  const { missions: relatedMissions } = useGetMissions({
    params: {
      populate: 'header_image, dimensions, dimensions.alt_icon',
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
      enabled: !!dimensions,
    },
  })

  return (
    <Box mt={pxToRem(24)}>
      <Flex justifyContent="space-between">
        <BackButton
          label={getTranslationText(translations, 'app-button-back')}
        />
        <BookmarkItem
          bookmarkType={BookmarkType.Services}
          locale_uid={service?.locale_uid}
          showText={true}
        />
      </Flex>
      <StyledContainer gap={pxToRem(24)}>
        <ServiceHeader
          title={service?.title}
          imageUrl={service?.header_image?.url ?? defaultIllustration.src}
        />
        <ServiceInfo
          title={service?.service_provider?.title}
          createdAt={service?.createdAt}
          dimensions={service?.dimensions}
          available={service?.available}
          checkedByCommunityMembersLabel={getTranslationText(
            translations,
            'app-article-checked-by-community-members',
          )}
        />
        <RichText text={service?.description} />
        {service?.website_url && (
          <BoxRedirectContainer
            title={getTranslationText(translations, 'app-get-service')}
            href="service.attributes.website_url"
            onClick={() => trackMixpanelEvent('get_service')}
          />
        )}
        <ServiceProviderList
          title={getTranslationText(translations, 'app-service-provider')}
          serviceProvider={service?.service_provider}
        />
        <CommunityBox
          members={service?.service_provider?.contacts ?? []}
          title={getTranslationText(
            translations,
            'app-community-service-details-title',
          )}
          text={getTranslationText(
            translations,
            'app-community-service-details-text',
          )}
        />
        <ServiceList
          title={getTranslationText(
            translations,
            'app-navigation-button-services',
          )}
          data={relatedServices}
        />

        {relatedNews?.length > 0 && (
          <CardList
            data={relatedNews}
            bookmarkType={BookmarkType.News}
            title={getTranslationText(
              translations,
              'app-navigation-button-news',
            )}
            navigationLink={RoutePath.News}
            leadUserToAdditionalPage={true}
          />
        )}
        {relatedMissions?.length > 0 && (
          <CardList
            data={relatedMissions}
            bookmarkType={BookmarkType.Knowledge}
            title={getTranslationText(
              translations,
              'app-navigation-button-knowledge',
            )}
            navigationLink={RoutePath.Knowledge}
            leadUserToAdditionalPage={true}
          />
        )}
      </StyledContainer>
    </Box>
  )
}
