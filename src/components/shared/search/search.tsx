import { Close, Search as SearchIcon } from '@/components/shared/icon/icon'
import { SEARCH_MAX_WIDTH } from '@/constants'
import { pxToRem } from '@/utilities/pxToRem'
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { useRef } from 'react'

type Props = {
  onSubmit: (value: string) => void
  handleClear: () => void
  searchTerm: string
  placeholder?: string
}

export const Search = ({
  onSubmit,
  handleClear,
  searchTerm,
  placeholder,
}: Props) => {
  const inputRef = useRef(null)
  return (
    <>
      <InputGroup maxW={pxToRem(SEARCH_MAX_WIDTH)}>
        <InputLeftElement pointerEvents="none" w={pxToRem(32)} h={pxToRem(36)}>
          <SearchIcon w={pxToRem(16)} h={pxToRem(16)} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          color="gray.900"
          borderColor="gray.200"
          placeholder={placeholder}
          pl={pxToRem(32)}
          h={pxToRem(36)}
          onBlur={(e) => onSubmit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e.currentTarget.value)
            }
          }}
        />

        <InputRightElement>
          {searchTerm && (
            <IconButton
              aria-label="Clear search term"
              variant="unstyled"
              icon={<Close w={pxToRem(10)} h={pxToRem(10)} />}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
                handleClear()
              }}
              color="gray.900"
              _focus={{ outline: 'none' }}
              mt={pxToRem(-5)}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </>
  )
}
