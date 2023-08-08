import { useMemo } from 'react'

import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { NavLink } from '@/components/shared/nav-link/nav-link'
import { NAV_MAX_WIDTH } from '@/constants'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'

const Container = (props) => (
  <Flex
    as="nav"
    bg="white"
    position="sticky"
    w="full"
    zIndex={10}
    top={pxToRem(81)}
    borderColor="gray.200 !important"
    borderBottom="1px solid"
    {...props}
  />
)

const Content = (props) => (
  <Flex
    flexDir="row"
    justifyContent="space-between"
    alignItems="center"
    maxW={pxToRem(NAV_MAX_WIDTH)}
    m="0 auto"
    gap={pxToRem(18)}
    {...props}
  />
)

export const Navigation = () => {
  const { data: translations } = useGetTranslations({ params: {} })

  const navigationList = useMemo(() => {
    return [
      {
        title: getTranslationText(translations, 'app-navigation-button-me'),
        url: RoutePath.Home,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-community',
        ),
        url: RoutePath.Community,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-services',
        ),
        url: RoutePath.Services,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-knowledge',
        ),
        url: RoutePath.Knowledge,
      },
      {
        title: getTranslationText(translations, 'app-navigation-button-news'),
        url: RoutePath.News,
      },
    ]
  }, [translations])

  return (
    <Container>
      <Content>
        {navigationList.map((item, idx) => (
          <NavLink
            href={item.url}
            key={idx}
            variant="nav-link-desktop"
            onClick={() =>
              trackMixpanelEvent('page_view', {
                page: window.location.pathname,
              })
            }
          >
            <Text fontSize={pxToRem(14)} lineHeight={pxToRem(20)}>
              {item.title}
            </Text>
          </NavLink>
        ))}
      </Content>
    </Container>
  )
}
