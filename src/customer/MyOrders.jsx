import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Badge, Button, EmptyState } from '../ui/index.jsx'
import { formatoMoneda, calcularTotales } from '../store/pricing.js'
import { ClipboardList } from 'lucide-react'

const ESTADO_TONO = { nueva: 'dorado', en_proceso: 'dorado', lista: 'olivo', completada: 'tinta', cancelada: 'tinta' }
const ESTADO_TEXTO = { nueva: 'Recibida', en_proceso: 'En el horno', lista: 'Lista', completada: 'Completada', cancelada: 'Cancelada' }

export default function MyOrders() {
  const { state, checkout } = useDemo()
  const mias = state.ordenes.filter((o) => o.cliente === state.cliente.nombre)
  const enCurso = mias.filter((o) => ['nueva', 'en_proceso', 'lista'].includes(o.estado))
  const historial = mias.filter((o) => ['completada', 'cancelada'].includes(o.estado))

  const Fila = ({ o }) => {
    const { total } = calcularTotales(o.items, state.productos, state.config.cargoServicio)
    return (
      <Tarjeta className="flex items-center justify-between gap-3 p-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-tinta-800">{o.id}</p>
            <Badge tone={ESTADO_TONO[o.estado]}>{ESTADO_TEXTO[o.estado]}</Badge>
          </div>
          <p className="text-sm text-tinta-400">{o.tipo} · {o.hora} · {o.items.length} platos · {formatoMoneda(total)}</p>
        </div>
        {['completada', 'cancelada'].includes(o.estado) && (
          <Button size="sm" variant="outline" onClick={() => o.items.forEach((it) => {})}>Repetir</Button>
        )}
      </Tarjeta>
    )
  }

  return (
    <Contenedor className="py-4">
      <PageHeader title="Mis órdenes" subtitle="En curso e historial." />
      <SectionHeader title="En curso" />
      <div className="mb-8 space-y-3">
        {enCurso.length ? enCurso.map((o) => <Fila key={o.id} o={o} />) : (
          <EmptyState icon={<ClipboardList size={24} className="text-tinta-300" />} title="Nada en curso" subtitle="Cuando hagas una orden desde el catálogo aparecerá aquí." />
        )}
      </div>
      <SectionHeader title="Historial" />
      <div className="space-y-3">
        {historial.map((o) => <Fila key={o.id} o={o} />)}
      </div>
    </Contenedor>
  )
}
