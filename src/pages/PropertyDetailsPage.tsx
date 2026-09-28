import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TYPE_LABELS } from '../data/property-types'
import { useProperties } from '../hooks/useProperties'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from '../hooks/useToast'
import { formatPrice } from '../utils/formatPrice'
import type { ViewingRequest } from '../types/property'
import PropertyCard, { FALLBACK } from '../components/PropertyCard'
import FavoriteButton from '../components/FavoriteButton'
import NotFoundPage from './NotFoundPage'
export default function PropertyDetailsPage() {
  const { id } = useParams(); const { all } = useProperties(); const toast = useToast()
  const [img, setImg] = useState(0); const [open, setOpen] = useState(false); const [reqs, setReqs] = useLocalStorage<ViewingRequest[]>('darak:viewings', [])
  const p = all.find((x) => x.id === id); if (!p) return <NotFoundPage />
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (!d.name.trim() || !/^[0-9+\s]{8,}$/.test(d.phone)) return toast('تحقق من الاسم ورقم الهاتف', 'error')
    setReqs([...reqs, { propertyId: p.id, name: d.name, phone: d.phone, date: d.date, time: d.time, message: d.message }]); setOpen(false); toast('تم إرسال طلب المعاينة')
  }
  const info: [string, string | number][] = [['النوع', TYPE_LABELS[p.propertyType]], ['المساحة', `${p.area} م²`], ['غرف النوم', p.bedrooms], ['الحمامات', p.bathrooms], ['الطابق', p.floor], ['عمر البناء', `${p.buildingAge} سنة`], ['مفروش', p.furnished ? 'نعم' : 'لا']]
  return (<div className="mx-auto max-w-6xl px-4 py-8">
    <p className="mb-4 text-sm"><Link to="/">الرئيسية</Link> / <Link to="/properties">العقارات</Link> / {p.title}</p>
    <div className="grid gap-8 lg:grid-cols-3"><div className="lg:col-span-2">
      <img src={p.images[img]} alt={p.title} onError={(e) => { e.currentTarget.src = FALLBACK }} className="aspect-[16/10] w-full rounded-xl object-cover" />
      <div className="mt-3 flex gap-2">{p.images.map((s, i) => <button key={s} aria-label={`صورة ${i + 1}`} onClick={() => setImg(i)} className={`h-16 w-24 overflow-hidden rounded ${i === img ? 'ring-2 ring-royal' : ''}`}><img src={s} alt="" loading="lazy" className="h-full w-full object-cover" /></button>)}</div>
      <h1 className="mt-6 text-3xl font-black">{p.title}</h1><p>{p.city} · {p.neighborhood} · D-{1000 + Number(p.id)}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{info.map(([k, v]) => <div key={k} className="rounded-lg bg-white p-3 dark:bg-slate-800"><p className="text-xs">{k}</p><p className="font-bold text-navy dark:text-white">{v}</p></div>)}</div>
      <p className="mt-6 leading-8">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">{p.amenities.map((a) => <li key={a} className="rounded-full bg-sky/20 px-3 py-1 text-sm">{a}</li>)}</ul></div>
    <aside className="h-fit rounded-xl bg-white p-5 dark:bg-slate-800"><p className="font-display text-3xl font-black text-royal">{formatPrice(p)}</p>
      <p className="mt-4 font-bold">{p.agent.name}</p><p className="text-sm">{p.agent.phone.slice(0, 6)}••• ••</p>
      <button className="btn mt-4 w-full bg-royal text-white" onClick={() => setOpen(true)}>طلب معاينة</button>
      <a className="btn mt-2 w-full bg-green-600 text-white" href={`tel:${p.agent.phone.replace(/\s/g, '')}`}>اتصال بالمعلن</a>
      <div className="mt-2 flex justify-center"><FavoriteButton id={p.id} /></div></aside></div>
    <h2 className="mb-4 mt-12 text-2xl font-black">عقارات مشابهة</h2>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{all.filter((x) => x.id !== p.id && (x.city === p.city || x.propertyType === p.propertyType)).slice(0, 3).map((x) => <PropertyCard key={x.id} p={x} />)}</div>
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6 dark:bg-slate-800"><h3 className="text-xl font-black">طلب معاينة</h3>
        <input name="name" className="field" placeholder="الاسم" /><input name="phone" className="field" placeholder="رقم الهاتف" dir="ltr" />
        <div className="grid grid-cols-2 gap-3"><input name="date" type="date" className="field" /><input name="time" type="time" className="field" /></div>
        <textarea name="message" className="field py-2" rows={3} placeholder="رسالة إضافية" /><button className="btn w-full bg-royal text-white">إرسال الطلب</button></form></div>}
  </div>)
}
