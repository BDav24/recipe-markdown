import { Ingredient } from '../types'
import { captureGroup, isNotEmpty, joinNotEmpty } from '../utils'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToIngredient(markdown: string): Ingredient {
  const [mediaMarkdown, markdownWithoutMedia] = extractMediaMarkdown(markdown)
  const [quantity, unit, name] = captureGroup(markdownWithoutMedia, /([\d.,]+)? ?([^ ]*)? ?(.*)/)
  return {
    ...(isNotEmpty(quantity)
      ? {
          quantity: parseFloat(quantity),
          ...(isNotEmpty(unit) && isNotEmpty(name) ? { unit } : null),
          name: isNotEmpty(name) ? name : unit
        }
      : { name: joinNotEmpty([unit, name], ' ') }),
    ...(isNotEmpty(mediaMarkdown) ? { media: markdownToMedia(mediaMarkdown) } : null)
  }
}
