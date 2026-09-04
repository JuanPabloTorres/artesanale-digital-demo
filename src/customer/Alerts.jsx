import React, { useEffect } from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta } from '../ui/index.jsx'
import { Bell, MessageSquareText, Smartphone, Camera, Phone } from 'lucide-react'
import { Wordmark } from '../ui/Brand.jsx'

const PASOS_COMUNICACION = [
  { icon: Phone, texto: 'Antes: llamar y esperar en línea' },
  { icon: Camera, texto: 'O escribir por Instagram y esperar respuesta' },
  { icon: MessageSquareText, texto: 'Con el portal: la orden llega escrita, no dictada' },
  { icon: Smartphone, texto: 'Y el cliente recibe el avance sin preguntar' },
]

export default function Alerts() {
  const { state, readNotifications } = useDemo()

  useEffect(() => { readNotifications() }, [])

  return (
    <Contenedor className="py-4">
      <PageHeader title="Alertas" subtitle="Así se entera el cliente, sin llamar ni preguntar." />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionHeader title="Avisos recientes" />
          <div className="space-y-3">
            {state.notificaciones.map((n) => (
              <Tarjeta key={n.id} className="flex items-start gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ladrillo-100 text-ladrillo-600"><Bell size={16} /></span>
                <div>
                  <p className="text-sm text-tinta-700">{n.texto}</p>
                  <p className="mt-0.5 text-xs text-tinta-400">{n.hora}</p>
                </div>
              </Tarjeta>
            ))}
          </div>

          <SectionHeader title="Cómo cambia la comunicación" className="mt-8" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PASOS_COMUNICACION.map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-papel-300/70 bg-white p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-papel-200 text-tinta-600"><p.icon size={16} /></span>
                <p className="text-sm text-tinta-600">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-tinta-400">Vista simulada del celular</p>
          <div className="mx-auto w-full max-w-[260px] rounded-[2.2rem] border-8 border-tinta-800 bg-tinta-900 p-3 shadow-2xl">
            <div className="rounded-[1.4rem] bg-gradient-to-b from-tinta-700 to-tinta-900 p-5 text-white">
              <p className="text-center text-xs text-papel-200">jueves, 7:42pm</p>
              <p className="text-center font-display text-3xl">7:42</p>
              <div className="mt-6 space-y-2">
                {state.notificaciones.slice(0, 2).map((n) => (
                  <div key={n.id} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Wordmark className="scale-75 origin-left [&>*]:text-white" />
                    </div>
                    <p className="text-xs leading-snug text-papel-100">{n.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  )
}
