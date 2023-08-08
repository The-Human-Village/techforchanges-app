import type { ILocale } from '@/api/services/locales/localesTypes'
import { pxToRem } from '@/utilities/pxToRem'
import { Button, Flex, Text } from '@chakra-ui/react'

type Props = {
  locales: ILocale[]
  onChange: (value: string) => void
  locale: string
}

export const SideMenuLanguage = ({ locales, onChange, locale }: Props) => {
  return (
    <Flex flexDir="row" gap={pxToRem(8)}>
      {locales?.map((item) => (
        <Button
          variant="unstyled"
          display="flex"
          justifyContent="center"
          bgColor={item.code === locale ? 'gray.500' : 'gray.300'}
          borderRadius={pxToRem(2)}
          key={item.id}
          width={pxToRem(48)}
          height={pxToRem(20)}
          onClick={() => onChange(item.code)}
          cursor="pointer"
        >
          <Text color="white" fontSize={pxToRem(14)} fontWeight={800}>
            {item?.code?.toUpperCase()}
          </Text>
        </Button>
      ))}
    </Flex>
  )
}
