import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, Badge } from '../ui/index.jsx'
import { formatoMoneda, calcularTotales } from '../store/pricing.js'
import { Flame, DollarSign, Clock, Users } from 'lucide-react'

const HORAS = [
  { h: '4pm', v: 20 }, { h: '5pm', v: 35 }, { h: '6pm', v: 55 }, { h: '7pm', v: 90 },
  { h: '8pm', v: 100 }, { h: '9pm', v: 80 }, { h: '10pm', v: 60 }, { h: '11pm', v: 30 },
]
const CANALES = [
  { nombre: 'Portal', pct: 46, tono: 'bg-ladrillo-500' },
  { nombre: 'Instagram', pct: 30, tono: 'bg-dorado-400' },
  { nombre: 'Teléfono', pct: 24, tono: 'bg-tinta-400' },
]
const FLUJO = ['Recibida', 'Confirmada', 'En el horno', 'Lista', 'Entregada']

export default function Resumen() {
  const { state, setStatus, cancelOrder } = useDemo()
  const activas = state.ordenes.filter((o) => ['nueva', 'en_proceso', 'lista'].includes(o.estado))
  const porConfirmar = state.ordenes.filter((o) => o.estado === 'nueva')
  const ventasHoy = state.ordenes.reduce((acc, o) => acc + calcularTotales(o.items, state.productos, state.config.cargoServicio).total, 0)

  const conteo = {}
  state.ordenes.forEach((o) => o.items.forEach((it) => { conteo[it.productoId] = (conteo[it.productoId] || 0) + it.cantidad }))
  const top = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 4)
    .map(([id, n]) => ({ prod: state.productos.find((p) => p.id === id), n }))

  const kpis = [
    { icon: Flame, label: 'Órdenes activas', valor: activas.length, tono: 'primario' },
    { icon: Clock, label: 'Por confirmar', valor: porConfirmar.length, tono: 'acento' },
    { icon: DollarSign, label: 'Ventas de hoy', valor: formatoMoneda(ventasHoy), tono: 'exito' },
    { icon: Users, label: 'Clientes atendidos', valor: state.ordenes.length, tono: 'tinta' },
  ]

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Resumen" subtitle={`Buenas tardes, ${state.config.dueño}. Así va ArtesanAle hoy.`} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k, i) => (
          <Tarjeta key={i} className="p-4">
            <k.icon size={18} className="text-ladrillo-500" />
            <p className="mt-2 font-display text-2xl text-tinta-800">{k.valor}</p>
            <p className="text-xs text-tinta-400">{k.label}</p>
          </Tarjeta>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Trabajo del día" />
          <div className="space-y-2">
            {activas.map((o) => (
              <Tarjeta key={o.id} className="flex items-center justify-between p-3.5">
                <div>
                  <p className="text-sm font-semibold text-tinta-800">{o.id} · {o.cliente}</p>
                  <p className="text-xs text-tinta-400">{o.tipo} · {o.canal} · {o.hora}</p>
                </div>
                <Badge tone="dorado">{o.estado.replace('_', ' ')}</Badge>
              </Tarjeta>
            ))}
            {activas.length === 0 && <p className="text-sm text-tinta-400">No hay órdenes activas.</p>}
          </div>
        </div>

        <div>
          <SectionHeader title="Solicitudes por confirmar" />
          <div className="space-y-2">
            {porConfirmar.map((o) => (
              <Tarjeta key={o.id} className="p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-tinta-800">{o.id} · {o.cliente}</p>
                  <span className="text-xs text-tinta-400">{o.hora}</span>
                </div>
                <p className="mt-0.5 text-xs text-tinta-400">{o.items.length} platos · {o.tipo}</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="success" onClick={() => setStatus(o.id, 'en_proceso')}>Confirmar</Button>
                  <Button size="sm" variant="outline" onClick={() => cancelOrder(o.id)}>Cancelar</Button>
                </div>
              </Tarjeta>
            ))}
            {porConfirmar.length === 0 && <p className="text-sm text-tinta-400">Todo confirmado, sin pendientes.</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Órdenes por hora" />
          <Tarjeta className="flex h-40 items-end gap-2 p-5">
            {HORAS.map((h) => (
              <div key={h.h} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md bg-ladrillo-400" style={{ height: `${h.v}%` }} />
                <span className="text-[10px] text-tinta-400">{h.h}</span>
              </div>
            ))}
          </Tarjeta>
        </div>
        <div>
          <SectionHeader title="Canales" />
          <Tarjeta className="space-y-3 p-5">
            {CANALES.map((c) => (
              <div key={c.nombre}>
                <div className="mb-1 flex justify-between text-sm text-tinta-600"><span>{c.nombre}</span><span>{c.pct}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-papel-200"><div className={`h-full rounded-full ${c.tono}`} style={{ width: `${c.pct}%` }} /></div>
              </div>
            ))}
          </Tarjeta>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Top productos" />
          <div className="space-y-2">
            {top.map(({ prod, n }) => prod && (
              <Tarjeta key={prod.id} className="flex items-center justify-between p-3.5">
                <span className="text-sm font-medium text-tinta-700">{prod.nombre}</span>
                <Badge>{n} vendidos</Badge>
              </Tarjeta>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="Flujo interno" />
          <Tarjeta className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              {FLUJO.map((f, i) => (
                <React.Fragment key={f}>
                  <span className="rounded-full bg-papel-200 px-3 py-1.5 text-xs font-semibold text-tinta-600">{f}</span>
                  {i < FLUJO.length - 1 && <span className="text-tinta-300">→</span>}
                </React.Fragment>
              ))}
            </div>
          </Tarjeta>
        </div>
      </div>
    </Contenedor>
  )
}
