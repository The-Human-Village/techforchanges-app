import type { ILocale } from '@/api/services/locales/localesTypes'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  locales: ILocale[]
  onChange: (value: string) => void
  locale: string
  title: string
}

export const LanguageRadio = ({ locales, onChange, locale, title }: Props) => {
  return (
    <>
      <Text
        color="gray.900"
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
        fontWeight={700}
        mt={pxToRem(8)}
      >
        {title}
      </Text>

      <RadioGroup onChange={onChange} defaultValue={locale}>
        <Stack spacing={pxToRem(10)}>
          {locales?.map((item) => (
            <Radio
              key={item?.id}
              value={item?.code}
              py={pxToRem(10)}
              px={pxToRem(16)}
              variant="lang"
            >
              <Box ml={pxToRem(16)} mr={pxToRem(8)}>
                <Image
                  src={item?.flag?.url}
                  alt={`${item?.code} Flag`}
                  width={24}
                  height={16}
                />
              </Box>
              {item?.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </>
  )
}
