import { RecipeMetaType } from '../types'
import { captureGroup, isEmpty, isNotEmpty } from '../utils'

export function extractMetaMarkdown(markdown: string): [string, string] {
  const [metaMarkdown] = captureGroup(markdown, /^[^#]*---([^#]*)---/s)
  return [metaMarkdown, markdown.replace(metaMarkdown, '').trim()]
}

export default function markdownToMeta(metaMarkdown: string): RecipeMetaType {
  if (isEmpty(metaMarkdown)) return null
  return metaMarkdown
    .replace(/---/g, '')
    .split('\n')
    .filter(isNotEmpty)
    .reduce((acc, line) => {
      const [last, ...rest] = acc
      return /^\s*-/.test(line)
        ? [[...last, line.replace(/^\s*-\s*/, '')], ...rest]
        : [[line], ...acc]
    }, [])
    .reverse()
    .map(line => {
      const [first, ...rest] = line
      const [key, ...value] = first.split(/[:,]\s?/)
      return { [key.toLowerCase()]: value.concat(rest).filter(isNotEmpty) }
    })
    .reduce((acc, meta): RecipeMetaType => {
      const [key] = Object.keys(meta)
      if (key.startsWith('type')) {
        return { ...acc, type: meta[key][0] }
      } else if (key.startsWith('prep')) {
        return { ...acc, prepTime: meta[key][0] }
      } else if (key.startsWith('cook')) {
        return { ...acc, cookTime: meta[key][0] }
      } else if (key.startsWith('complexity')) {
        return { ...acc, complexity: meta[key][0] }
      } else if (key.startsWith('cost')) {
        return { ...acc, cost: meta[key][0] }
      } else if (key.startsWith('tag')) {
        return { ...acc, tags: meta[key] }
      } else if (key.startsWith('place')) {
        return {
          ...acc,
          places: meta[key].map(place => {
            const [key, value] = place.split(/[:,]\s?/)
            return isNotEmpty(value) ? { type: key, label: value } : { label: key }
          })
        }
      } else {
        return { ...acc }
      }
    }, {})
}
