import { Direction, DirectionGroup } from '../types'
import { isEmptyArray, joinNotEmpty, notEmpty } from '../utils'

import contentToMarkdown from './contentToMarkdown'

export default function directionGroupsToMarkdown(directionGroups: DirectionGroup[]): string {
  if (isEmptyArray(directionGroups)) return ''
  return joinNotEmpty(
    ['## Directions', joinNotEmpty(directionGroups.map(directionGroupToMarkdown), '\n\n')],
    '\n\n'
  )
}

const directionGroupToMarkdown = (directionGroup: DirectionGroup): string => {
  const { name, directions } = directionGroup
  if (isEmptyArray(directions)) return ''
  return joinNotEmpty(
    [
      notEmpty(name) ? `### ${name}\n` : null,
      joinNotEmpty(
        directions.map(direction =>
          directionToMarkdown(direction, { titleLevel: notEmpty(name) ? 4 : 3 })
        ),
        '\n\n'
      )
    ],
    '\n'
  )
}

const directionToMarkdown = (direction: Direction, { titleLevel = 3 } = {}): string => {
  const { step, content } = direction
  return joinNotEmpty(
    [notEmpty(step) ? `${'#'.repeat(titleLevel)} ${step}` : null, contentToMarkdown(content)],
    '\n\n'
  )
}
