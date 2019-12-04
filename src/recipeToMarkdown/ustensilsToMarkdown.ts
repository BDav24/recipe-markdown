import { Ustensil } from '../types'
import { isEmptyArray, joinNotEmpty, notEmpty } from '../utils'

import mediaToMarkdown, { getMediaType } from './mediaToMarkdown'

export default function ustensilsToMarkdown(ustensils: Ustensil[]): string {
  if (isEmptyArray(ustensils)) return ''
  return joinNotEmpty(
    ['## Ustensils', joinNotEmpty(ustensils.map(ustensilToMarkdown), '\n')],
    '\n\n'
  )
}

const ustensilToMarkdown = (ustensil: Ustensil): string => {
  const { media, quantity, label } = ustensil
  const isMediaLink = notEmpty(media) && getMediaType(media) === 'link'
  return joinNotEmpty(
    [
      '-',
      isMediaLink ? null : mediaToMarkdown(media),
      quantity,
      label,
      isMediaLink ? mediaToMarkdown(media) : null
    ],
    ' '
  )
}
