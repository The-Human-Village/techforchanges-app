import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { Loading } from '@/components/shared/loading/loading'
import { getTranslationText } from '@/helpers/helpers'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'

type Props = {
  isLoading: boolean
}

export const DataLoading = ({ isLoading }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  return (
    <Flex mt={pxToRem(80)} justifyContent="center">
      {isLoading ? (
        <Loading />
      ) : (
        <Text>{getTranslationText(translations, 'app-no-results')}</Text>
      )}
    </Flex>
  )
}
