import { useApplyFilters } from '@/api/services/filters/queries/useApplyFilters'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { useGetServices } from '@/api/services/services-entity/queries/useGetServices'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { ServiceList } from '@/components/containers/container-services/service-list/service-list'
import { getTranslationText } from '@/helpers/helpers'
import { useFilters } from '@/hooks'
import { useMemo } from 'react'

export const ContainerServiceList = () => {
  const { services } = useGetServices({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image',
    },
  })
  const { dimensionUIDs, cities } = useFilters()

  const { data: translations } = useGetTranslations({ params: {} })
  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })
  const { data: applyFiltersData } = useApplyFilters({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const rawData = useMemo(() => {
    return searchResults ? searchResults.services : services
  }, [searchResults, services])

  const data = useMemo(() => {
    return applyFiltersData && (dimensionUIDs.length > 0 || cities.length > 0)
      ? applyFiltersData.services
      : rawData
  }, [applyFiltersData, cities.length, dimensionUIDs.length, rawData])

  if (!data.length) return null

  return (
    <ServiceList
      title={getTranslationText(translations, 'app-services-title')}
      data={data}
    />
  )
}
