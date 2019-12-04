import { Ustensil } from '../types'
import { captureGroup, isNotEmpty } from '../utils'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToUstensil(markdown: string): Ustensil {
  const [mediaMarkdown, markdownWithoutMedia] = extractMediaMarkdown(markdown)
  const [quantity, label] = captureGroup(markdownWithoutMedia, /([\d.,]+)? ?(.*)/)
  return {
    ...(isNotEmpty(label) ? { label } : null),
    ...(isNotEmpty(quantity) ? { quantity: parseFloat(quantity) } : null),
    ...(isNotEmpty(mediaMarkdown) ? { media: markdownToMedia(mediaMarkdown) } : null)
  }
}
