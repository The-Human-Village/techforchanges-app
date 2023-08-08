import { Spinner } from '@chakra-ui/react'

type Props = {
  mt?: string
}

export const Loading = ({ mt }: Props) => {
  return (
    <Spinner
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
      mt={mt}
    />
  )
}
