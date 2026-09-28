import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CITIES } from '../data/cities'
import { TYPE_LABELS } from '../data/property-types'
import { useProperties } from '../hooks/useProperties'
import { defaultFilters, filterProperties, type Filters } from '../utils/filterProperties'
import PropertyCard from '../components/PropertyCard'
export default function PropertiesPage() {
  const [sp, setSp] = useSearchParams(); const { all } = useProperties()
  const f: Filters = { ...defaultFilters, ...Object.fromEntries(sp), featured: sp.get('featured') === '1' }
  const set = (k: keyof Filters, v: string) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const list = useMemo(() => filterProperties(all, f), [all, sp]) // eslint-disable-line
  return (<div className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-3xl font-black">اكتشف العقار المناسب لك</h1>
    <div className="my-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <input className="field" placeholder="ابحث بالعنوان أو المنطقة" value={f.q} onChange={(e) => set('q', e.target.value)} />
      <select className="field" aria-label="المدينة" value={f.city} onChange={(e) => set('city', e.target.value)}><option value="">كل المدن</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
      <select className="field" aria-label="العملية" value={f.purpose} onChange={(e) => set('purpose', e.target.value)}><option value="">بيع وإيجار</option><option value="sale">للبيع</option><option value="rent">للإيجار</option></select>
      <select className="field" aria-label="النوع" value={f.type} onChange={(e) => set('type', e.target.value)}><option value="">كل الأنواع</option>{Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
      <input className="field" type="number" placeholder="أقل سعر" value={f.min} onChange={(e) => set('min', e.target.value)} />
      <input className="field" type="number" placeholder="أعلى سعر" value={f.max} onChange={(e) => set('max', e.target.value)} />
      <select className="field" aria-label="غرف النوم" value={f.beds} onChange={(e) => set('beds', e.target.value)}><option value="">غرف النوم</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}</select>
      <select className="field" aria-label="الترتيب" value={f.sort} onChange={(e) => set('sort', e.target.value)}><option value="new">الأحدث</option><option value="low">السعر: الأقل</option><option value="high">السعر: الأعلى</option><option value="area">المساحة</option></select></div>
    <div className="mb-4 flex items-center justify-between"><p>{list.length} نتيجة</p><button className="font-bold text-royal" onClick={() => setSp({})}>إعادة التعيين</button></div>
    {list.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div> : <p className="py-16 text-center">لا توجد نتائج مطابقة. جرّب تخفيف الفلاتر.</p>}</div>)
}
