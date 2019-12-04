import { Html, Media, Text } from '../types'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToContent(markdown: string): Text | Media | Html {
  if (markdown === '') {
    return { type: 'br' }
  } else if (/^-+$/.test(markdown)) {
    return { type: 'hr' }
  } else if (/^\s*> ?/.test(markdown)) {
    return { type: 'comment', text: markdown.replace(/^\s*> ?/, '') }
  } else {
    const [mediaMarkdown] = extractMediaMarkdown(markdown)
    if (mediaMarkdown) {
      return markdownToMedia(mediaMarkdown)
    } else {
      return { type: 'text', text: markdown }
    }
  }
}
