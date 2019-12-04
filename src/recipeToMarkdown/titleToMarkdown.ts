import { isEmpty } from '../utils'

export default function titleToMarkdown(title: string): string {
  if (isEmpty(title)) return ''
  return `# ${title}`
}
