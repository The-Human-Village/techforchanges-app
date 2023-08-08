import { Box, useTheme } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  url: string
  alt?: string
  color?: string
  w: string | number
  h: string | number
  style?: React.CSSProperties
}

export function CustomSVG({ url, color, style }: Props) {
  const theme = useTheme()
  const [svgData, setSvgData] = useState('')

  useEffect(() => {
    const fetchSvgData = async () => {
      try {
        if (url) {
          const response = await axios.get(url)
          const modifiedSvgData = updateSvgFill(response.data, color)
          setSvgData(modifiedSvgData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSvgData()
  }, [url, color])

  const updateSvgFill = (svgContent: string, color?: string) => {
    if (color) {
      const modifiedSvg = svgContent.replace(
        /fill="([^"]+)"/g,
        `fill="currentColor"`,
      )
      return modifiedSvg
    }
    return svgContent
  }

  const svgStyle = useMemo(() => {
    const defaultColor = theme.colors.gray['500']
    const colorArr = color?.split('.') || []
    const colorValue =
      colorArr.length === 2
        ? theme.colors[colorArr[0]][colorArr[1]]
        : theme.colors[colorArr[0]] || defaultColor
    return {
      ...style,
      color: colorValue,

      display: 'inline-block',
    }
  }, [color, theme.colors, style])

  return (
    <Box
      className="custom-svg"
      style={svgStyle}
      dangerouslySetInnerHTML={{ __html: svgData }}
    />
  )
}
