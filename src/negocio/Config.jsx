import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Field, Input, Button } from '../ui/index.jsx'
import { EVENTOS } from '../data/events.js'
import { RotateCcw } from 'lucide-react'

export default function Config() {
  const { state, setSettings, reset } = useDemo()
  const c = state.config

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Configuración" subtitle="Todo lo que Ramón puede ajustar sin llamar a nadie." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Tiempos y cargos" />
          <Tarjeta className="space-y-4 p-5">
            <Field label="Tiempo promedio de preparación (min)">
              <Input type="number" value={c.tiempoPromedioMin} onChange={(e) => setSettings({ tiempoPromedioMin: parseInt(e.target.value) || 0 })} />
            </Field>
            <Field label="Cargo de servicio (%)">
              <Input type="number" value={Math.round(c.cargoServicio * 100)} onChange={(e) => setSettings({ cargoServicio: (parseFloat(e.target.value) || 0) / 100 })} />
            </Field>
          </Tarjeta>

          <SectionHeader title="Horario" className="mt-8" />
          <Tarjeta className="divide-y divide-papel-200">
            {c.horario.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 text-sm">
                <span className="text-tinta-600">{h.dia}</span>
                <span className="font-medium text-tinta-800">{h.horas}</span>
              </div>
            ))}
          </Tarjeta>
        </div>

        <div>
          <SectionHeader title="Recompensas" />
          <Tarjeta className="space-y-4 p-5">
            <Field label="Nombre del programa">
              <Input defaultValue="Amigos ArtesanAle" />
            </Field>
            <Field label="Puntos para pizza gratis">
              <Input type="number" defaultValue={200} />
            </Field>
          </Tarjeta>

          <SectionHeader title="Eventos programados" className="mt-8" />
          <div className="space-y-2">
            {EVENTOS.map((e) => (
              <Tarjeta key={e.id} className="p-3.5">
                <p className="text-sm font-semibold text-tinta-800">{e.titulo}</p>
                <p className="text-xs text-tinta-400">{e.fecha}</p>
              </Tarjeta>
            ))}
          </div>
        </div>
      </div>

      <Tarjeta className="mt-8 flex items-center justify-between p-5">
        <div>
          <p className="font-semibold text-tinta-800">Reiniciar demostración</p>
          <p className="text-sm text-tinta-400">Vuelve todos los datos de ejemplo a su punto de partida.</p>
        </div>
        <Button variant="outline" onClick={reset}><RotateCcw size={15} /> Reiniciar</Button>
      </Tarjeta>
    </Contenedor>
  )
}
