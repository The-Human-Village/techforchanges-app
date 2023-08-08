import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CommunityWithFilters } from '@/components/containers/container-community/community-with-filters/community-with-filters'
import { ContainerKnowledge } from '@/components/containers/container-knowledge/container-knowledge'
import { ContainerNews } from '@/components/containers/container-news/container-news'
import { ContainerServiceList } from '@/components/containers/container-services/container-service-list/container-service-list'
import { BackButton } from '@/components/shared/back-button/back-button'
import { getTranslationText } from '@/helpers/helpers'
import { useFilters } from '@/hooks'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const ContainerINeedHelpWith = () => {
  const { data: translations } = useGetTranslations({ params: {} })
  const { clearFilters } = useFilters()
  const router = useRouter()

  const handleOnClick = () => {
    clearFilters()
    router.push(RoutePath.Home)
  }

  return (
    <Flex flexDir="column" mt={pxToRem(24)} gap={pxToRem(24)}>
      <BackButton
        label={getTranslationText(translations, 'app-button-back')}
        onClick={handleOnClick}
      />
      <ContainerNews showFilterOption={false} />
      <ContainerServiceList />
      <CommunityWithFilters />
      <ContainerKnowledge showFilterOption={false} />
    </Flex>
  )
}
