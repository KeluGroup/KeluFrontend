import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/products', 'productsTitle', 'productsDesc')

export default function ProductsLayout({ children }) {
  return children
}
