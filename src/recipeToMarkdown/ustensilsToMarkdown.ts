import { Ustensil } from '../types'
import { isEmptyOrEmptyArray, joinNotEmpty, isNotEmpty } from '../utils'

import mediaToMarkdown, { getMediaType } from './mediaToMarkdown'

export default function ustensilsToMarkdown(ustensils: Ustensil[]): string {
  if (isEmptyOrEmptyArray(ustensils)) return ''
  return joinNotEmpty(
    ['## Ustensils', joinNotEmpty(ustensils.map(ustensilToMarkdown), '\n')],
    '\n\n'
  )
}

const ustensilToMarkdown = (ustensil: Ustensil): string => {
  const { media, quantity, label } = ustensil
  const isMediaLink = isNotEmpty(media) && getMediaType(media) === 'link'
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
