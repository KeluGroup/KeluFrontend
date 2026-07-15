import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/faq', 'faqTitle', 'faqDesc')

export default function FaqLayout({ children }) {
  return children
}
