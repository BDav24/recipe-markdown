import {
  Content,
  Direction,
  DirectionGroup,
  Ingredient,
  IngredientGroup,
  Recipe,
  Ustensil
} from '../types'

import { notEmpty } from '../utils'
import {
  flattenElements,
  flattenTitles,
  GroupedMarkdown,
  groupMarkdownByLevel,
  notEmptyGroup
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
    ...(meta && Object.keys(meta).length > 0 ? { meta } : null),
    title,
    directionGroups,
    ...rest
  }
}

function groupedMarkdownToRecipe(groupedMarkdown: (GroupedMarkdown | string)[]): Partial<Recipe> {
  return groupedMarkdown.reduce((recipe, group) => {
    if (typeof group === 'string') return recipe
    const { level, title, elements } = group
    const info: Partial<Recipe> = {}
    if (level === 1) {
      info.title = title
    } else if (level === 2 && !title && notEmptyGroup(group)) {
      info.description = groupedMarkdownToContent(elements)
    } else if (title) {
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
    return { ...recipe, ...info, ...(elements ? groupedMarkdownToRecipe(elements) : null) }
  }, {})
}

function markdownToServing(markdown: string): number {
  const [, servings] = markdown.match(/\(([\d.,]+).*\)/) || []
  return servings ? parseFloat(servings) : null
}

function groupedMarkdownToContent(groupedMarkdown: (GroupedMarkdown | string)[]): Content {
  return flattenElements(groupedMarkdown).map(markdownToContent)
}

function groupedMarkdownToIngredientGroups(
  groupedMarkdown: (GroupedMarkdown | string)[]
): IngredientGroup[] {
  return groupedMarkdown.filter(notEmptyGroup).map(groupGroupedMarkdown => {
    if (typeof groupGroupedMarkdown === 'string') return null
    const { title, elements } = groupGroupedMarkdown
    return {
      ...(title ? { name: title } : null),
      ingredients: groupedMarkdownToIngredients(elements.filter(notEmptyGroup))
    }
  })
}

function groupedMarkdownToIngredients(groupedMarkdown): Ingredient[] {
  return flattenElements(groupedMarkdown)
    .filter(value => !/^-+$/.test(value))
    .filter(v => v)
    .map(value => value.replace(/^\s*- ?/, ''))
    .map(markdownToIngredient)
}

function groupedMarkdownToUstensils(groupedMarkdown: (GroupedMarkdown | string)[]): Ustensil[] {
  const notSeparator = value => !/^-+$/.test(value)
  return flattenElements(groupedMarkdown)
    .filter(notEmpty)
    .filter(notSeparator)
    .map(value => value.replace(/^\s*- ?/, ''))
    .map(markdownToUstensil)
}

function groupedMarkdownToDirectionGroups(
  groupedMarkdown: (GroupedMarkdown | string)[]
): DirectionGroup[] {
  const titles = flattenTitles(groupedMarkdown)
  const hasGroups = titles.some(({ level }) => level === 4)
  if (hasGroups) {
    return groupedMarkdown.filter(notEmptyGroup).map(groupGroupedMarkdown => {
      if (typeof groupGroupedMarkdown === 'string') return null
      const { title, elements } = groupGroupedMarkdown
      return {
        ...(title ? { name: title } : null),
        directions: elements.filter(notEmptyGroup).map(groupedMarkdownToDirection)
      }
    })
  } else {
    return [{ directions: groupedMarkdown.filter(notEmptyGroup).map(groupedMarkdownToDirection) }]
  }
}

function groupedMarkdownToDirection(groupedMarkdown: GroupedMarkdown): Direction {
  const { title, elements } = groupedMarkdown
  return {
    ...(title ? { step: title } : null),
    content: groupedMarkdownToContent(elements)
  }
}
