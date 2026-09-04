import React from 'react'
import { Camera, Globe, Phone } from 'lucide-react'

export function Wordmark({ className = '' }) {
  return (
    <div className={`flex items-baseline gap-1.5 ${className}`}>
      <span className="font-script text-2xl leading-none text-ladrillo-600">Artesan</span>
      <span className="font-display text-2xl uppercase leading-none tracking-wide text-tinta-800">Ale</span>
    </div>
  )
}

const TONOS = {
  primario: 'bg-ladrillo-500 text-white',
  exito: 'bg-olivo-500 text-white',
  acento: 'bg-dorado-400 text-tinta-900',
  tinta: 'bg-tinta-800 text-white',
  crema: 'bg-papel-200 text-tinta-700',
}

export function IconoCirculo({ icon: Icon, tono = 'primario', size = 40 }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full ${TONOS[tono]}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.5} strokeWidth={2.2} />
    </div>
  )
}

export function DivisorOrnamentado() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-tinta-200" />
      <span className="text-ladrillo-400">🍕</span>
      <div className="h-px flex-1 bg-tinta-200" />
    </div>
  )
}

export function IconosRedes({ config, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram" className="rounded-full bg-tinta-700 p-2 text-white hover:bg-ladrillo-600"><Camera size={16} /></a>
      <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook" className="rounded-full bg-tinta-700 p-2 text-white hover:bg-ladrillo-600"><Globe size={16} /></a>
      <a href={`tel:${config.telefono}`} aria-label="Teléfono" className="rounded-full bg-tinta-700 p-2 text-white hover:bg-ladrillo-600"><Phone size={16} /></a>
    </div>
  )
}
