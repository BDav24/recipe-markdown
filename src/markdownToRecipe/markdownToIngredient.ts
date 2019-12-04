import { Ingredient } from '../types'

import markdownToMedia, { extractMediaMarkdown } from './markdownToMedia'

export default function markdownToIngredient(markdown: string): Ingredient {
  const [mediaMarkdown, markdownWithoutMedia] = extractMediaMarkdown(markdown)
  const [, quantity, unit, name] = markdownWithoutMedia.match(/([\d.,]+)? ?([^ ]*) (.*)/) || []
  return {
    ...(quantity
      ? { quantity: parseFloat(quantity), ...(unit ? { unit } : null), name }
      : { name: `${unit} ${name}` }),
    ...(mediaMarkdown ? { media: markdownToMedia(mediaMarkdown) } : null)
  }
}
