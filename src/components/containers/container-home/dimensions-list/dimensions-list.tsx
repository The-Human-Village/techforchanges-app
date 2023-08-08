import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { DimensionCheckbox } from '@/components/containers/container-home/dimensions-list/dimension-checkbox/dimension-checkbox'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { useFilters, useSearchQuery } from '@/hooks'
import { RoutePath } from '@/types/index'
import { pxToRem } from '@/utilities/pxToRem'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  data: Dimension[]
}

export const dimensionsSchema = z.object({
  dimensions: z.string().array().nonempty({
    message: 'This field is required',
  }),
})

export type DimensionsDto = z.infer<typeof dimensionsSchema>

export const DimensionsList = ({ data }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })
  const router = useRouter()
  const searchQuery = useSearchQuery()

  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    control,
  } = useForm<DimensionsDto>({
    mode: 'onBlur',
    resolver: zodResolver(dimensionsSchema),
    defaultValues: {
      dimensions: [],
    },
  })

  const { setFilters } = useFilters()

  const handleApplyFilters = useCallback(
    (values: string[]) => {
      setFilters({
        dimensionUIDs: values,
        returnServices: true,
        returnMissions: true,
        returnNews: true,
        returnServiceProviders: true,
        returnMembers: true,
      })

      // Track Mixpanel event
      trackMixpanelEvent('i_need_help_with')
    },
    [setFilters],
  )

  useEffect(() => {
    if (searchQuery.dimensionUIDs.length > 0) {
      router.push({
        pathname: RoutePath.INeedHelpWith,
        query: searchQuery,
      })
    }
  }, [router, searchQuery, setFilters])

  const onSubmit: SubmitHandler<DimensionsDto> = (values) => {
    handleApplyFilters(values.dimensions)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap={pxToRem(16)} mt={pxToRem(24)}>
        <FormControl isInvalid={!!errors?.dimensions}>
          <FormLabel
            color="gray.900"
            fontSize={pxToRem(20)}
            lineHeight={pxToRem(28)}
            fontWeight={800}
          >
            {getTranslationText(translations, 'app-i-need-help-with')}
          </FormLabel>
          <FormHelperText
            color="gray.800"
            fontSize={pxToRem(16)}
            lineHeight={pxToRem(24)}
            mb={pxToRem(16)}
          >
            {getTranslationText(translations, 'app-i-need-help-description')}
          </FormHelperText>
          <Controller
            control={control}
            name="dimensions"
            render={({ field: { onChange, value } }) => (
              <DimensionCheckbox
                name="dimensions"
                onChange={onChange}
                value={value}
                dimensions={data}
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          lineHeight={pxToRem(28)}
          fontSize={pxToRem(18)}
          isDisabled={!isValid || isSubmitting}
          py={pxToRem(24)}
        >
          {getTranslationText(translations, 'app-button-continue')}
        </Button>
      </Flex>
    </form>
  )
}
