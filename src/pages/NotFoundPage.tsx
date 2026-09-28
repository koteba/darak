import { Link } from 'react-router-dom'
import { MapPinOff } from 'lucide-react'
export default function NotFoundPage() {
  return (<div className="py-24 text-center"><MapPinOff className="mx-auto text-gold" size={56} /><h1 className="mt-4 text-3xl font-black">يبدو أن هذه الصفحة خارج حدود الخريطة.</h1><Link to="/" className="btn mt-6 bg-royal text-white">العودة للرئيسية</Link></div>)
}
