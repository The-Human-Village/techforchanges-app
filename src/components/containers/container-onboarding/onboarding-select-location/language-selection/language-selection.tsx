import type { Language } from '@/api/services/languages/languagesTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { getTranslationText } from '@/helpers/helpers'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  languages: Language[]
  setSpeakLang: (value: string[]) => void
  speakLang: string[]
}
export const LanguageSelection = ({
  languages,
  setSpeakLang,
  speakLang,
}: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  return (
    <>
      <Text
        color="gray.900"
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
        fontWeight={700}
        mt={pxToRem(8)}
      >
        {getTranslationText(translations, 'app-languages-you-speak-select')}
      </Text>

      <CheckboxGroup onChange={setSpeakLang} defaultValue={speakLang}>
        <Stack
          spacing={pxToRem(10)}
          direction={['column', 'row']}
          alignItems="center"
        >
          {languages?.map((item) => (
            <Checkbox
              key={item?.uid}
              value={item?.abbreviation?.toLowerCase()}
              py={pxToRem(10)}
              px={pxToRem(16)}
              variant="lang"
              w="full"
            >
              <Box ml={pxToRem(16)} mr={pxToRem(8)}>
                <Image
                  src={item?.icon?.url}
                  alt={item?.title}
                  width={24}
                  height={16}
                />
              </Box>
              {item?.title}
            </Checkbox>
          ))}
          ;
        </Stack>
      </CheckboxGroup>
    </>
  )
}
