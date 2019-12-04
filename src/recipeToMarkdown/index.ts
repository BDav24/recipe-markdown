import { Recipe } from '../types'
import { joinNotEmpty, isNotEmptyArray, isNotEmpty } from '../utils'

import contentToMarkdown from './contentToMarkdown'
import directionGroupsToMarkdown from './directionGroupsToMarkdown'
import ingredientGroupsToMarkdown from './ingredientGroupsToMarkdown'
import metaToMarkdown from './metaToMarkdown'
import titleToMarkdown from './titleToMarkdown'
import ustensilsToMarkdown from './ustensilsToMarkdown'

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
      separatorIf(isNotEmptyArray(description)),
      ingredientGroupsToMarkdown(ingredientGroups, servings),
      separatorIf(isNotEmptyArray(ingredientGroups)),
      ustensilsToMarkdown(ustensils),
      separatorIf(isNotEmptyArray(ustensils)),
      directionGroupsToMarkdown(directionGroups)
    ],
    '\n\n'
  )
  return isNotEmpty(recipeMarkdown) ? `\n${recipeMarkdown}\n` : ''
}

const separatorIf = (condition: boolean): string => (condition ? '---' : null)
