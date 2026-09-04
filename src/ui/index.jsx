import React from 'react'

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition active:scale-[.98] disabled:opacity-40 disabled:pointer-events-none'
  const sizes = { sm: 'px-3.5 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }
  const variants = {
    primary: 'bg-ladrillo-500 text-papel-50 shadow-md shadow-ladrillo-500/30 hover:bg-ladrillo-600',
    dark: 'bg-tinta-800 text-papel-50 hover:bg-tinta-700',
    outline: 'border border-tinta-200 text-tinta-700 hover:border-ladrillo-400 hover:text-ladrillo-600 bg-white',
    ghost: 'text-tinta-600 hover:bg-papel-200',
    success: 'bg-olivo-500 text-white hover:bg-olivo-600',
    danger: 'bg-ladrillo-700 text-white hover:bg-ladrillo-800',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'tinta', className = '' }) {
  const tones = {
    tinta: 'bg-tinta-100 text-tinta-700',
    ladrillo: 'bg-ladrillo-100 text-ladrillo-700',
    olivo: 'bg-olivo-100 text-olivo-700',
    dorado: 'bg-dorado-100 text-dorado-600',
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>
}

export function Cinta({ children, className = '' }) {
  return (
    <div className={`banda-textura rounded-2xl bg-tinta-800 px-5 py-4 text-papel-50 ${className}`}>
      {children}
    </div>
  )
}

export function Tarjeta({ children, className = '', hover = true }) {
  return (
    <div className={`rounded-2xl border border-papel-300/70 bg-white shadow-sm ${hover ? 'transition hover:border-dorado-300 hover:shadow-md' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function Chip({ children, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? 'border-ladrillo-500 bg-ladrillo-500 text-white' : 'border-tinta-200 bg-white text-tinta-600 hover:border-ladrillo-300'} ${className}`}
    >
      {children}
    </button>
  )
}

export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-tinta-900/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="animate-pop max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl uppercase tracking-wide text-tinta-800">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-tinta-400 hover:bg-papel-200">✕</button>
        </div>
        {children}
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </div>
  )
}

export function Sheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-tinta-900/50" onClick={onClose}>
      <div className="animate-fade-up flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl uppercase tracking-wide text-tinta-800">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-tinta-400 hover:bg-papel-200">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-olivo-500' : 'bg-tinta-200'}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      >
        <span className={`h-2 w-2 rounded-full transition-colors ${checked ? 'bg-olivo-500' : 'bg-tinta-300'}`} />
      </span>
    </button>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-tinta-600">{label}</span>
      {children}
    </label>
  )
}

export function Input(props) {
  return <input {...props} className={`w-full rounded-xl border border-tinta-200 px-3.5 py-2.5 text-sm outline-none focus:border-ladrillo-400 ${props.className || ''}`} />
}

export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-tinta-200 py-14 text-center">
      {icon}
      <p className="font-display uppercase tracking-wide text-tinta-700">{title}</p>
      {subtitle && <p className="max-w-xs text-sm text-tinta-400">{subtitle}</p>}
      {action}
    </div>
  )
}
