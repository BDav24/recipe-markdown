import { Direction, DirectionGroup } from '../types'
import { isEmptyOrEmptyArray, joinNotEmpty, isNotEmpty } from '../utils'

import contentToMarkdown from './contentToMarkdown'

export default function directionGroupsToMarkdown(directionGroups: DirectionGroup[]): string {
  if (isEmptyOrEmptyArray(directionGroups)) return ''
  return joinNotEmpty(
    ['## Directions', joinNotEmpty(directionGroups.map(directionGroupToMarkdown), '\n\n')],
    '\n\n'
  )
}

const directionGroupToMarkdown = (directionGroup: DirectionGroup): string => {
  const { name, directions } = directionGroup
  if (isEmptyOrEmptyArray(directions)) return ''
  return joinNotEmpty(
    [
      isNotEmpty(name) ? `### ${name}\n` : null,
      joinNotEmpty(
        directions.map(direction =>
          directionToMarkdown(direction, { titleLevel: isNotEmpty(name) ? 4 : 3 })
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
    [isNotEmpty(step) ? `${'#'.repeat(titleLevel)} ${step}` : null, contentToMarkdown(content)],
    '\n\n'
  )
}
