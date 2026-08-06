import { buildPageMetadata } from '../../../utils/pageMetadata'

export const generateMetadata = buildPageMetadata('/recetas', 'recetasTitle', 'recetasDesc')

export default function RecetasLayout({ children }) {
  return children
}
