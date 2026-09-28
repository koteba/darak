import { Link } from 'react-router-dom'
import { BedDouble, Bath, Ruler } from 'lucide-react'
import type { Property } from '../types/property'
import { formatPrice } from '../utils/formatPrice'
import FavoriteButton from './FavoriteButton'
export const FALLBACK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%230F172A"/></svg>'
export default function PropertyCard({ p }: { p: Property }) {
  return (<Link to={`/property/${p.id}`} className="group block overflow-hidden rounded-xl bg-white dark:bg-slate-800">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={p.images[0]} alt={p.title} loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK }} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      <span className={`absolute end-3 top-3 rounded px-3 py-1 text-sm font-bold text-white ${p.purpose === 'sale' ? 'bg-royal' : 'bg-green-600'}`}>{p.purpose === 'sale' ? 'للبيع' : 'للإيجار'}</span>
      {p.featured && <span className="absolute end-3 top-12 rounded bg-gold px-3 py-1 text-sm font-bold text-navy">مميز</span>}
      <div className="absolute start-3 top-3"><FavoriteButton id={p.id} /></div>
      <p className="absolute bottom-3 end-4 font-display text-xl font-black text-white">{formatPrice(p)}</p>
    </div>
    <div className="p-4"><h3 className="font-bold">{p.title}</h3>
      <p className="text-sm">{p.city} · {p.neighborhood}</p>
      <div className="mt-3 flex gap-4 text-sm"><span className="flex items-center gap-1"><BedDouble size={16} />{p.bedrooms}</span><span className="flex items-center gap-1"><Bath size={16} />{p.bathrooms}</span><span className="flex items-center gap-1"><Ruler size={16} />{p.area} م²</span></div>
      <p className="mt-2 text-xs">{p.agent.name}</p></div></Link>)
}
