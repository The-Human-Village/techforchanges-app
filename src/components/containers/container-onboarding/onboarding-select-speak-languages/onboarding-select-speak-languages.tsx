import { useGetLanguages } from '@/api/services/languages/queries/useGetLanguages'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { LanguageSelection } from '@/components/containers/container-onboarding/onboarding-select-location/language-selection/language-selection'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useOnboardingStore } from '@/store/onboarding'
import { pxToRem } from '@/utilities/pxToRem'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

type Props = {
  next: () => void
}
export const OnboardingSelectSpeakLanguages = ({ next }: Props) => {
  const router = useRouter()
  const { locale } = router
  const [lang, setLanguage] = useState<string[]>([locale])
  const { data } = useGetLanguages({
    params: {
      populate: 'icon',
    },
  })
  const { data: translations } = useGetTranslations({ params: {} })

  const { setLangSpeak } = useOnboardingStore((state) => state)

  const handleContinue = () => {
    setLangSpeak(lang)
    trackMixpanelEvent('onboarding_location_skip')
    next()
  }

  const setLanguageHandle = (value: string[]) => {
    setLanguage(value)
    trackMixpanelEvent('onboarding_multiple_languages_continue')
  }

  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Text variant="onboardingTitle">
        {getTranslationText(translations, 'app-languages-you-speak-title')}
      </Text>
      <Text color="gray.800">
        {getTranslationText(
          translations,
          'app-languages-you-speak-description',
        )}
      </Text>
      <LanguageSelection
        languages={data}
        speakLang={lang}
        setSpeakLang={setLanguageHandle}
      />
      <Button mt={pxToRem(24)} onClick={handleContinue} variant="onboarding">
        {getTranslationText(translations, 'app-button-continue')}
      </Button>
    </Flex>
  )
}
