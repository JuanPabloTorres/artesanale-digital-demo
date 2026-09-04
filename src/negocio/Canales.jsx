import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Badge } from '../ui/index.jsx'
import { useDemo } from '../store/DemoStore.jsx'
import { FotoProducto } from '../ui/FoodArt.jsx'
import { Wordmark } from '../ui/Brand.jsx'
import { Heart, MessageCircle, Send, Star } from 'lucide-react'

const PASOS = [
  'El cliente ve la publicación en Instagram o el QR en la mesa.',
  'Toca el enlace y entra directo al catálogo — sin descargar nada.',
  'Arma su orden y confirma en menos de un minuto.',
  'La orden entra a Operación marcada como nueva, lista para confirmar.',
  'El cliente recibe avisos automáticos del avance en Alertas.',
  'Ramón revisa el cierre del día en Resumen — ventas y canal de origen.',
]

export default function Canales() {
  const { state } = useDemo()
  const [qr, setQr] = useState(null)

  useEffect(() => {
    QRCode.toDataURL(typeof window !== 'undefined' ? window.location.href : 'https://artesanale.pr', {
      margin: 1,
      color: { dark: '#1c1917', light: '#fdfaf4' },
    }).then(setQr).catch(() => {})
  }, [])

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Canales" subtitle="De dónde viene la gente, y cómo el portal se suma como canal directo." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Publicación simulada" />
          <Tarjeta className="overflow-hidden">
            <div className="flex items-center gap-2.5 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ladrillo-500 text-xs font-bold text-white">A</span>
              <Wordmark className="scale-90 origin-left" />
            </div>
            <FotoProducto fotoId="interior" size="card" className="h-56" />
            <div className="space-y-2 p-3.5">
              <div className="flex gap-3 text-tinta-600"><Heart size={18} /><MessageCircle size={18} /><Send size={18} /></div>
              <p className="text-sm text-tinta-700"><span className="font-semibold">artesanalepr</span> Pide tu Avancina desde el portal — llega directo a cocina 🔥 Link en bio.</p>
            </div>
          </Tarjeta>
        </div>

        <div>
          <SectionHeader title="QR de mesa" />
          <Tarjeta className="flex flex-col items-center gap-3 p-6 text-center">
            {qr && <img src={qr} alt="Código QR del portal" className="h-40 w-40" />}
            <p className="text-sm text-tinta-500">Escanéalo desde una mesa y llegas directo al catálogo de ArtesanAle.</p>
          </Tarjeta>

          <SectionHeader title="Presencia en Google" className="mt-8" />
          <Tarjeta className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-tinta-800">ArtesanAle</p>
              <p className="flex items-center gap-1 text-sm text-dorado-500"><Star size={14} fill="currentColor" /> {state.config.rating.google} · Google</p>
            </div>
            <Badge tone="olivo">Perfil activo</Badge>
          </Tarjeta>
        </div>
      </div>

      <div className="mt-10">
        <SectionHeader title="Recorrido completo" />
        <ol className="grid gap-3 sm:grid-cols-2">
          {PASOS.map((p, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-papel-300/70 bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tinta-800 text-sm font-bold text-white">{i + 1}</span>
              <p className="text-sm text-tinta-600">{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </Contenedor>
  )
}
