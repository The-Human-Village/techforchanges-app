import { Back } from '@/components/shared/icon/icon'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type Props = {
  label: string
  color?: string
  onClick?: () => void
}

export const BackButton = ({ label, color = 'gray.700', onClick }: Props) => {
  const router = useRouter()

  const handleLinkClick = () => {
    if (onClick) {
      onClick() // Call onClick function if it is provided
    } else {
      router.back() // Call router.back() function
    }
  }

  return (
    <>
      <Link onClick={handleLinkClick}>
        <Flex alignItems="center">
          <Back width={pxToRem(20)} height={pxToRem(20)} color={color}></Back>
          <Text
            fontWeight={500}
            alignItems="center"
            color={color}
            fontSize={pxToRem(14)}
            lineHeight={pxToRem(20)}
          >
            {label}
          </Text>
        </Flex>
      </Link>
    </>
  )
}
