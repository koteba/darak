import { useMemo } from 'react'
import { properties } from '../data/properties'
import type { Property } from '../types/property'
import { useLocalStorage } from './useLocalStorage'
export function useProperties() {
  const [mine, setMine] = useLocalStorage<Property[]>('darak:listings', [])
  const all = useMemo(() => [...mine, ...properties], [mine])
  return { all, addListing: (p: Property) => setMine((c) => [p, ...c]) }
}
