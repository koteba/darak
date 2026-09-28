import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
export default function FavoritesPage() {
  const { ids, clear } = useFavorites(); const { all } = useProperties(); const list = all.filter((p) => ids.includes(p.id))
  return (<div className="mx-auto max-w-6xl px-4 py-10"><div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-black">العقارات المحفوظة</h1>
    {list.length > 0 && <button className="font-bold text-red-600" onClick={() => confirm('حذف كل العقارات المحفوظة؟') && clear()}>حذف الكل</button>}</div>
    {list.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      : <div className="py-20 text-center"><p>لم تحفظ أي عقار بعد.</p><Link to="/properties" className="btn mt-4 bg-royal text-white">استكشف العقارات</Link></div>}</div>)
}
