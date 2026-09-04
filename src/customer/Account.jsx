import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Switch, Button } from '../ui/index.jsx'
import { FotoProducto } from '../ui/FoodArt.jsx'
import { Star, LogOut } from 'lucide-react'

export default function Account() {
  const { state, toggleFavorite, reset } = useDemo()
  const favoritos = state.productos.filter((p) => state.cliente.favoritos.includes(p.id))

  return (
    <Contenedor className="py-4">
      <PageHeader title="Cuenta" />

      <Tarjeta className="flex items-center gap-4 p-5">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ladrillo-100 font-display text-xl text-ladrillo-600">
          {state.cliente.nombre.split(' ').map((n) => n[0]).join('')}
        </span>
        <div>
          <p className="font-display uppercase tracking-wide text-tinta-800">{state.cliente.nombre}</p>
          <p className="flex items-center gap-1 text-sm text-dorado-500"><Star size={14} fill="currentColor" /> {state.cliente.nivel} · {state.cliente.puntos} pts</p>
        </div>
      </Tarjeta>

      <SectionHeader title="Favoritos" className="mt-8" />
      <div className="grid gap-3 sm:grid-cols-2">
        {favoritos.map((p, i) => (
          <Tarjeta key={p.id} className="flex items-center gap-3 p-3">
            <FotoProducto fotoId={p.fotoId} size="thumb" className="h-14 w-14 shrink-0 rounded-xl" seed={i} />
            <p className="font-medium text-tinta-700">{p.nombre}</p>
          </Tarjeta>
        ))}
        {favoritos.length === 0 && <p className="text-sm text-tinta-400">Aún no marcas favoritos.</p>}
      </div>

      <SectionHeader title="Preferencias de aviso" className="mt-8" />
      <Tarjeta className="divide-y divide-papel-200">
        {[
          { label: 'Avisos de estado de orden', on: true },
          { label: 'Promociones y eventos', on: true },
          { label: 'Recordatorio de recompensas', on: false },
        ].map((pref, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <span className="text-sm text-tinta-700">{pref.label}</span>
            <SwitchLocal defaultOn={pref.on} />
          </div>
        ))}
      </Tarjeta>

      <Button variant="ghost" className="mt-8" onClick={reset}><LogOut size={15} /> Reiniciar demostración</Button>
    </Contenedor>
  )
}

function SwitchLocal({ defaultOn }) {
  const [on, setOn] = React.useState(defaultOn)
  return <Switch checked={on} onChange={setOn} />
}
