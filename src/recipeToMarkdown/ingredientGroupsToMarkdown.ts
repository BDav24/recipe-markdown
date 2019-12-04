import { Ingredient, IngredientGroup } from '../types'
import { isEmpty, isEmptyOrEmptyArray, joinNotEmpty, isNotEmpty } from '../utils'

import mediaToMarkdown from './mediaToMarkdown'

export default function ingredientGroupsToMarkdown(
  ingredientGroups: IngredientGroup[],
  servings?: number
): string {
  if (isEmptyOrEmptyArray(ingredientGroups)) return ''
  const title = joinNotEmpty(
    ['## Ingredients', isNotEmpty(servings) ? `(${servingsToMarkdown(servings)})` : null],
    ' '
  )
  return joinNotEmpty(
    [title, joinNotEmpty(ingredientGroups.map(ingredientGroupToMarkdown), '\n\n')],
    '\n\n'
  )
}

const ingredientGroupToMarkdown = (ingredientGroup: IngredientGroup): string => {
  const { name, ingredients } = ingredientGroup
  if (isEmptyOrEmptyArray(ingredients)) return ''
  return joinNotEmpty(
    [
      isNotEmpty(name) ? `### ${name}` : null,
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
