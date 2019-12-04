import { Content, Media, Text } from '../types'
import { isEmpty, joinNotEmpty } from '../utils'

import mediaToMarkdown from './mediaToMarkdown'

export default function contentToMarkdown(content: Content): string {
  if (isEmpty(content)) return ''
  return joinNotEmpty(
    content.map((chunk): string => {
      const { type } = chunk
      if (type === 'comment') return `> ${(chunk as Text).text}`
      if (type === 'text') return (chunk as Text).text
      if (type === 'photo' || type === 'video') return mediaToMarkdown(chunk as Media)
      return ''
    }),
    '\n\n'
  )
}
