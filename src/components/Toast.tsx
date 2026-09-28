import { createContext, useState, type ReactNode } from 'react'
type Kind = 'success' | 'error' | 'info'
export const ToastCtx = createContext<(msg: string, kind?: Kind) => void>(() => {})
export function ToastProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<{ msg: string; kind: Kind } | null>(null)
  const show = (msg: string, kind: Kind = 'success') => { setT({ msg, kind }); setTimeout(() => setT(null), 3500) }
  const bg = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-royal' }
  return (<ToastCtx.Provider value={show}>{children}
    {t && <div role="status" className={`fixed bottom-6 start-1/2 z-50 -translate-x-1/2 rounded-lg px-5 py-3 font-bold text-white shadow-lg ${bg[t.kind]}`}>{t.msg}</div>}
  </ToastCtx.Provider>)
}
