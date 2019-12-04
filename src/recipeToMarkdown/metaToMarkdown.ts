import { Place, RecipeMetaType } from '../types'
import { isEmpty, isEmptyOrEmptyArray, joinNotEmpty, isNotEmpty } from '../utils'

const metaToMarkdown = (meta: RecipeMetaType): string => {
  if (isEmpty(meta)) return ''
  const { type, tags, places, prepTime, cookTime, complexity, cost } = meta
  const metaMarkdown = joinNotEmpty(
    [
      isNotEmpty(type) ? `type: ${type}` : null,
      tagsToMarkdown(tags),
      placesToMarkdown(places),
      isNotEmpty(prepTime) ? `prep time: ${prepTime}` : null,
      isNotEmpty(cookTime) ? `cook time: ${cookTime}` : null,
      isNotEmpty(complexity) ? `complexity: ${complexity}` : null,
      isNotEmpty(cost) ? `cost: ${cost}` : null
    ],
    '\n'
  )
  return isNotEmpty(metaMarkdown) ? `---\n${metaMarkdown}\n---` : ''
}

const tagsToMarkdown = (tags: string[]): string => {
  if (isEmptyOrEmptyArray(tags)) return ''
  return `tags:\n${joinNotEmpty(tags.map(tag => `  - ${tag}`), '\n')}`
}

const placesToMarkdown = (places: Place[]): string => {
  if (isEmptyOrEmptyArray(places)) return ''
  return `places:\n${joinNotEmpty(
    places.map(
      ({ type, label }) =>
        `  - ${isNotEmpty(type) ? `${type}: ` : ''}${isNotEmpty(label) ? label : ''}`
    ),
    '\n'
  )}`
}

export default metaToMarkdown
