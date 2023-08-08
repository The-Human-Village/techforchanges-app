import { colors } from '@/theme/colors'
import { styles } from '@/theme/styles'
import { extendTheme } from '@chakra-ui/react'
import { Manrope } from '@next/font/google'

// Component overrides
import { AccordionStyles as Accordion } from '@/theme/components/Accordion'
import { ButtonStyles as Button } from '@/theme/components/Button'
import { CardStyles as Card } from '@/theme/components/Card'
import { CheckboxStyles as Checkbox } from '@/theme/components/Checkbox'
import { DrawerStyles as Drawer } from '@/theme/components/Drawer'
import { HeadingStyles as Heading } from '@/theme/components/Heading'
import { InputStyles as Input } from '@/theme/components/Input'
import { LinkStyles as Link } from '@/theme/components/Link'
import { RadioStyles as Radio } from '@/theme/components/Radio'
import { TextStyles as Text } from '@/theme/components/Text'

const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

const overrides = {
  styles,
  colors,
  fonts: {
    heading: `${manrope.style.fontFamily}, sans-serif`,
    body: `${manrope.style.fontFamily}, sans-serif`,
  },
  components: {
    Card,
    Button,
    Accordion,
    Link,
    Text,
    Heading,
    Drawer,
    Radio,
    Checkbox,
    Input,
  },
}

export default extendTheme(overrides)
