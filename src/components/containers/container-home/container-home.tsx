import { useGetDimensions } from '@/api/services/dimensions/queries/useGetDimensions'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { CommunityWithFilters } from '@/components/containers/container-community/community-with-filters/community-with-filters'
import { DimensionsList } from '@/components/containers/container-home/dimensions-list/dimensions-list'
import { MyBookmarks } from '@/components/containers/container-home/my-bookmarks/my-bookmarks'
import { ContainerKnowledge } from '@/components/containers/container-knowledge/container-knowledge'
import { ContainerNews } from '@/components/containers/container-news/container-news'
import { ContainerServiceList } from '@/components/containers/container-services/container-service-list/container-service-list'
import { StyledContainer } from '@/components/shared/styled/styled-container/styled-container'
import ProtectedRoute from '@/guards/protected-route'
import { pxToRem } from '@/utilities/pxToRem'

export const ContainerHome = () => {
  const { data: dimensionsData } = useGetDimensions({
    params: {
      populate: 'alt_icon, icon',
      filters: {
        dimension_parent: {
          id: {
            $null: true,
          },
        },
      },
    },
  })

  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  return (
    <ProtectedRoute>
      <StyledContainer gap={pxToRem(24)}>
        <MyBookmarks />
        {!searchResults && <DimensionsList data={dimensionsData} />}
        <CommunityWithFilters />
        <ContainerServiceList />
        <ContainerNews
          showFilterOption={false}
          leadUserToAdditionalPage={true}
        />
        <ContainerKnowledge
          showFilterOption={false}
          leadUserToAdditionalPage={true}
        />
      </StyledContainer>
    </ProtectedRoute>
  )
}
