import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/contact', 'contactTitle', 'contactDesc')

export default function ContactLayout({ children }) {
  return children
}
