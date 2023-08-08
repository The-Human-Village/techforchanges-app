import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { BookmarkAdd, BookmarkRemove } from '@/components/shared/icon/icon'
import { getTranslationText } from '@/helpers/helpers'
import type { BookmarkType } from '@/store/bookmarks'
import { useBookmarksStore } from '@/store/bookmarks'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

type Props = {
  locale_uid: string
  bookmarkType: BookmarkType
  showText?: boolean
}

export const BookmarkItem = ({ locale_uid, bookmarkType, showText }: Props) => {
  const { isBookmarked, toggleBookmark } = useBookmarksStore((state) => state)
  const { data: translations } = useGetTranslations({ params: {} })

  const handleBookmarkChange = useCallback(() => {
    toggleBookmark(bookmarkType, locale_uid)
  }, [bookmarkType, locale_uid, toggleBookmark])

  const isCurrentlyBookmarked = isBookmarked(bookmarkType, locale_uid)

  const bookmarkIcon = isCurrentlyBookmarked ? (
    <BookmarkRemove w={pxToRem(20)} h={pxToRem(20)} />
  ) : (
    <BookmarkAdd w={pxToRem(20)} h={pxToRem(20)} />
  )

  const bookmarkText = isCurrentlyBookmarked
    ? getTranslationText(translations, 'app-remove-bookmark')
    : getTranslationText(translations, 'app-add-bookmark')

  const handleBookmarkClick = (event) => {
    handleBookmarkChange()
    event.stopPropagation()
  }

  return (
    <Flex
      ml={pxToRem(16)}
      mb={pxToRem(16)}
      gap={pxToRem(5)}
      alignItems="center"
    >
      <IconButton
        textAlign="center"
        icon={bookmarkIcon}
        variant="unstyled"
        onClick={handleBookmarkClick}
        minW="unset"
        height="auto"
        aria-label="bookmark"
      />
      {showText && (
        <Text color="gray.700" fontSize={pxToRem(14)} lineHeight={pxToRem(20)}>
          {bookmarkText}
        </Text>
      )}
    </Flex>
  )
}
