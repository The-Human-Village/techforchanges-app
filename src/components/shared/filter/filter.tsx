import type { FiltersResponse } from '@/api/services/filters/filtersTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { FilterDrawer } from '@/components/shared/filter/filter-drawer'
import { getTranslationText } from '@/helpers/helpers'
import { pxToRem } from '@/utilities/pxToRem'
import { Badge, Button, useDisclosure } from '@chakra-ui/react'

type Props = {
  filtersData: FiltersResponse
  handleApplyFilters: (value: string[]) => void
  defaultValue: string[]
  onClickClear: () => void
}

export const Filter = ({
  filtersData,
  handleApplyFilters,
  defaultValue,
  onClickClear,
}: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button variant="secondary" onClick={onOpen}>
        {getTranslationText(translations, 'app-button-filter')}
        {defaultValue && defaultValue.length > 0 && (
          <Badge
            fontSize={pxToRem(8)}
            variant="subtle"
            colorScheme="blue"
            position="absolute"
            top={pxToRem(-5)}
            right={pxToRem(-5)}
          >
            {defaultValue.length}
          </Badge>
        )}
      </Button>
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        filtersData={filtersData}
        handleApplyFilters={handleApplyFilters}
        onClickClear={onClickClear}
        defaultValue={defaultValue}
      />
    </>
  )
}
