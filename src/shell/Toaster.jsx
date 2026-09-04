import React, { useEffect } from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { CheckCircle2 } from 'lucide-react'

export function Toaster() {
  const { state, clearToast } = useDemo()
  const toast = state.ui.toast

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => clearToast(), 2600)
    return () => clearTimeout(t)
  }, [toast])

  if (!toast) return null

  return (
    <div className="fixed inset-x-0 top-[100px] z-[70] flex justify-center px-4">
      <div className="animate-toast-in flex items-center gap-2 rounded-full bg-tinta-800 px-4 py-2.5 text-sm font-medium text-white shadow-xl">
        <CheckCircle2 size={16} className="text-olivo-300" />
        {toast}
      </div>
    </div>
  )
}
