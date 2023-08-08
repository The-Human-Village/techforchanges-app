import { useGetLocales } from '@/api/services/locales/queries/useGetLocales'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { LanguageRadio } from '@/components/containers/container-onboarding/onboarding-select-app-language/language-radio/language-radio'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { pxToRem } from '@/utilities/pxToRem'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type Props = {
  next: () => void
}

export const OnboardingSelectAppLanguage = ({ next }: Props) => {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router
  const { data } = useGetLocales({ params: {} })
  const { data: translations } = useGetTranslations({ params: {} })

  const handleContinue = () => {
    next()
    trackMixpanelEvent('onboarding_language_continue')
  }

  const handleLocaleChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Text variant="onboardingTitle">
        {getTranslationText(translations, 'app-welcome-title')}
      </Text>
      <Text color="gray.800">
        {getTranslationText(translations, 'app-welcome-description')}
      </Text>
      <LanguageRadio
        locales={data}
        onChange={handleLocaleChange}
        locale={locale}
        title={getTranslationText(translations, 'app-welcome-select')}
      />
      <Button mt={pxToRem(24)} onClick={handleContinue} variant="onboarding">
        {getTranslationText(translations, 'app-button-continue')}
      </Button>
    </Flex>
  )
}
