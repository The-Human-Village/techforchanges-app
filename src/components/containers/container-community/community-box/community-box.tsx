import type { Member } from '@/api/services/members/membersTypes'
import type { ServiceProviderContact } from '@/api/services/service-provider-contacts/serviceProviderContactsTypes'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { CommunityMembers } from '@/components/containers/container-community/community-members/community-members'
import { ArrowRight, Community } from '@/components/shared/icon/icon'
import { getTranslationText } from '@/helpers/helpers'
import { RoutePath } from '@/types'
import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  members: Member[] | ServiceProviderContact[]
  title: string
  text: string
}
export const CommunityBox = ({ members, title, text }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Flex gap={pxToRem(12)}>
        <Community w={pxToRem(28)} h={pxToRem(28)} fill="gray.900" />
        <Text
          fontWeight={800}
          fontSize={pxToRem(20)}
          lineHeight={pxToRem(28)}
          color="gray.900"
        >
          {title}
        </Text>
      </Flex>
      <Text>{text}</Text>
      <CommunityMembers data={members} />
      <Link as={NextLink} href={RoutePath.Community}>
        <Flex gap={pxToRem(10)} alignItems="center">
          <Text fontWeight={700} color="gray.900">
            {getTranslationText(translations, 'landing-join-us')}
          </Text>
          <ArrowRight fill="gray.900" />
        </Flex>
      </Link>
    </Flex>
  )
}
