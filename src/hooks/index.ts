import type { ApplyFiltersRequest } from '@/api/services/filters/filtersTypes'
import { FiltersKeys } from '@/api/services/filters/filtersTypes'
import { omitBy } from 'lodash'
import { useSearchParams } from 'next/navigation'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'

export const setQueryParam = (
  paramName: string,
  value: string | string[] | boolean,
  router: NextRouter,
) => {
  const query = { ...router.query, [paramName]: value }
  router.push({ pathname: router.pathname, query }, undefined, {
    shallow: true,
  })
}

export const useSearchQuery = () => {
  const {
    dimensionUIDs,
    cities,
    returnNews,
    returnServices,
    returnMissions,
    returnServiceProviders,
    returnMembers,
  } = useFilters()

  const searchQuery = useMemo(() => {
    return omitBy(
      {
        dimensionUIDs,
        cities,
        returnNews,
        returnServices,
        returnMissions,
        returnServiceProviders,
        returnMembers,
      },
      (v) => v === null,
    )
  }, [
    dimensionUIDs,
    cities,
    returnNews,
    returnServices,
    returnMissions,
    returnServiceProviders,
    returnMembers,
  ])

  return searchQuery
}

export const useFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = router.pathname
  const query = router.query

  const setFilters = useCallback(
    (filterValues: ApplyFiltersRequest) => {
      const values = omitBy(filterValues, (v) => v === undefined)
      router.push(
        {
          pathname: pathname,
          query: {
            ...query,
            ...values,
          },
        },
        undefined,
        { shallow: true },
      )
    },
    [router, query, pathname],
  )

  const clearFilters = useCallback(() => {
    const withoutFilters = omitBy(query, (value, key) =>
      FiltersKeys.includes(key),
    )
    router.push(
      {
        pathname,
        query: withoutFilters,
      },
      undefined,
      { shallow: true },
    )
  }, [query, router, pathname])

  const dimensionUIDs = searchParams.getAll('dimensionUIDs')
  const cities = searchParams.getAll('cities')
  const returnNews = searchParams.get('returnNews')
  const returnServices = searchParams.get('returnServices')
  const returnMissions = searchParams.get('returnMissions')
  const returnServiceProviders = searchParams.get('returnServiceProviders')
  const returnMembers = searchParams.get('returnMembers')

  return {
    setFilters,
    dimensionUIDs,
    cities,
    returnNews,
    returnServices,
    returnMissions,
    returnServiceProviders,
    returnMembers,
    clearFilters,
  }
}

export function useInfiniteScroll(
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])
}
