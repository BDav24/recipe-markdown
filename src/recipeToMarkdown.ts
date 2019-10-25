import {
  Direction,
  Ingredient,
  Media,
  Place,
  Recipe,
  RecipeMetaType,
  Text,
  Ustensil
} from './types'
import { joinNotEmpty } from './utils'

export default function recipeToMarkdown(recipe: Recipe): string {
  const { title, description, ingredients, ustensils, servings, directions, media, meta } = recipe
  return joinNotEmpty(
    [
      meta && metaToMarkdown(meta),
      title && titleToMarkdown(title),
      description && textToMarkdown(description),
      media && media.length > 0 && mediaToMarkdown(media),
      '---',
      ingredients && ingredients.length > 0 && ingredientsToMarkdown(ingredients, servings),
      '---',
      ustensils && ustensils.length > 0 && ustensilsToMarkdown(ustensils),
      '---',
      directions && directions.length > 0 && directionsToMarkdown(directions)
    ],
    '\n\n'
  )
}

const metaToMarkdown = (meta: RecipeMetaType): string => {
  const { type, tags, places, prepTime, cookTime, complexity, cost } = meta
  const metaMarkdown = joinNotEmpty(
    [
      type && `type: ${type}`,
      tags && tags.length > 0 && tagsToMarkdown(tags),
      places && places.length > 0 && placesToMarkdown(places),
      prepTime && `prep time: ${prepTime}`,
      cookTime && `cook time: ${cookTime}`,
      complexity && `complexity: ${complexity}`,
      cost && `cost: ${cost}`
    ],
    '\n'
  )
  return metaMarkdown ? `---\n${metaMarkdown}\n---` : ''
}

const tagsToMarkdown = (tags: string[]): string => {
  return `tags:\n${joinNotEmpty(tags.map(tag => `- ${tag}`), '\n')}`
}

const placesToMarkdown = (places: Place[]): string => {
  return `places:\n${joinNotEmpty(
    places.map(({ type, label }) => `- ${type ? `${type}:` : ''}${label}`),
    '\n'
  )}`
}

const titleToMarkdown = (title: string): string => {
  return `# ${title}`
}

const textToMarkdown = (text: Text): string => {
  // TODO: textToMarkdown
  return ''
}

const mediaToMarkdown = (media: Media[]): string => {
  return joinNotEmpty(
    media.map(({ src, url, alt }) => {
      const imgMarkdown = `![${alt}](${src})`
      return url ? `[${imgMarkdown}](${url})` : imgMarkdown
    }),
    '\n'
  )
}

const ingredientsToMarkdown = (ingredients: Ingredient[], servings?: number): string => {
  // TODO: ingredientsToMarkdown
  return joinNotEmpty(['## Ingredients', servings && `(${servingsToMarkdown(servings)})`], ' ')
}

const servingsToMarkdown = (servings: number): string => {
  return `${servings} person${servings > 1 ? 's' : ''}`
}

const ustensilsToMarkdown = (ustensils: Ustensil[]): string => {
  return joinNotEmpty(
    ['## Ustensils', joinNotEmpty(ustensils.map(ustensilToMarkdown), '\n')],
    '\n\n'
  )
}

const ustensilToMarkdown = (ustensil: Ustensil): string => {
  const { quantity, label, media } = ustensil
  return joinNotEmpty(['-', media && mediaToMarkdown([media]), quantity, label], ' ')
}

const directionsToMarkdown = (directions: Direction[]): string => {
  // TODO: directionsToMarkdown
  return '## Directions'
}
