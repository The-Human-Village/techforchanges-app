import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { OnboardingSelectAppLanguage } from '@/components/containers/container-onboarding/onboarding-select-app-language/onboarding-select-app-language'
import { OnboardingSelectLocation } from '@/components/containers/container-onboarding/onboarding-select-location/onboarding-select-location'
import { OnboardingSelectSpeakLanguages } from '@/components/containers/container-onboarding/onboarding-select-speak-languages/onboarding-select-speak-languages'
import { BackButton } from '@/components/shared/back-button/back-button'
import { ONBOARDING_MAX_WIDTH } from '@/constants'
import { getTranslationText } from '@/helpers/helpers'
import { useOnboardingStore } from '@/store/onboarding'
import { OnboardingStep, RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const ContainerOnboarding = () => {
  const [step, setStep] = useState(OnboardingStep.AppLanguage)
  const router = useRouter()
  const { data: translations } = useGetTranslations({ params: {} })
  const { setCurrentOnboardingPage, setIsOnboardingCompleted } =
    useOnboardingStore((state) => state)

  useEffect(() => {
    setCurrentOnboardingPage(step)
  }, [setCurrentOnboardingPage, step])

  const nextStep = useCallback(
    () =>
      setStep((state) => {
        if (
          state === OnboardingStep.AppLanguage ||
          state === OnboardingStep.SpeakLanguage
        ) {
          return ++state
        } else if (state === OnboardingStep.Location) {
          setTimeout(() => setIsOnboardingCompleted(true))
          router.push(RoutePath.Home)
        }
        return state
      }),
    [router, setIsOnboardingCompleted],
  )

  const currentStep = useMemo(() => {
    switch (step) {
      case OnboardingStep.AppLanguage:
        return <OnboardingSelectAppLanguage next={nextStep} />
      case OnboardingStep.SpeakLanguage:
        return <OnboardingSelectSpeakLanguages next={nextStep} />
      case OnboardingStep.Location:
        return <OnboardingSelectLocation next={nextStep} />
      default:
        return null
    }
  }, [nextStep, step])

  const showBackButton = useMemo(
    () => step !== OnboardingStep.AppLanguage,
    [step],
  )

  return (
    <Box mt={pxToRem(16)}>
      {showBackButton && (
        <BackButton
          label={getTranslationText(translations, 'app-button-back')}
        />
      )}
      <Flex
        maxW={pxToRem(ONBOARDING_MAX_WIDTH)}
        mx="auto"
        mt={{ base: pxToRem(32), xl: pxToRem(119) }}
      >
        {currentStep}
      </Flex>
    </Box>
  )
}
