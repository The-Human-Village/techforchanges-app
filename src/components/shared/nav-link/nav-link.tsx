import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const isActiveLink = (asPath, href) => {
  if (asPath === href) {
    return true
  }
  return asPath.startsWith(`${href}/`)
}

export const NavLink = ({ href, children, variant, ...rest }) => {
  const router = useRouter()
  const isActive = isActiveLink(router.asPath, href)

  return (
    <Link
      as={NextLink}
      href={href}
      variant={variant}
      {...rest}
      color={isActive ? 'blue.800' : { base: 'gray.400', xl: 'gray.800' }}
      fontWeight={isActive && 700}
      borderColor={isActive ? 'blue.800' : 'white'}
    >
      {children}
    </Link>
  )
}
