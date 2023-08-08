import type { ITranslation } from '@/api/services/translations/translationsTypes'
import { DATE_FORMAT } from '@/constants'
import dayjs from 'dayjs'

export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, '')
}

export function getUniqueListBy(arr: any[], key: string) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export const getTranslationText = (
  translations: Record<string, ITranslation>,
  key: string,
): string | null => (translations && translations[key]?.text) || null

export const areAllArraysEmpty = (obj) => {
  return Object.values(obj).every(
    (arr) => Array.isArray(arr) && arr.length === 0,
  )
}

export const getCities = (data: string[]) => {
  return data.filter((item) => !item?.includes('dimension'))
}

export const getDimensions = (data: string[]) => {
  return data.filter((item) => item?.includes('dimension'))
}

export const getFormattedDate = (item) => {
  if (!item) return null
  const text = JSON.parse(item)
  return dayjs(text.time).format(DATE_FORMAT)
}
