import {
  Content,
  Direction,
  DirectionGroup,
  Ingredient,
  IngredientGroup,
  Media,
  Place,
  Recipe,
  RecipeMetaType,
  Text,
  Ustensil
} from './types'
import { isEmpty, isEmptyArray, joinNotEmpty, nonEmptyArray, notEmpty } from './utils'

export default function recipeToMarkdown(recipe: Recipe): string {
  const {
    meta,
    title,
    description,
    ingredientGroups,
    servings,
    ustensils,
    directionGroups
  } = recipe
  const recipeMarkdown = joinNotEmpty(
    [
      metaToMarkdown(meta),
      titleToMarkdown(title),
      contentToMarkdown(description),
      separatorIf(nonEmptyArray(description)),
      ingredientGroupsToMarkdown(ingredientGroups, servings),
      separatorIf(nonEmptyArray(ingredientGroups)),
      ustensilsToMarkdown(ustensils),
      separatorIf(nonEmptyArray(ustensils)),
      directionGroupsToMarkdown(directionGroups)
    ],
    '\n\n'
  )
  return notEmpty(recipeMarkdown) ? `\n${recipeMarkdown}\n` : ''
}

const separatorIf = (condition: boolean): string => (condition ? '---' : null)

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

const titleToMarkdown = (title: string): string => {
  if (isEmpty(title)) return ''
  return `# ${title}`
}

const contentToMarkdown = (content: Content): string => {
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

const mediaToMarkdown = (media: Media): string => {
  if (isEmpty(media)) return ''
  const { src, url, alt } = media
  if (isEmpty(src)) return ''
  const imgMarkdown = joinNotEmpty(['![', alt, '](', src, ')'], '')
  return notEmpty(url) ? `[${imgMarkdown}](${url})` : imgMarkdown
}

const ingredientGroupsToMarkdown = (
  ingredientGroups: IngredientGroup[],
  servings?: number
): string => {
  if (isEmptyArray(ingredientGroups)) return ''
  const title = joinNotEmpty(
    ['## Ingredients', notEmpty(servings) ? `(${servingsToMarkdown(servings)})` : null],
    ' '
  )
  return joinNotEmpty(
    [title, joinNotEmpty(ingredientGroups.map(ingredientGroupToMarkdown), '\n\n')],
    '\n\n'
  )
}

const ingredientGroupToMarkdown = (ingredientGroup: IngredientGroup): string => {
  const { name, ingredients } = ingredientGroup
  if (isEmptyArray(ingredients)) return ''
  return joinNotEmpty(
    [
      notEmpty(name) ? `### ${name}` : null,
      joinNotEmpty(ingredients.map(ingredientToMarkdown), '\n')
    ],
    '\n\n'
  )
}

const ingredientToMarkdown = (ingredient: Ingredient): string => {
  if (isEmpty(ingredient)) return ''
  const { quantity, unit, name, media } = ingredient
  return joinNotEmpty(['-', quantity, unit, name, mediaToMarkdown(media)], ' ')
}

const servingsToMarkdown = (servings: number): string => {
  if (isEmpty(servings)) return ''
  return `${servings} person${servings > 1 ? 's' : ''}`
}

const ustensilsToMarkdown = (ustensils: Ustensil[]): string => {
  if (isEmptyArray(ustensils)) return ''
  return joinNotEmpty(
    ['## Ustensils', joinNotEmpty(ustensils.map(ustensilToMarkdown), '\n')],
    '\n\n'
  )
}

const ustensilToMarkdown = (ustensil: Ustensil): string => {
  const { media, quantity, label } = ustensil
  return joinNotEmpty(['-', mediaToMarkdown(media), quantity, label], ' ')
}

const directionGroupsToMarkdown = (directionGroups: DirectionGroup[]): string => {
  if (isEmptyArray(directionGroups)) return ''
  return joinNotEmpty(
    ['## Directions', joinNotEmpty(directionGroups.map(directionGroupToMarkdown), '\n\n')],
    '\n\n'
  )
}

const directionGroupToMarkdown = (directionGroup: DirectionGroup): string => {
  const { name, directions } = directionGroup
  if (isEmptyArray(directions)) return ''
  return joinNotEmpty([name, joinNotEmpty(directions.map(directionToMarkdown), '\n\n')], '\n')
}

const directionToMarkdown = (direction: Direction): string => {
  const { step, content } = direction
  return joinNotEmpty([notEmpty(step) ? `### ${step}` : null, contentToMarkdown(content)], '\n\n')
}
