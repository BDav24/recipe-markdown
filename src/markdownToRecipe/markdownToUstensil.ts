import { Ustensil } from '../types'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToUstensil(markdown: string): Ustensil {
  const [mediaMarkdown, markdownWithoutMedia] = extractMediaMarkdown(markdown)
  const [, quantity, label] = markdownWithoutMedia.match(/([\d.,]+)? ?(.*)/) || []
  return {
    ...(label ? { label } : null),
    ...(quantity ? { quantity: parseFloat(quantity) } : null),
    ...(mediaMarkdown ? { media: markdownToMedia(mediaMarkdown) } : null)
  }
}
