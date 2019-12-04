import { Recipe } from '../types'
import { joinNotEmpty, nonEmptyArray, notEmpty } from '../utils'

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
