import defaultIllustration from '@/assets/illustration1.png'
import { BookmarkItem } from '@/components/shared/bookmark-item/bookmark-item'
import { RichText } from '@/components/shared/rich-text/rich-text'
import type { BookmarkType } from '@/store/bookmarks'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

type Props = {
  onClick: () => void
  bgImageUrl: string
  dimensions: React.ReactNode
  date: string
  title: string
  description: string
  bookmarkType: BookmarkType
  locale_uid: string
}

export const Card = ({
  onClick,
  bgImageUrl,
  dimensions,
  date,
  title,
  description,
  bookmarkType,
  locale_uid,
}: Props) => {
  return (
    <Button variant="card" onClick={onClick}>
      <Flex
        flexDir="column"
        borderRadius={pxToRem(8)}
        borderColor="gray.200 !important"
        border="1px"
        bg="white"
        alignItems="center"
        w={pxToRem(343)}
      >
        <Box
          bgSize="cover"
          bgPosition="center"
          position="relative"
          bgImage={bgImageUrl}
          bg={!bgImageUrl && 'gray.50'}
          borderTopRadius={pxToRem(8)}
          w="100%"
          h={pxToRem(132)}
        >
          <Box top={pxToRem(16)} right={pxToRem(16)} position="absolute">
            {dimensions}
          </Box>
          {!bgImageUrl && (
            <Image
              src={defaultIllustration.src}
              alt=""
              width="auto"
              mt={pxToRem(16)}
              mx="auto"
              height={pxToRem(100)}
            />
          )}
        </Box>
        <Flex
          flexDir="column"
          pt={pxToRem(16)}
          px={pxToRem(16)}
          pb={pxToRem(20)}
          gap={pxToRem(4)}
        >
          <Flex justifyContent="space-between">
            <Text
              fontWeight={500}
              fontSize={pxToRem(12)}
              lineHeight={pxToRem(16)}
              color="gray.500"
            >
              {date}
            </Text>
            <BookmarkItem bookmarkType={bookmarkType} locale_uid={locale_uid} />
          </Flex>
          <Flex flexDir="column" gap={pxToRem(8)}>
            <Text fontWeight={700} color="blue.800" noOfLines={2}>
              {title}
            </Text>
            <RichText text={description} />
          </Flex>
        </Flex>
      </Flex>
    </Button>
  )
}
