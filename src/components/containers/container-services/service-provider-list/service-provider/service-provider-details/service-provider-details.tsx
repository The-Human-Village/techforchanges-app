import { useGetServiceProvider } from '@/api/services/service-provider/queries/useGetServiceProvider'
import { useGetTranslations } from '@/api/services/translations/queries/useTranslations'
import { ContactList } from '@/components/containers/container-services/service-provider-list/service-provider/service-provider-details/contact-list/contact-list'
import { BackButton } from '@/components/shared/back-button/back-button'
import { BoxRedirectContainer } from '@/components/shared/box-redirect-container/box-redirect-container'
import { DimensionCards } from '@/components/shared/dimension-cards/dimension-cards'
import {
  MessageContainer,
  PhoneContainer,
  ViberContainer,
  WebsiteContainer,
} from '@/components/shared/icon/icon'
import { RichText } from '@/components/shared/rich-text/rich-text'
import { StyledContainer } from '@/components/shared/styled/styled-container/styled-container'
import { getTranslationText } from '@/helpers/helpers'
import { trackMixpanelEvent } from '@/helpers/mixpanel'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

type Props = {
  id: string
}

export const ServiceProviderDetails = ({ id }: Props) => {
  const { data: translations } = useGetTranslations({ params: {} })

  const { data: serviceProvider } = useGetServiceProvider({
    params: {
      populate: 'dimensions, dimensions.icon, dimension.alt_icon, logo',
      filters: {
        locale_uid: id,
      },
    },
    options: {
      enabled: !!id,
    },
  })
  const dimensions = useMemo(
    () => serviceProvider?.dimensions ?? [],
    [serviceProvider?.dimensions],
  )

  const contacts = useMemo(() => {
    const tempContacts = [
      {
        icon: <MessageContainer width={pxToRem(24)} height={pxToRem(24)} />,
        title: serviceProvider?.email,
      },
      {
        icon: <PhoneContainer width={pxToRem(24)} height={pxToRem(24)} />,
        title: serviceProvider?.telephone_number,
      },
      {
        icon: <ViberContainer width={pxToRem(24)} height={pxToRem(24)} />,
        title: serviceProvider?.telephone_number,
      },
      {
        icon: <WebsiteContainer width={pxToRem(24)} height={pxToRem(24)} />,
        title: (
          <Link href={serviceProvider?.website_url} target="_blank">
            {serviceProvider?.website_url}
          </Link>
        ),
      },
    ]

    return tempContacts.filter((t) => t.title)
  }, [
    serviceProvider?.email,
    serviceProvider?.telephone_number,
    serviceProvider?.website_url,
  ])

  return (
    <Box mt={pxToRem(24)}>
      <BackButton label={getTranslationText(translations, 'app-button-back')} />
      <StyledContainer gap={pxToRem(24)}>
        <Flex justifyContent="space-between">
          <Text color="blue.800" fontSize={pxToRem(20)} fontWeight={800}>
            {serviceProvider?.title}
          </Text>
          {serviceProvider?.logo?.url && (
            <Image
              src={serviceProvider?.logo?.url}
              alt={serviceProvider?.title}
              w={pxToRem(100)}
            />
          )}
        </Flex>
        {dimensions.length > 0 && <DimensionCards data={dimensions} />}
        <RichText text={serviceProvider?.description} />
        {serviceProvider?.website_url && (
          <BoxRedirectContainer
            title={getTranslationText(translations, 'app-get-service-provider')}
            href="serviceProvider.attributes.website_url"
            onClick={() => trackMixpanelEvent('get_service_provider')}
          />
        )}
        {contacts.length > 0 && (
          <ContactList
            title={getTranslationText(translations, 'app-contact-information')}
            data={contacts}
          />
        )}
      </StyledContainer>
    </Box>
  )
}
