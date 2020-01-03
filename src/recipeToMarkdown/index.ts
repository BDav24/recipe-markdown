import { Content, Media, Recipe } from '../types'
import { joinNotEmpty, isEmpty, isEmptyOrEmptyArray, isNotEmptyArray, isNotEmpty } from '../utils'

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
    media,
    description,
    ingredientGroups,
    servings,
    ustensils,
    directionGroups
  } = recipe
  const firstMedia = findFirstMedia(description)
  if (isNotEmpty(media) && (isEmpty(firstMedia) || firstMedia.src !== media.src)) {
    description.unshift(media)
  }
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

export function findFirstMedia(content: Content): Media {
  if (isEmptyOrEmptyArray(content)) return null
  return content.find(({ type }) => type === 'photo' || type === 'video') as Media
}

const separatorIf = (condition: boolean): string => (condition ? '---' : null)
