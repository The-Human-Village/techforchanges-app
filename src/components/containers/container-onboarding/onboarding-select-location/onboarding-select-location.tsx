import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { LocationSelection } from '@/components/containers/container-onboarding/onboarding-select-location/location-selection/location-selection'
import { Lock } from '@/components/shared/icon/icon'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useOnboardingStore } from '@/store/onboarding'
import { pxToRem } from '@/utilities/pxToRem'
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  next: () => void
}
export const OnboardingSelectLocation = ({ next }: Props) => {
  const [city, setCity] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setLocation } = useOnboardingStore((state) => state)
  const { data: translations } = useGetTranslations({ params: {} })

  const handleContinue = () => {
    setLocation(city)
    trackMixpanelEvent('onboarding_location_continue')
    next()
  }

  const handleSkip = () => {
    trackMixpanelEvent('onboarding_location_skip')
    next()
  }

  const onChange = (value: string) => setCity(value)

  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Text variant="onboardingTitle">
        {getTranslationText(translations, 'app-location-title')}
      </Text>
      <Text color="gray.800">
        {getTranslationText(translations, 'app-location-description')}
      </Text>
      <Flex alignItems="center" gap={pxToRem(12)}>
        <Lock w={pxToRem(16)} h={pxToRem(16)} color="gray.500" />
        <Text color="gray.500" fontSize={pxToRem(14)} lineHeight={pxToRem(20)}>
          {getTranslationText(translations, 'app-not-share-privacy-info')}
        </Text>
      </Flex>
      <LocationSelection
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
      />
      <Flex flexDir="column">
        <Button mt={pxToRem(24)} onClick={handleContinue} variant="onboarding">
          {getTranslationText(translations, 'app-button-continue')}
        </Button>
        <Button
          variant="ghost"
          mt={pxToRem(22)}
          fontSize={pxToRem(18)}
          lineHeight={pxToRem(28)}
          onClick={handleSkip}
          color="blue.700"
        >
          {getTranslationText(translations, 'app-button-skip')}
        </Button>
        <Text
          fontSize={pxToRem(12)}
          lineHeight={pxToRem(12)}
          mt={pxToRem(14)}
          color="gray.500"
          textAlign="center"
        >
          {getTranslationText(translations, 'app-label-add-information-later')}
        </Text>
      </Flex>
    </Flex>
  )
}
