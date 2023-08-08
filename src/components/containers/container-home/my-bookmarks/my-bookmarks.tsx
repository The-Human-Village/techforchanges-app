import { useGetObjects } from '@/api/services/objects/queries/useGetObjects'
import type { Service } from '@/api/services/services-entity/servicesTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { ServiceCard } from '@/components/containers/container-services/service-card/service-card'
import { CardList } from '@/components/shared/card-list/card-list'
import { StyledTitle } from '@/components/shared/styled/styled-title/styled-title'
import { getTranslationText } from '@/helpers/helpers'
import { BookmarkType, useBookmarksStore } from '@/store/bookmarks'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const MyBookmarks = () => {
  const router = useRouter()
  const { bookmarks } = useBookmarksStore((state) => state)
  const { services, knowledge, news } = bookmarks
  const { data: translations } = useGetTranslations({ params: {} })

  const UIDs = useMemo(
    () => [...services, ...knowledge, ...news],
    [knowledge, news, services],
  )

  const { data } = useGetObjects({
    params: { UIDs, populate: 'header_image' },
    options: { enabled: !!UIDs.length, staleTime: 60000 },
  })

  const openDetails = useCallback(
    (service: Service) => {
      router.push(`/services/details/${service.locale_uid}`)
    },
    [router],
  )

  const shouldRenderBookmarks =
    data?.services?.length > 0 ||
    data?.missions?.length > 0 ||
    data?.news?.length > 0

  return (
    <>
      {shouldRenderBookmarks && (
        <Box>
          <StyledTitle>
            {getTranslationText(translations, 'app-my-bookmarks')}
          </StyledTitle>
          <Flex gap={pxToRem(8)} flexDir="column">
            {data?.services.map((service) => (
              <ServiceCard
                key={service.locale_uid}
                service={service}
                onClick={() => openDetails(service)}
              />
            ))}
            <CardList
              data={data.missions}
              bookmarkType={BookmarkType.Knowledge}
              navigationLink={RoutePath.Knowledge}
            />
            <CardList
              data={data.news}
              bookmarkType={BookmarkType.News}
              navigationLink={RoutePath.News}
            />
          </Flex>
        </Box>
      )}
    </>
  )
}
