export const parseApiResponse = (apiResponse) => {
  if (!apiResponse) {
    return null
  }

  const parsedResponse = JSON.parse(apiResponse)

  if (!parsedResponse?.blocks) {
    return null
  }

  const htmlContent = parsedResponse.blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return `<p>${block.data.text}</p>`
        case 'list':
          const items = block.data.items
            .map((item) => `<li>${item}</li>`)
            .join('')
          return `<ul>${items}</ul>`
        case 'delimiter':
          return '<br>'
        // Handle other block types if necessary
        default:
          return ''
      }
    })
    .join('')

  return htmlContent
}
