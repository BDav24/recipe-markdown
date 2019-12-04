import { Media, MediaType } from '../types'
import { isEmpty, joinNotEmpty, notEmpty } from '../utils'

export default function mediaToMarkdown(media: Media): string {
  if (isEmpty(media)) return ''
  const { src, url, alt } = media
  const mediaType = getMediaType(media)
  if (mediaType === undefined) {
    return ''
  } else if (mediaType === 'link') {
    return joinNotEmpty(['[', alt, '](', url, ')'], '')
  } else {
    const imgMarkdown = joinNotEmpty(['![', alt, '](', src, ')'], '')
    return mediaType === 'video' ? `[${imgMarkdown}](${url})` : imgMarkdown
  }
}

export function getMediaType(media: Media): MediaType {
  const { src, url, alt } = media
  if (notEmpty(url) && isEmpty(src)) return 'link'
  if (isEmpty(url) && notEmpty(src)) return 'photo'
  if (notEmpty(url) && notEmpty(src)) return 'video'
}
