import { pxToRem } from '@/utilities/pxToRem'
import { Flex, Text } from '@chakra-ui/react'

export const ContactList = ({ title, data }) => {
  return (
    <Flex flexDir="column" gap={pxToRem(16)}>
      <Text
        color="gray.900"
        fontWeight={800}
        fontSize={pxToRem(20)}
        lineHeight={pxToRem(28)}
      >
        {title}
      </Text>

      <Flex flexDir="column" gap={pxToRem(20)}>
        {data.map((item, index) => (
          <Flex
            key={`${item.title}${index}`}
            alignItems="center"
            gap={pxToRem(12)}
          >
            {item.icon}
            <Text color="black">{item.title}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
