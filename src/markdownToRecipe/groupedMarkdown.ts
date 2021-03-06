import { isNotEmpty, isNotEmptyArray } from '../utils'

export interface GroupedMarkdown {
  level: number
  title?: string
  elements?: Array<GroupedMarkdown | string>
}

export function groupMarkdownByLevel(
  splitMarkdown: string[],
  level: number = 1
): GroupedMarkdown[] {
  return level <= 5
    ? splitMarkdown
        .reduce((groups, line) => {
          const isTitle = line.startsWith(`${'#'.repeat(level)} `)
          if (isTitle) {
            groups.push({ title: line.replace(/^#* ?/, ''), level, elements: [] })
          } else if (groups.length === 0) {
            groups.push({ level, elements: [line] })
          } else {
            groups[groups.length - 1].elements.push(line)
          }
          return groups
        }, [])
        .map(({ elements, ...rest }) => ({
          ...rest,
          elements: groupMarkdownByLevel(elements, level + 1)
        }))
    : splitMarkdown
}

export function isNotEmptyGroup(group: GroupedMarkdown): boolean {
  return flattenElements(group.elements).join('') !== ''
}

export function flattenElements(elements: Array<GroupedMarkdown | string>): string[] {
  return elements.reduce((acc, element, index) => {
    if (element === '' && (index === 0 || index === elements.length - 1)) return acc
    return [
      ...acc,
      ...(typeof element === 'string'
        ? [element]
        : isNotEmptyArray(element.elements)
        ? flattenElements(element.elements)
        : [])
    ]
  }, [])
}

export function flattenTitles(
  elements: Array<GroupedMarkdown | string>
): Array<{ level: number; title: string }> {
  return elements.reduce((acc, element) => {
    if (typeof element === 'string') return acc
    const { title, level, elements } = element
    return [
      ...acc,
      ...(isNotEmpty(title) ? [{ level, title }] : []),
      ...(isNotEmptyArray(elements) ? flattenTitles(elements) : [])
    ]
  }, [])
}
