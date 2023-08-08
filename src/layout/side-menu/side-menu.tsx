import { useGetLocales } from '@/api/services/locales/queries/useGetLocales'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { BoxRedirectContainer } from '@/components/shared/box-redirect-container/box-redirect-container'
import {
  Close,
  Community,
  Knowledge,
  News,
  Redirect,
  Services,
  User,
} from '@/components/shared/icon/icon'
import { Loading } from '@/components/shared/loading/loading'
import { SideMenuLanguage } from '@/components/shared/sidemenu-language/sidemenu-language'
import { LANDING_PAGE_URL } from '@/constants'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { RoutePath, RoutePathLanding } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SideMenu = ({ isOpen, onClose }: Props) => {
  const router = useRouter()
  const { data: translations, isLoading } = useGetTranslations({ params: {} })

  const { locale, pathname, asPath, query } = router
  const { data: locales } = useGetLocales({ params: {} })

  const handleLocaleChange = (value: string) => {
    router.push({ pathname, query }, asPath, {
      locale: value,
    })
  }

  const [landingList, setLandingList] = useState([])
  const [navigationList, setNavigationList] = useState([])

  useEffect(() => {
    // Update landingList when locale changes
    const updatedLandingList = [
      {
        text: getTranslationText(translations, 'app-about-project'),
        href: LANDING_PAGE_URL,
        event: 'about_project',
      },
      {
        text: getTranslationText(translations, 'app-privacy-policy'),
        href: `${LANDING_PAGE_URL}${RoutePathLanding.PRIVACY_POLICY}`,
        event: 'privacy_policy',
      },
      {
        text: getTranslationText(translations, 'app-terms-of-use'),
        href: `${LANDING_PAGE_URL}${RoutePathLanding.TERMS_OF_USE}`,
        event: 'terms_of_use',
      },
      {
        text: getTranslationText(translations, 'app-cookie-policy'),
        href: `${LANDING_PAGE_URL}${RoutePathLanding.COOKIE_POLICY}`,
        event: 'cookie_policy',
      },
    ]
    setLandingList(updatedLandingList)

    // Update navigationList when locale changes
    const updatedNavigationList = [
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-knowledge',
        ),
        icon: (props) => <Knowledge {...props} w={pxToRem(15)} />,
        url: RoutePath.Knowledge,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-services',
        ),
        icon: (props) => <Services {...props} w={pxToRem(15)} />,
        url: RoutePath.Services,
      },
      {
        title: getTranslationText(translations, 'app-navigation-button-me'),
        icon: (props) => <User {...props} w={pxToRem(18)} />,
        url: RoutePath.Home,
      },
      {
        title: getTranslationText(translations, 'app-navigation-button-news'),
        icon: (props) => <News {...props} w={pxToRem(18)} />,
        url: RoutePath.News,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-community',
        ),
        icon: (props) => <Community {...props} w={pxToRem(18)} />,
        url: RoutePath.Community,
      },
    ]
    setNavigationList(updatedNavigationList)
  }, [translations, locale])

  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerHeader
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px"
            borderColor="gray.300"
          >
            <Link
              as={NextLink}
              href={RoutePath.Home}
              variant="title"
              fontSize={{ base: pxToRem(18) }}
              lineHeight={{ base: pxToRem(28) }}
              color="blue.400"
              fontWeight={800}
            >
              {getTranslationText(translations, 'app-name')}
            </Link>
            <Close
              boxSize={3}
              right={pxToRem(10)}
              top={pxToRem(10)}
              zIndex={1}
              onClick={onClose}
            />
          </DrawerHeader>

          <DrawerBody px={0}>
            <Flex
              flexDir="column"
              gap={pxToRem(12)}
              px={pxToRem(24)}
              py={pxToRem(20)}
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Text
                fontSize={pxToRem(12)}
                lineHeight={pxToRem(16)}
                fontWeight={500}
                color="black"
              >
                {getTranslationText(translations, 'app-language')}
              </Text>
              <SideMenuLanguage
                locales={locales}
                locale={locale}
                onChange={handleLocaleChange}
              />
            </Flex>
            <Flex
              flexDir="column"
              gap={pxToRem(16)}
              px={pxToRem(24)}
              py={pxToRem(20)}
              borderBottom="1px"
              borderColor="gray.300"
            >
              {isLoading ? (
                <Flex alignItems="center" justifyContent="center">
                  <Loading />
                </Flex>
              ) : (
                navigationList.map((item, idx) => (
                  <Link as={NextLink} href={item.url} key={idx}>
                    <Flex gap={pxToRem(16)}>
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.100"
                        w={pxToRem(24)}
                        h={pxToRem(24)}
                        borderRadius={pxToRem(4)}
                      >
                        <item.icon color="gray.400" />
                      </Flex>
                      <Text color="gray.500" fontWeight={500}>
                        {item.title}
                      </Text>
                    </Flex>
                  </Link>
                ))
              )}
            </Flex>

            <Flex
              flexDir="column"
              gap={pxToRem(20)}
              px={pxToRem(24)}
              py={pxToRem(20)}
            >
              <Flex flexDir="column" gap={pxToRem(16)}>
                {isLoading ? (
                  <Flex alignItems="center" justifyContent="center">
                    <Loading />
                  </Flex>
                ) : (
                  landingList.map((item, idx) => (
                    <Link
                      as={NextLink}
                      href={item.href}
                      key={idx}
                      onClick={() => trackMixpanelEvent(item.event)}
                    >
                      <Flex gap={pxToRem(12)} alignItems="center">
                        <Text color="gray.800">{item.text}</Text>
                        <Redirect fill="gray.500" />
                      </Flex>
                    </Link>
                  ))
                )}
              </Flex>
              <BoxRedirectContainer
                text={getTranslationText(
                  translations,
                  'app-become-volunteer-description',
                )}
                title={getTranslationText(
                  translations,
                  'app-become-volunteer-title',
                )}
                onClick={() => trackMixpanelEvent('become_volunteer')}
                href={`${LANDING_PAGE_URL}${RoutePathLanding.BECOME_VOLUNTEER}`}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
