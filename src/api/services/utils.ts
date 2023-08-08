import { dimensionsKeys } from '@/api/services/dimensions/dimensionsKeys'
import { fetchDimensionsData } from '@/api/services/dimensions/queries/useGetDimensions'
import { localesKeys } from '@/api/services/locales/localesKeys'
import { fetchLocalesData } from '@/api/services/locales/queries/useGetLocales'
import { fetchTranslationsData } from '@/api/services/translations/queries/useTranslations'
import { translationsKeys } from '@/api/services/translations/translationsKeys'
import { dehydrate } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getCommonServerSideProps(
  context: GetServerSidePropsContext,
  queryClient,
) {
  await queryClient.prefetchQuery(
    [...dimensionsKeys.getDimensions, context.locale],
    () =>
      fetchDimensionsData({
        populate: 'icon',
        locale: context.locale,
      }),
  )

  await queryClient.prefetchQuery(
    [...translationsKeys.getTranslations, context.locale],
    () =>
      fetchTranslationsData({
        locale: context.locale,
      }),
  )

  await queryClient.prefetchQuery(
    [...localesKeys.getLocales, context.locale],
    () =>
      fetchLocalesData({
        locale: context.locale,
      }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export const getNextPageParam = (lastPage) => {
  const nextPage = lastPage.pagination.page + 1
  return nextPage <= lastPage.pagination.pageCount ? nextPage : undefined
}
