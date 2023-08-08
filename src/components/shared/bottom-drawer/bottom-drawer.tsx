import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { Close } from '@/components/shared/icon/icon'
import { getTranslationText } from '@/helpers/helpers'
import { pxToRem } from '@/utilities/pxToRem'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

export interface BottomDrawerItem {
  value: string
  name: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  items: BottomDrawerItem[]
  onChange: (value: string) => void
  defaultValue?: string
}
export const BottomDrawer = ({
  isOpen,
  onClose,
  onChange,
  items,
  defaultValue,
}: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent minH="50%" maxH="50%">
        <DrawerHeader
          display="flex"
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box></Box>
          <Heading
            as="h6"
            variant="title"
            fontSize={{ base: pxToRem(18) }}
            lineHeight={{ base: pxToRem(28) }}
            color="gray.800"
            fontWeight={700}
          >
            {getTranslationText(translations, 'app-location-placeholder')}
          </Heading>
          <Close
            boxSize={3}
            right={pxToRem(10)}
            top={pxToRem(10)}
            zIndex={1}
            onClick={onClose}
          ></Close>
        </DrawerHeader>
        <DrawerBody>
          <RadioGroup defaultValue={defaultValue} onChange={onChange}>
            <Stack>
              {items?.map((item) => (
                <Radio key={item.value} variant="location" value={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
