import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, Switch } from '../ui/index.jsx'

const COLUMNAS = [
  { estado: 'nueva', titulo: 'Nuevas', siguiente: 'en_proceso', color: 'border-dorado-400' },
  { estado: 'en_proceso', titulo: 'En el horno', siguiente: 'lista', color: 'border-ladrillo-400' },
  { estado: 'lista', titulo: 'Listas', siguiente: 'completada', color: 'border-olivo-400' },
]

export default function Operacion() {
  const { state, setStatus, setAvailability } = useDemo()
  const agotables = state.productos.filter((p) => ['pizzas', 'tapas'].includes(p.categoria))

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Operación" subtitle="Tablero de cocina — avanza una orden con un toque." />

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNAS.map((col) => {
          const ordenes = state.ordenes.filter((o) => o.estado === col.estado)
          return (
            <div key={col.estado} className={`rounded-2xl border-t-4 bg-papel-100/60 p-3 ${col.color}`}>
              <p className="mb-3 flex items-center justify-between px-1 font-display uppercase tracking-wide text-tinta-700">
                {col.titulo} <span className="text-sm text-tinta-400">{ordenes.length}</span>
              </p>
              <div className="space-y-2.5">
                {ordenes.map((o) => (
                  <Tarjeta key={o.id} className="p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-tinta-800">{o.id}</p>
                      <span className="text-xs text-tinta-400">{o.hora}</span>
                    </div>
                    <p className="text-xs text-tinta-400">{o.cliente} · {o.tipo}</p>
                    <ul className="mt-1.5 space-y-0.5 text-xs text-tinta-600">
                      {o.items.map((it) => {
                        const p = state.productos.find((pp) => pp.id === it.productoId)
                        return <li key={it.productoId}>{it.cantidad}× {p?.nombre}</li>
                      })}
                    </ul>
                    {col.siguiente && (
                      <Button size="sm" className="mt-2.5 w-full" onClick={() => setStatus(o.id, col.siguiente)}>
                        Avanzar →
                      </Button>
                    )}
                  </Tarjeta>
                ))}
                {ordenes.length === 0 && <p className="px-1 text-xs text-tinta-400">Vacío por ahora.</p>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <p className="mb-3 font-display uppercase tracking-wide text-tinta-800">Control de agotados</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {agotables.map((p) => (
            <Tarjeta key={p.id} className="flex items-center justify-between p-3.5">
              <span className="text-sm text-tinta-700">{p.nombre}</span>
              <Switch checked={p.disponible} onChange={(v) => setAvailability(p.id, v)} />
            </Tarjeta>
          ))}
        </div>
      </div>
    </Contenedor>
  )
}
