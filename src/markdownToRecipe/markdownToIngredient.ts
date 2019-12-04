import { Ingredient } from '../types'
import { captureGroup, isNotEmpty } from '../utils'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToIngredient(markdown: string): Ingredient {
  const [mediaMarkdown, markdownWithoutMedia] = extractMediaMarkdown(markdown)
  const [quantity, unit, name] = captureGroup(markdownWithoutMedia, /([\d.,]+)? ?([^ ]*) (.*)/)
  return {
    ...(isNotEmpty(quantity)
      ? { quantity: parseFloat(quantity), ...(isNotEmpty(unit) ? { unit } : null), name }
      : { name: `${unit} ${name}` }),
    ...(isNotEmpty(mediaMarkdown) ? { media: markdownToMedia(mediaMarkdown) } : null)
  }
}
