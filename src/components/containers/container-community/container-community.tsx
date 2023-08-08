import { useGetMembers } from '@/api/services/members/queries/useGetMembers'
import { useSearchResults } from '@/api/services/search/queries/useSearchResults'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CommunityMembers } from '@/components/containers/container-community/community-members/community-members'
import { BoxRedirectContainer } from '@/components/shared/box-redirect-container/box-redirect-container'
import { DataLoading } from '@/components/shared/data-loading/data-loading'
import { StyledContainer } from '@/components/shared/styled/styled-container/styled-container'
import { StyledTitle } from '@/components/shared/styled/styled-title/styled-title'
import { LANDING_PAGE_URL } from '@/constants'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useInfiniteScroll } from '@/hooks'
import { RoutePathLanding } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export const ContainerCommunity = () => {
  const { data: translations } = useGetTranslations({ params: {} })
  const {
    members,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  } = useGetMembers({
    params: {
      populate:
        'city,languages, languages.icon,dimensions, dimensions.alt_icon,image, dimensions.icon',
      verified: true,
    },
  })

  const { data: searchResults } = useSearchResults({
    params: {
      populate:
        'dimensions, dimensions.alt_icon, dimensions.icon, header_image, image, city, languages, languages.icon',
    },
  })

  const data = useMemo(() => {
    return searchResults ? searchResults.members : members
  }, [searchResults, members])

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage)

  return (
    <StyledContainer>
      <Flex flexDir="column" gap={pxToRem(4)}>
        <StyledTitle>
          {getTranslationText(translations, 'app-navigation-button-community')}
        </StyledTitle>
        <Text color="gray.800">
          {getTranslationText(translations, 'app-community-description')}
        </Text>
      </Flex>

      {data?.length ? (
        <>
          <Box mt={pxToRem(16)}>
            <CommunityMembers data={data} />
          </Box>
          <Box my={{ base: pxToRem(24), xl: pxToRem(40) }}>
            <BoxRedirectContainer
              text={getTranslationText(
                translations,
                'app-become-volunteer-description',
              )}
              title={getTranslationText(
                translations,
                'app-become-volunteer-title',
              )}
              onClick={() => trackMixpanelEvent('become_volunteer')}
              href={`${LANDING_PAGE_URL}${RoutePathLanding.BECOME_VOLUNTEER}`}
            />
          </Box>
        </>
      ) : (
        <DataLoading isLoading={isInitialLoading} />
      )}
    </StyledContainer>
  )
}
