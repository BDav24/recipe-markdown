import { Media, MediaType } from '../types'

export function extractMediaMarkdown(markdown: string): [string, string] {
  const [mediaMarkdown] = markdown.match(/!?\[[^]*\]\([^)]+\)/) || []
  return [mediaMarkdown, markdown.replace(mediaMarkdown, '').trim()]
}

function getMediaType(markdown: string): MediaType {
  return markdown.startsWith('!') ? 'photo' : markdown.includes('!') ? 'video' : 'link'
}

export default function markdownToMedia(markdown: string): Media {
  const type = getMediaType(markdown)
  const [, alt, url] = markdown.match(/\[(.*)\]\((.+)\)/) || []
  if (type === 'link') {
    return { type, url, alt }
  } else if (type === 'photo') {
    return { type, src: url, alt }
  } else if (type === 'video') {
    const { src, alt: imgAlt } = markdownToMedia(alt)
    return { type, url, src, alt: imgAlt }
  }
}
