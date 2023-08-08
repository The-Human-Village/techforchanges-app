import type { Member } from '@/api/services/members/membersTypes'
import type { ServiceProviderContact } from '@/api/services/service-provider-contacts/serviceProviderContactsTypes'
import { DimensionCards } from '@/components/shared/dimension-cards/dimension-cards'
import { Email, LocationPin, Phone } from '@/components/shared/icon/icon'
import { pxToRem } from '@/utilities/pxToRem'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useMemo } from 'react'

function instanceOfProviderContacts(
  array: any,
): array is ServiceProviderContact[] {
  return array?.length > 0 ? 'attributes' in array[0] : false
}

type Props = {
  data: Member[] | ServiceProviderContact[]
}
export const CommunityMembers = ({ data }: Props) => {
  const formattedData = useMemo(() => {
    if (instanceOfProviderContacts(data)) {
      return data.map((item: ServiceProviderContact) => {
        return {
          id: item.id,
          image: item.attributes?.image?.data?.attributes,
          first_name: item.attributes.first_name,
          last_name: item.attributes.last_name,
          languages: item?.attributes?.languages?.data?.map((lang) => ({
            ...lang.attributes,
            icon: lang?.attributes?.icon?.data?.attributes,
          })),
          dimensions: [],
          city: null,
          email: item?.attributes?.email,
          telephone_number: item?.attributes?.telephone_number,
        }
      })
    }
    return data
  }, [data])

  return (
    <Flex flexDirection="column" gap={pxToRem(12)}>
      {formattedData?.map((item, index) => (
        <Flex
          key={`${item.id}${index}`}
          borderRadius={pxToRem(8)}
          bg="white"
          position="relative"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)"
        >
          <Flex flexDir="column">
            <Box
              w={pxToRem(120)}
              height={pxToRem(120)}
              borderRadius={pxToRem(8)}
            >
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: pxToRem(8),
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                }}
                unoptimized
                src={item.image?.url}
                alt={item?.first_name}
                width="120"
                height="120"
              />
            </Box>
            <Flex p={pxToRem(8)} alignItems="center" justifyContent="center">
              <LocationPin w={pxToRem(20)} h={pxToRem(20)} color="blue.800" />
              <Text color="gray.900" fontSize={pxToRem(14)}>
                {item.city?.title ?? '-'}
              </Text>
            </Flex>
          </Flex>
          <Flex
            px={pxToRem(12)}
            py={pxToRem(16)}
            flexDir="column"
            gap={pxToRem(6)}
          >
            <Flex gap={pxToRem(12)}>
              <Text color="gray.900" fontWeight={700}>
                {`${item.first_name} ${item.last_name}`}
              </Text>
              <Flex alignItems="center">
                {item.languages?.map((language, index) => (
                  <Box
                    style={{
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      position: 'relative',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      outlineStyle: 'solid',
                      outlineColor: 'white',
                    }}
                    key={`${item.id}${index}`}
                    ml="-5px"
                  >
                    <Image
                      src={language.icon?.url}
                      alt={language.title}
                      unoptimized
                      width="20"
                      height="20"
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-6px',
                        width: '34px',
                        height: '24px',
                        maxWidth: '33px',
                        paddingLeft: '-18px',
                        marginRight: '20px',
                      }}
                    />
                  </Box>
                ))}
              </Flex>
            </Flex>
            <DimensionCards
              data={item.dimensions}
              justifyContent="flex-start"
            />
            <Link
              href={`mailto:${item.email}`}
              display="flex"
              gap={pxToRem(10)}
            >
              <Email w={pxToRem(24)} h={pxToRem(24)} color="blue.900" />
              <Text
                fontSize={pxToRem(14)}
                color="gray.900"
                wordBreak="break-all"
              >
                {item.email ?? '-'}
              </Text>
            </Link>
            {item.telephone_number && (
              <Link
                href={`tel:${item.telephone_number}`}
                display="flex"
                gap={pxToRem(10)}
                my={pxToRem(4)}
              >
                <Phone w={pxToRem(24)} h={pxToRem(24)} color="blue.900" />
                <Text fontSize={pxToRem(14)} color="gray.900">
                  {item.telephone_number}
                </Text>
              </Link>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
