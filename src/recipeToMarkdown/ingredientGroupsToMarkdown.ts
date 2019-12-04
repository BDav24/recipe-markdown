import { Ingredient, IngredientGroup } from '../types'
import { isEmpty, isEmptyArray, joinNotEmpty, notEmpty } from '../utils'

import mediaToMarkdown from './mediaToMarkdown'

export default function ingredientGroupsToMarkdown(
  ingredientGroups: IngredientGroup[],
  servings?: number
): string {
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
