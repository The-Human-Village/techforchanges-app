import { useApplyFilters } from '@/api/services/filters/queries/useApplyFilters'
import { useGetMembers } from '@/api/services/members/queries/useGetMembers'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CommunityBox } from '@/components/containers/container-community/community-box/community-box'
import { getTranslationText } from '@/helpers/helpers'
import { useFilters } from '@/hooks'
import { useOnboardingStore } from '@/store/onboarding'
import { useMemo } from 'react'

export const CommunityWithFilters = () => {
  const { langSpeak, location } = useOnboardingStore((state) => state)
  const { data: translations } = useGetTranslations({ params: {} })
  const { dimensionUIDs, cities } = useFilters()

  const { members } = useGetMembers({
    params: {
      populate:
        'city,languages, languages.icon,dimensions, dimensions.alt_icon,image, dimensions.icon',
      verified: true,
      filters: {
        languages: { abbreviation: { $in: langSpeak } },
        city: location ? { id: { $eq: +location } } : null,
      },
    },
    options: {
      enabled: !!langSpeak || !!location,
    },
  })

  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const rawData = useMemo(() => {
    return searchResults ? searchResults.members : members
  }, [searchResults, members])

  const { data: applyFiltersData } = useApplyFilters({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const data = useMemo(() => {
    return applyFiltersData && (dimensionUIDs.length > 0 || cities.length > 0)
      ? applyFiltersData.members
      : rawData
  }, [applyFiltersData, cities.length, dimensionUIDs.length, rawData])

  return data?.length > 0 ? (
    <CommunityBox
      members={data}
      title={getTranslationText(translations, 'app-community-title')}
      text={getTranslationText(translations, 'app-community-description')}
    />
  ) : null
}
