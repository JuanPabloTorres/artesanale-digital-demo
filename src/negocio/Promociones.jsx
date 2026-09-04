import React, { useState } from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, Switch, Badge } from '../ui/index.jsx'
import { Link2 } from 'lucide-react'

export default function NegocioPromociones() {
  const { state, togglePromo, featurePromo, toast } = useDemo()
  const [copiado, setCopiado] = useState(null)

  const copiar = (p) => {
    const link = `https://artesanale.pr/promo/${p.id}`
    try { navigator.clipboard?.writeText(link) } catch (e) {}
    setCopiado(p.id)
    toast('Enlace copiado para redes')
    setTimeout(() => setCopiado(null), 1800)
  }

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Promociones" subtitle="Activa, pausa o destaca una promo. Copia el enlace para Instagram." />

      <div className="space-y-3">
        {state.promos.map((p) => (
          <Tarjeta key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display uppercase tracking-wide text-tinta-800">{p.titulo}</p>
                {p.destacada && <Badge tone="dorado">Destacada</Badge>}
              </div>
              <p className="text-sm text-tinta-500">{p.descripcion}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" onClick={() => copiar(p)}>
                <Link2 size={14} /> {copiado === p.id ? 'Copiado' : 'Copiar enlace'}
              </Button>
              <Button size="sm" variant={p.destacada ? 'dark' : 'outline'} onClick={() => featurePromo(p.id)}>Destacar</Button>
              <Switch checked={p.activa} onChange={() => togglePromo(p.id)} />
            </div>
          </Tarjeta>
        ))}
      </div>
    </Contenedor>
  )
}
