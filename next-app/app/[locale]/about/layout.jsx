import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/about', 'aboutTitle', 'aboutDesc')

export default function AboutLayout({ children }) {
  return children
}
