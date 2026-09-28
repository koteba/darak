import { useLocalStorage } from './useLocalStorage'
export function useFavorites() {
  const [ids, setIds] = useLocalStorage<string[]>('darak:favorites', [])
  return {
    ids, isFavorite: (id: string) => ids.includes(id),
    toggle: (id: string) => setIds((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id])),
    clear: () => setIds([]),
  }
}
