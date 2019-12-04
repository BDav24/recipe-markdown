import {
  Content,
  Direction,
  DirectionGroup,
  Ingredient,
  IngredientGroup,
  Recipe,
  Ustensil
} from '../types'
import { captureGroup, isEmpty, isNotEmpty, isNotEmptyArray } from '../utils'

import {
  flattenElements,
  flattenTitles,
  GroupedMarkdown,
  groupMarkdownByLevel,
  isNotEmptyGroup
} from './groupedMarkdown'
import markdownToContent from './markdownToContent'
import markdownToIngredient from './markdownToIngredient'
import markdownToMeta, { extractMetaMarkdown } from './markdownToMeta'
import markdownToUstensil from './markdownToUstensil'

export default function markdownToRecipe(markdown: string): Recipe {
  const [metaMarkdown, markdownWithoutMeta] = extractMetaMarkdown(markdown)
  const meta = markdownToMeta(metaMarkdown)

  const groupedMarkdown = groupMarkdownByLevel(markdownWithoutMeta.split('\n'))
  const { title, directionGroups, ...rest } = groupedMarkdownToRecipe(groupedMarkdown)

  return {
    ...(isNotEmpty(meta) && Object.keys(meta).length > 0 ? { meta } : null),
    title,
    directionGroups,
    ...rest
  }
}

function groupedMarkdownToRecipe(
  groupedMarkdown: Array<GroupedMarkdown | string>
): Partial<Recipe> {
  return groupedMarkdown.reduce((recipe, group) => {
    if (typeof group === 'string') return recipe
    const { level, title, elements } = group
    const info: Partial<Recipe> = {}
    if (level === 1) {
      info.title = title
    } else if (level === 2 && isEmpty(title) && isNotEmptyGroup(group)) {
      info.description = groupedMarkdownToContent(elements)
    } else if (isNotEmpty(title)) {
      if (title.startsWith('Ingredient')) {
        info.ingredientGroups = groupedMarkdownToIngredientGroups(elements)
        const servings = markdownToServing(title)
        if (servings > 0) info.servings = servings
      } else if (title.startsWith('Ustensil')) {
        info.ustensils = groupedMarkdownToUstensils(elements)
      } else if (title.startsWith('Direction')) {
        info.directionGroups = groupedMarkdownToDirectionGroups(elements)
      }
    }
    return {
      ...recipe,
      ...info,
      ...(isNotEmptyArray(elements) ? groupedMarkdownToRecipe(elements) : null)
    }
  }, {})
}

function markdownToServing(markdown: string): number {
  const [servings] = captureGroup(markdown, /\(([\d.,]+).*\)/)
  return isNotEmpty(servings) ? parseFloat(servings) : null
}

function groupedMarkdownToContent(groupedMarkdown: Array<GroupedMarkdown | string>): Content {
  return flattenElements(groupedMarkdown).map(markdownToContent)
}

function groupedMarkdownToIngredientGroups(
  groupedMarkdown: Array<GroupedMarkdown | string>
): IngredientGroup[] {
  return groupedMarkdown.filter(isNotEmptyGroup).map(groupGroupedMarkdown => {
    if (typeof groupGroupedMarkdown === 'string') return null
    const { title, elements } = groupGroupedMarkdown
    return {
      ...(isNotEmpty(title) ? { name: title } : null),
      ingredients: groupedMarkdownToIngredients(elements.filter(isNotEmptyGroup))
    }
  })
}

const isNotSeparator = (value: string): boolean => !/^-+$/.test(value)

function groupedMarkdownToIngredients(groupedMarkdown): Ingredient[] {
  return flattenElements(groupedMarkdown)
    .filter(isNotEmpty)
    .filter(isNotSeparator)
    .map(value => value.replace(/^\s*- ?/, ''))
    .map(markdownToIngredient)
}

function groupedMarkdownToUstensils(groupedMarkdown: Array<GroupedMarkdown | string>): Ustensil[] {
  return flattenElements(groupedMarkdown)
    .filter(isNotEmpty)
    .filter(isNotSeparator)
    .map(value => value.replace(/^\s*- ?/, ''))
    .map(markdownToUstensil)
}

function groupedMarkdownToDirectionGroups(
  groupedMarkdown: Array<GroupedMarkdown | string>
): DirectionGroup[] {
  const titles = flattenTitles(groupedMarkdown)
  const hasGroups = titles.some(({ level }) => level === 4)
  if (hasGroups) {
    return groupedMarkdown.filter(isNotEmptyGroup).map(groupGroupedMarkdown => {
      if (typeof groupGroupedMarkdown === 'string') return null
      const { title, elements } = groupGroupedMarkdown
      return {
        ...(isNotEmpty(title) ? { name: title } : null),
        directions: elements.filter(isNotEmptyGroup).map(groupedMarkdownToDirection)
      }
    })
  } else {
    return [{ directions: groupedMarkdown.filter(isNotEmptyGroup).map(groupedMarkdownToDirection) }]
  }
}

function groupedMarkdownToDirection(groupedMarkdown: GroupedMarkdown): Direction {
  const { title, elements } = groupedMarkdown
  return {
    ...(isNotEmpty(title) ? { step: title } : null),
    content: groupedMarkdownToContent(elements)
  }
}
