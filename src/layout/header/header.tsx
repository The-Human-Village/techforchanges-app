import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Link,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CircleIcon } from '@/components/shared/icon/icon'
import { Search } from '@/components/shared/search/search'
import { DESKTOP_MAX_WIDTH, MOBILE_MAX_WIDTH } from '@/constants'
import { getTranslationText } from '@/helpers/helpers'
import { SideMenu } from '@/layout/side-menu/side-menu'
import { useSearchStore } from '@/store/search'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'

const Container = ({ hasBorderBottom = false, ...props }) => (
  <Box
    as="header"
    bg="white"
    position="sticky"
    top={0}
    w="full"
    zIndex={10}
    borderColor="gray.200 !important"
    borderBottom={hasBorderBottom ? '1px solid' : ''}
    {...props}
  />
)

const Content = ({ maxWidth, ...props }) => (
  <Flex
    flexDir="row"
    justifyContent="space-between"
    alignItems="center"
    maxW={pxToRem(maxWidth)}
    m="0 auto"
    gap={pxToRem(24)}
    {...props}
  />
)

const HomeLink = ({ text, ...props }) => (
  <Link
    as={NextLink}
    href={RoutePath.Home}
    variant="title"
    fontSize={{ base: pxToRem(18) }}
    lineHeight={{ base: pxToRem(28) }}
    color="blue.400"
    fontWeight={800}
    {...props}
  >
    {text}
  </Link>
)

const MenuButton = ({ onOpen, ...props }) => (
  <Box position="relative" {...props}>
    <CircleIcon
      boxSize={3}
      position="absolute"
      right={pxToRem(5)}
      top={pxToRem(7)}
      zIndex={1}
      color="blue.400"
    />
    <IconButton
      icon={<HamburgerIcon w={pxToRem(24)} h={pxToRem(24)} />}
      variant="ghost"
      aria-label="Open menu"
      color="gray.900"
      onClick={onOpen}
    />
  </Box>
)

const Locale = ({ locale, ...props }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    bgColor="gray.500"
    {...props}
  >
    <Text color="white" fontSize={pxToRem(14)} fontWeight={800}>
      {locale?.toUpperCase()}
    </Text>
  </Flex>
)

export const Header = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { searchTerm, setSearchTerm } = useSearchStore(
    ({ searchTerm, setSearchTerm }) => ({
      searchTerm,
      setSearchTerm,
    }),
  )

  const { data: translations } = useGetTranslations({ params: {} })
  const isDesktop = useBreakpointValue({ base: false, xl: true })

  const handleInputChange = useCallback(
    (value) => {
      setSearchTerm(value)
    },
    [setSearchTerm],
  )

  const { locale } = router

  const isOnboarding = useMemo(
    () => router.pathname === RoutePath.Onboarding,
    [router],
  )

  const maxContentWidth = isDesktop ? DESKTOP_MAX_WIDTH : MOBILE_MAX_WIDTH
  const padding = isDesktop ? `${pxToRem(20)} ${pxToRem(32)}` : pxToRem(16)
  const hasBorderBottom = isDesktop || isOnboarding
  const localeWidth = isDesktop ? pxToRem(40) : pxToRem(48)
  const localeHeight = isDesktop ? pxToRem(40) : pxToRem(20)
  const localeBorderRadius = isDesktop ? pxToRem(6) : pxToRem(2)

  const showSearchAndMenu = useMemo(() => !isOnboarding, [isOnboarding])

  return (
    <Container hasBorderBottom={hasBorderBottom} p={padding}>
      <Content maxWidth={maxContentWidth}>
        <HomeLink text={getTranslationText(translations, 'app-name')} />
        {showSearchAndMenu ? (
          <>
            <Search
              onSubmit={handleInputChange}
              handleClear={() => setSearchTerm('')}
              searchTerm={searchTerm}
              placeholder={getTranslationText(
                translations,
                'app-search-placeholder',
              )}
            />

            <MenuButton onOpen={onOpen} />
          </>
        ) : (
          <Locale
            locale={locale}
            width={localeWidth}
            height={localeHeight}
            borderRadius={localeBorderRadius}
          />
        )}
      </Content>
      <SideMenu isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}
