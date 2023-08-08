import { DESKTOP_MAX_WIDTH, MOBILE_MAX_WIDTH } from '@/constants'
import { Footer } from '@/layout/footer/footer'
import { Header } from '@/layout/header/header'
import { Navigation } from '@/layout/navigation/navigation'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const isDesktop = useBreakpointValue({ base: false, xl: true })

  const isOnboarding = useMemo(
    () => router.pathname === RoutePath.Onboarding,
    [router],
  )

  const maxContentWidth = isDesktop ? DESKTOP_MAX_WIDTH : MOBILE_MAX_WIDTH
  const hasFooter = !isOnboarding && !isDesktop
  const paddingX = isDesktop ? pxToRem(32) : pxToRem(16)

  return (
    <Box minH="100vh">
      <Flex direction="column" minH="100vh">
        <Header />
        {isDesktop && <Navigation />}
        <Flex
          as="main"
          flexDir="column"
          maxW={pxToRem(maxContentWidth)}
          w="100%"
          overflowY="auto"
          flexGrow={1}
          mx="auto"
          px={paddingX}
          gap={pxToRem(24)}
          mb={pxToRem(150)}
        >
          {children}
        </Flex>
        {hasFooter && <Footer />}
      </Flex>
    </Box>
  )
}
