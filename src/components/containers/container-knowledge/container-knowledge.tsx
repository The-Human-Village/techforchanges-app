import { useApplyFilters } from '@/api/services/filters/queries/useApplyFilters'
import { useFiltersResults } from '@/api/services/filters/queries/useFiltersResults'
import { useGetMissions } from '@/api/services/mission/queries/useGetMissions'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CardList } from '@/components/shared/card-list/card-list'
import { DataLoading } from '@/components/shared/data-loading/data-loading'
import { Filter } from '@/components/shared/filter/filter'
import { Loading } from '@/components/shared/loading/loading'
import { getCities, getDimensions, getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useFilters, useInfiniteScroll } from '@/hooks'
import { BookmarkType } from '@/store/bookmarks'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Heading } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'

type Props = {
  showFilterOption?: boolean
  leadUserToAdditionalPage?: boolean
}

export const ContainerKnowledge = ({
  showFilterOption = true,
  leadUserToAdditionalPage,
}: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })
  const {
    missions,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  } = useGetMissions({
    params: {
      populate:
        'header_image, dimensions, dimensions.alt_icon, dimensions.icon',
      sort: 'publishedAt:desc',
    },
  })

  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const { dimensionUIDs, cities, setFilters, clearFilters } = useFilters()

  const rawData = useMemo(() => {
    return searchResults ? searchResults.missions : missions
  }, [searchResults, missions])

  const missionUIDs = useMemo(() => {
    return rawData?.map((object) => object.locale_uid)
  }, [rawData])

  const { data: filtersData } = useFiltersResults({
    body: { missionUIDs },
    options: {
      enabled: missionUIDs && missionUIDs.length > 0 ? true : false,
    },
  })

  const { data: applyFiltersData } = useApplyFilters({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image',
    },
  })

  const data = useMemo(() => {
    return applyFiltersData && (dimensionUIDs.length > 0 || cities.length > 0)
      ? applyFiltersData.missions
      : rawData
  }, [applyFiltersData, cities.length, dimensionUIDs.length, rawData])

  const handleApplyFilters = useCallback(
    (value: string[]) => {
      setFilters({
        dimensionUIDs: getDimensions(value),
        cities: getCities(value),
        returnMissions: true,
      })

      // Track Mixpanel event
      trackMixpanelEvent('filters_applied')
    },
    [setFilters],
  )

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage)

  return (
    <Flex flexDir="column" mt={pxToRem(24)}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          as="h6"
          fontWeight={800}
          lineHeight={pxToRem(28)}
          fontSize={pxToRem(20)}
          color="gray.900"
        >
          {getTranslationText(translations, 'app-knowledge-title')}
        </Heading>
        {showFilterOption && (
          <Filter
            filtersData={filtersData || {}}
            handleApplyFilters={handleApplyFilters}
            defaultValue={dimensionUIDs.concat(cities)}
            onClickClear={clearFilters}
          />
        )}
      </Flex>

      <Flex flexDir="column" alignItems="center">
        {data?.length > 0 ? (
          <CardList
            data={data}
            bookmarkType={BookmarkType.Knowledge}
            navigationLink={RoutePath.Knowledge}
            leadUserToAdditionalPage={leadUserToAdditionalPage}
            linkText={getTranslationText(translations, 'app-knowledge-title')}
          />
        ) : (
          <DataLoading isLoading={isInitialLoading} />
        )}
        {isFetchingNextPage && <Loading mt={pxToRem(24)} />}
      </Flex>
    </Flex>
  )
}
