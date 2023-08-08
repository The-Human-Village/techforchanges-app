import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { useApplyFilters } from '@/api/services/filters/queries/useApplyFilters'
import { useFiltersResults } from '@/api/services/filters/queries/useFiltersResults'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { useGetServices } from '@/api/services/services-entity/queries/useGetServices'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { ServiceCard } from '@/components/containers/container-services/service-card/service-card'
import { CustomSVG } from '@/components/shared/custom-svg/CustomSVG'
import { DataLoading } from '@/components/shared/data-loading/data-loading'
import { Filter } from '@/components/shared/filter/filter'
import { Loading } from '@/components/shared/loading/loading'
import { StyledContainer } from '@/components/shared/styled/styled-container/styled-container'
import { StyledTitle } from '@/components/shared/styled/styled-title/styled-title'
import {
  getCities,
  getDimensions,
  getTranslationText,
  getUniqueListBy,
} from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useFilters, useInfiniteScroll } from '@/hooks'
import { pxToRem } from '@/utilities/pxToRem'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const ContainerServices = () => {
  const { data: translations } = useGetTranslations({ params: {} })
  const { dimensionUIDs, cities, setFilters, clearFilters } = useFilters()
  const router = useRouter()

  const {
    services: servicesData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  } = useGetServices({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image',
    },
  })

  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const rawData = useMemo(() => {
    return searchResults ? searchResults.services : servicesData
  }, [searchResults, servicesData])

  const serviceUIDs = useMemo(() => {
    return rawData?.map((object) => object.locale_uid)
  }, [rawData])

  const { data: filtersData } = useFiltersResults({
    body: { serviceUIDs },
    options: {
      enabled: !!serviceUIDs && serviceUIDs.length > 0,
    },
  })

  const { data: applyFiltersData } = useApplyFilters({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image',
    },
  })

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage)

  const data = useMemo(() => {
    return applyFiltersData && (dimensionUIDs.length > 0 || cities.length > 0)
      ? applyFiltersData.services
      : rawData
  }, [applyFiltersData, cities.length, dimensionUIDs.length, rawData])

  const formattedData = useMemo(() => {
    const dimensions = [] as Dimension[]
    data?.forEach((item) =>
      dimensions.push(...(item.dimensions?.map((m) => ({ ...m })) ?? [])),
    )

    const uniqueDimensions = getUniqueListBy(dimensions, 'locale_uid')
    const formattedDimensions = uniqueDimensions.map((item: Dimension) => ({
      ...item,
      services: data
        ? data.filter((d) =>
            d.dimensions.some((s) => s.locale_uid === item.locale_uid),
          )
        : [],
    }))

    return formattedDimensions
  }, [data])

  const handleApplyFilters = useCallback(
    (value: string[]) => {
      setFilters({
        dimensionUIDs: getDimensions(value),
        cities: getCities(value),
        returnServices: true,
      })
      // Track Mixpanel event
      trackMixpanelEvent('filters_applied')
    },
    [setFilters],
  )

  return (
    <StyledContainer>
      <Flex justifyContent="space-between">
        <Flex flexDir="column" gap={pxToRem(8)}>
          <StyledTitle>
            {getTranslationText(translations, 'app-services-title')}
          </StyledTitle>
          <Text color="gray.800" mt={pxToRem(8)}>
            {getTranslationText(translations, 'app-suggested-services')}
          </Text>
        </Flex>
        <Filter
          filtersData={filtersData || {}}
          handleApplyFilters={handleApplyFilters}
          defaultValue={dimensionUIDs.concat(cities)}
          onClickClear={clearFilters}
        />
      </Flex>
      {formattedData?.length > 0 ? (
        <Accordion allowToggle mt={pxToRem(16)}>
          {formattedData.map((item) => (
            <AccordionItem key={item.locale_uid}>
              <AccordionButton
                p={pxToRem(16)}
                borderBottom="1px solid"
                borderColor="gray.200"
                justifyContent="space-between"
              >
                <Flex>
                  <CustomSVG
                    url={item?.icon?.url}
                    color="blue.800"
                    w={pxToRem(24)}
                    h={pxToRem(24)}
                  />
                  <Text color="gray.800" ml={pxToRem(12)}>
                    {item.title}
                  </Text>
                </Flex>
                <AccordionIcon fontSize={pxToRem(28)} color="blue.900" />
              </AccordionButton>

              <AccordionPanel
                px={0}
                py={{ base: pxToRem(16), xl: pxToRem(20) }}
              >
                <Flex
                  flexDir="column"
                  gap={{ base: pxToRem(8), xl: pxToRem(16) }}
                >
                  {item.services.map((s) => (
                    <ServiceCard
                      key={s.locale_uid}
                      service={s}
                      onClick={() =>
                        router.push(`/services/details/${s.locale_uid}`)
                      }
                    />
                  ))}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <DataLoading isLoading={isInitialLoading} />
      )}
      {isFetchingNextPage && <Loading mt={pxToRem(24)} />}
    </StyledContainer>
  )
}
