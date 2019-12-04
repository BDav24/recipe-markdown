import { Place, RecipeMetaType } from '../types'
import { isEmpty, isEmptyArray, joinNotEmpty, notEmpty } from '../utils'

const metaToMarkdown = (meta: RecipeMetaType): string => {
  if (isEmpty(meta)) return ''
  const { type, tags, places, prepTime, cookTime, complexity, cost } = meta
  const metaMarkdown = joinNotEmpty(
    [
      notEmpty(type) ? `type: ${type}` : null,
      tagsToMarkdown(tags),
      placesToMarkdown(places),
      notEmpty(prepTime) ? `prep time: ${prepTime}` : null,
      notEmpty(cookTime) ? `cook time: ${cookTime}` : null,
      notEmpty(complexity) ? `complexity: ${complexity}` : null,
      notEmpty(cost) ? `cost: ${cost}` : null
    ],
    '\n'
  )
  return notEmpty(metaMarkdown) ? `---\n${metaMarkdown}\n---` : ''
}

const tagsToMarkdown = (tags: string[]): string => {
  if (isEmptyArray(tags)) return ''
  return `tags:\n${joinNotEmpty(tags.map(tag => `  - ${tag}`), '\n')}`
}

const placesToMarkdown = (places: Place[]): string => {
  if (isEmptyArray(places)) return ''
  return `places:\n${joinNotEmpty(
    places.map(
      ({ type, label }) => `  - ${notEmpty(type) ? `${type}: ` : ''}${notEmpty(label) ? label : ''}`
    ),
    '\n'
  )}`
}

export default metaToMarkdown
