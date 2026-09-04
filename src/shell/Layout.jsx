import React from 'react'

export function Contenedor({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 ${className}`}>{children}</div>
}

export function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ladrillo-500">{eyebrow}</p>}
        <h1 className="font-display text-2xl uppercase tracking-wide text-tinta-800 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-xl text-sm text-tinta-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function SectionHeader({ title, subtitle, action, id, className = '' }) {
  return (
    <div id={id} className={`mb-4 flex scroll-mt-52 items-end justify-between gap-3 ${className}`}>
      <div>
        <h2 className="font-display text-lg uppercase tracking-wide text-tinta-800 sm:text-xl">{title}</h2>
        {subtitle && <p className="text-sm text-tinta-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
