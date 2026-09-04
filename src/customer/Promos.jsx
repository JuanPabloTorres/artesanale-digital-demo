import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Badge } from '../ui/index.jsx'
import { Percent } from 'lucide-react'

export default function Promos() {
  const { state } = useDemo()
  const destacada = state.promos.find((p) => p.destacada && p.activa)
  const activas = state.promos.filter((p) => p.activa && !p.destacada)
  const pausadas = state.promos.filter((p) => !p.activa)

  return (
    <Contenedor className="py-4">
      <PageHeader title="Promociones" subtitle="Ofertas activas esta semana en ArtesanAle." />

      {destacada && (
        <div className="mb-8 overflow-hidden rounded-3xl bg-ladrillo-600 banda-textura p-7 text-white">
          <Badge tone="dorado" className="mb-2">Destacada</Badge>
          <h2 className="font-display text-2xl uppercase tracking-wide">{destacada.titulo}</h2>
          <p className="mt-1 max-w-md text-sm text-ladrillo-100">{destacada.descripcion}</p>
        </div>
      )}

      <SectionHeader title="Activas" />
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {activas.map((p) => (
          <Tarjeta key={p.id} className="flex items-start gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olivo-100 text-olivo-600"><Percent size={18} /></span>
            <div>
              <p className="font-display uppercase tracking-wide text-tinta-800">{p.titulo}</p>
              <p className="text-sm text-tinta-500">{p.descripcion}</p>
            </div>
          </Tarjeta>
        ))}
        {activas.length === 0 && <p className="text-sm text-tinta-400">No hay más promociones activas ahora.</p>}
      </div>

      {pausadas.length > 0 && (
        <>
          <SectionHeader title="Pausadas" />
          <div className="grid gap-3 sm:grid-cols-2">
            {pausadas.map((p) => (
              <Tarjeta key={p.id} className="flex items-start gap-3 p-4 opacity-60">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tinta-100 text-tinta-500"><Percent size={18} /></span>
                <div>
                  <p className="font-display uppercase tracking-wide text-tinta-800">{p.titulo}</p>
                  <p className="text-sm text-tinta-500">{p.descripcion}</p>
                </div>
              </Tarjeta>
            ))}
          </div>
        </>
      )}
    </Contenedor>
  )
}
