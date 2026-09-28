import { Link, NavLink } from 'react-router-dom'
import { Building2, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
const links = [['/', 'الرئيسية'], ['/properties', 'العقارات'], ['/favorites', 'المفضلة']]
export default function Navbar() {
  const { dark, toggle } = useTheme()
  return (<header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-navy/90">
    <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
      <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black text-navy dark:text-white"><Building2 className="text-gold" />دارك</Link>
      <nav className="flex flex-1 gap-4 overflow-x-auto text-sm font-bold">{links.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `whitespace-nowrap py-2 ${isActive ? 'text-royal' : ''}`}>{l}</NavLink>)}</nav>
      <button aria-label="تبديل الوضع الداكن" onClick={toggle} className="flex h-11 w-11 items-center justify-center rounded-full">{dark ? <Sun /> : <Moon />}</button>
    </div></header>)
}
