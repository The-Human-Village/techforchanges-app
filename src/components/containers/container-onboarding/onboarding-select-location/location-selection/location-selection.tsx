import { useGetCities } from '@/api/services/cities/queries/useGetCities'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { BottomDrawer } from '@/components/shared/bottom-drawer/bottom-drawer'
import { DownArrow } from '@/components/shared/icon/icon'
import { getTranslationText } from '@/helpers/helpers'
import { useOnboardingStore } from '@/store/onboarding'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Select, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

type Props = {
  onChange: (value: string) => void
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const LocationSelection = ({
  onChange,
  onClose,
  onOpen,
  isOpen,
}: Props) => {
  const { data: cities } = useGetCities({ params: {} })
  const { location: stateCity } = useOnboardingStore((state) => state)
  const [value, setValue] = useState(stateCity ?? '')
  const { data: translations } = useGetTranslations({ params: {} })

  const formattedCities = useMemo(
    () =>
      cities?.map((city) => ({
        name: city.title,
        value: city.id.toFixed(),
      })),
    [cities],
  )

  const selectedCity = useMemo(
    () => formattedCities?.find((c) => c.value === value),
    [formattedCities, value],
  )

  return (
    <>
      <Text
        color="gray.900"
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
        fontWeight={700}
        mt={pxToRem(8)}
      >
        {getTranslationText(translations, 'app-location-select')}
      </Text>

      <Select
        onClick={onOpen}
        height={pxToRem(44)}
        icon={<DownArrow />}
        iconColor="gray.500"
        iconSize={pxToRem(15)}
        defaultValue=""
      >
        <option hidden disabled value="">
          {selectedCity?.name ??
            getTranslationText(translations, 'app-location-placeholder')}
        </option>
      </Select>
      <Box>
        <BottomDrawer
          onChange={(selectedValue: string) => {
            onChange(selectedValue)
            setValue(selectedValue)
          }}
          defaultValue={selectedCity?.value}
          items={formattedCities}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </>
  )
}
