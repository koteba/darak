import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CITIES } from '../data/cities'
import { TYPE_LABELS } from '../data/property-types'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
export default function HomePage() {
  const nav = useNavigate(); const { all } = useProperties()
  const [s, setS] = useState({ city: '', purpose: 'sale', type: '' })
  const go = (o: Record<string, string>) => nav('/properties?' + new URLSearchParams(Object.entries(o).filter(([, v]) => v)))
  return (<>
    <section className="relative flex min-h-[70vh] items-center bg-navy bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(15,23,42,.65),rgba(15,23,42,.85)),url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=70')" }}>
      <div className="mx-auto w-full max-w-6xl px-4"><h1 className="font-display text-4xl font-black !text-white md:text-6xl">بيتُك القادم يبدأ من هنا</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-200">اكتشف عقارات للبيع والإيجار في أفضل المناطق، بخطوات بسيطة وواضحة.</p>
        <div className="mt-8 grid gap-3 rounded-xl bg-white p-4 md:grid-cols-4 dark:bg-slate-800">
          <select className="field" aria-label="المدينة" value={s.city} onChange={(e) => setS({ ...s, city: e.target.value })}><option value="">كل المدن</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
          <select className="field" aria-label="نوع العملية" value={s.purpose} onChange={(e) => setS({ ...s, purpose: e.target.value })}><option value="sale">للبيع</option><option value="rent">للإيجار</option></select>
          <select className="field" aria-label="نوع العقار" value={s.type} onChange={(e) => setS({ ...s, type: e.target.value })}><option value="">كل الأنواع</option>{Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          <button className="btn bg-gold text-navy" onClick={() => go(s)}>ابحث الآن</button></div></div></section>
    <section className="mx-auto max-w-6xl px-4 pt-14"><div className="mb-6 flex items-end justify-between"><h2 className="text-2xl font-black">عقارات مميزة</h2><Link to="/properties" className="font-bold text-royal">عرض كل العقارات</Link></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{all.filter((p) => p.featured).slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} />)}</div></section>
    <section className="mx-auto max-w-6xl px-4 pt-14"><h2 className="mb-6 text-2xl font-black">مدن شائعة</h2>
      <div className="flex flex-wrap gap-3">{CITIES.map((c) => <button key={c} onClick={() => go({ city: c })} className="btn border border-slate-300 bg-white text-navy dark:bg-slate-800 dark:text-white">{c}</button>)}</div></section>
    <section className="mx-auto mt-14 max-w-6xl rounded-xl bg-navy px-6 py-10 text-center"><h2 className="text-2xl font-black !text-white">هل لديك عقار تريد عرضه؟</h2><p className="mt-2 text-slate-300">أضف إعلانك قريباً.</p></section>
  </>)
}
