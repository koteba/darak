import type { Property } from '../types/property'
export const formatPrice = (p: Property) =>
  `${p.price.toLocaleString('ar-EG')} ${p.currency === 'USD' ? '$' : 'ل.س'}${p.purpose === 'rent' ? ' / شهرياً' : ''}`
