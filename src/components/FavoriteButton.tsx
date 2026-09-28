import { Heart } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
export default function FavoriteButton({ id }: { id: string }) {
  const { isFavorite, toggle } = useFavorites(); const on = isFavorite(id)
  return (<button aria-label={on ? 'إزالة من المفضلة' : 'إضافة للمفضلة'} onClick={(e) => { e.preventDefault(); toggle(id) }}
    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 transition hover:scale-110">
    <Heart size={20} className={on ? 'fill-red-600 text-red-600' : 'text-navy'} /></button>)
}
