import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import {
  Community,
  Knowledge,
  News,
  Services,
  User,
} from '@/components/shared/icon/icon'
import { NavLink } from '@/components/shared/nav-link/nav-link'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { HStack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export const BottomToolbar = () => {
  const { data: translations } = useGetTranslations({ params: {} })

  const navigationList = useMemo(() => {
    return [
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-knowledge',
        ),
        icon: (props) => (
          <Knowledge {...props} w={pxToRem(23)} h={pxToRem(20)} />
        ),
        url: RoutePath.Knowledge,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-services',
        ),
        icon: (props) => (
          <Services {...props} w={pxToRem(23)} h={pxToRem(20)} />
        ),
        url: RoutePath.Services,
      },
      {
        title: getTranslationText(translations, 'app-navigation-button-me'),
        icon: (props) => <User {...props} w={pxToRem(20)} h={pxToRem(22)} />,
        url: RoutePath.Home,
      },
      {
        title: getTranslationText(translations, 'app-navigation-button-news'),
        icon: (props) => <News {...props} w={pxToRem(17)} h={pxToRem(22)} />,
        url: RoutePath.News,
      },
      {
        title: getTranslationText(
          translations,
          'app-navigation-button-community',
        ),
        icon: (props) => (
          <Community {...props} w={pxToRem(23)} h={pxToRem(18)} />
        ),
        url: RoutePath.Community,
      },
    ]
  }, [translations])

  return (
    <HStack
      flexDir="row"
      bg="white"
      justifyContent="space-between"
      w="full"
      px={pxToRem(16)}
    >
      {navigationList.map((item, idx) => (
        <NavLink
          href={item.url}
          key={idx}
          variant="nav-link"
          onClick={() =>
            trackMixpanelEvent('page_view', { page: window.location.pathname })
          }
        >
          <item.icon />
          <Text
            fontSize={pxToRem(12)}
            lineHeight={pxToRem(16)}
            fontWeight={500}
          >
            {item.title}
          </Text>
        </NavLink>
      ))}
    </HStack>
  )
}
