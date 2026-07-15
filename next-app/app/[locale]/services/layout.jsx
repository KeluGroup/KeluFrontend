import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/services', 'servicesTitle', 'servicesDesc')

export default function ServicesLayout({ children }) {
  return children
}
