import type { Property } from '../types/property'
export interface Filters { q: string; city: string; purpose: string; type: string; min: string; max: string; beds: string; featured: boolean; sort: string }
export const defaultFilters: Filters = { q: '', city: '', purpose: '', type: '', min: '', max: '', beds: '', featured: false, sort: 'new' }
export function filterProperties(list: Property[], f: Filters): Property[] {
  const q = f.q.trim()
  const out = list.filter((p) =>
    (!q || p.title.includes(q) || p.neighborhood.includes(q)) && (!f.city || p.city === f.city) &&
    (!f.purpose || p.purpose === f.purpose) && (!f.type || p.propertyType === f.type) &&
    (!f.min || p.price >= +f.min) && (!f.max || p.price <= +f.max) &&
    (!f.beds || p.bedrooms >= +f.beds) && (!f.featured || p.featured))
  const s: Record<string, (a: Property, b: Property) => number> = {
    new: (a, b) => b.createdAt.localeCompare(a.createdAt), low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price, area: (a, b) => b.area - a.area }
  return out.sort(s[f.sort] ?? s.new)
}
