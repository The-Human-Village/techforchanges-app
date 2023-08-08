import type { FiltersResponse } from '@/api/services/filters/filtersTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { FilterCheckboxGroup } from '@/components/shared/filter/filter-checkbox-group'
import { getTranslationText } from '@/helpers/helpers'
import { pxToRem } from '@/utilities/pxToRem'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  filtersData: FiltersResponse
  handleApplyFilters: (value: string[]) => void
  defaultValue: string[]
  onClickClear
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  filtersData,
  handleApplyFilters,
  defaultValue,
  onClickClear,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const { data: translations } = useGetTranslations({ params: {} })

  const [checkedItems, setCheckedItems] = useState(defaultValue)

  const handleCheckedItemsChange = (newCheckedItems) => {
    setCheckedItems(newCheckedItems)
  }

  const applyFilters = () => {
    handleApplyFilters(checkedItems)
    setTimeout(() => {
      onClose()
    }, 1000) // one seconds delay
  }

  const clearFilters = () => {
    onClickClear()
    setCheckedItems([])
    setTimeout(() => {
      onClose()
    }, 1000) // one seconds delay
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement={isMobile ? 'bottom' : 'right'}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent bg="white">
        <DrawerCloseButton />
        <DrawerHeader
          textAlign="center"
          color="gray.800"
          fontSize={pxToRem(18)}
          lineHeight={pxToRem(18)}
          fontWeight={700}
        >
          {getTranslationText(translations, 'app-filtering-title')}
        </DrawerHeader>
        <DrawerBody px={pxToRem(16)} pt={pxToRem(12)} pb={pxToRem(40)}>
          <Flex flexDir="column" gap={pxToRem(40)}>
            {Object.keys(filtersData).map(
              (key) =>
                filtersData[key]?.length > 0 && (
                  <FilterCheckboxGroup
                    key={key}
                    title={key}
                    items={filtersData[key]}
                    name={key}
                    value={checkedItems}
                    onChange={handleCheckedItemsChange}
                  />
                ),
            )}
          </Flex>
        </DrawerBody>
        <DrawerFooter px={pxToRem(16)} pt={0} pb={pxToRem(24)}>
          <Flex flexDir="column" w="full" gap={pxToRem(8)}>
            <Button onClick={applyFilters}>
              {getTranslationText(translations, 'app-button-apply')}
            </Button>
            <Button variant="ghost" color="blue.800" onClick={clearFilters}>
              {getTranslationText(translations, 'app-button-clear')}
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
