import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Heart } from 'lucide-react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Chip, Button, Badge, Input } from '../ui/index.jsx'
import { FotoProducto } from '../ui/FoodArt.jsx'
import { formatoMoneda } from '../store/pricing.js'
import { CATEGORIAS } from '../data/catalogo.js'

export default function Menu() {
  const { state, addToCart, toggleFavorite } = useDemo()
  const [params, setParams] = useSearchParams()
  const catActiva = params.get('cat') || 'todas'
  const [busqueda, setBusqueda] = useState('')

  const productos = useMemo(() => {
    return state.productos.filter((p) => {
      const enCat = catActiva === 'todas' || p.categoria === catActiva
      const enBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      return enCat && enBusqueda
    })
  }, [state.productos, catActiva, busqueda])

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="ArtesanAle" title="Catálogo" subtitle="Pizzas, tapas, pastas y cervezas — hechas a la leña." />

      <div className="relative mb-4">
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tinta-300" />
        <Input placeholder="Buscar en el menú…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="pl-10" />
      </div>

      <div className="sticky top-[114px] z-30 -mx-4 mb-6 flex gap-2 overflow-x-auto bg-papel-50/95 px-4 py-2 backdrop-blur no-scrollbar">
        <Chip active={catActiva === 'todas'} onClick={() => setParams({ cat: 'todas' })}>Todas</Chip>
        {CATEGORIAS.map((c) => (
          <Chip key={c.id} active={catActiva === c.id} onClick={() => setParams({ cat: c.id })}>{c.nombre}</Chip>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p, i) => {
          const fav = state.cliente.favoritos.includes(p.id)
          return (
            <Tarjeta key={p.id} className="flex flex-col overflow-hidden">
              <div className="relative h-40">
                <FotoProducto fotoId={p.fotoId} size="card" className="h-full" seed={i} />
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 ${fav ? 'text-ladrillo-500' : 'text-tinta-300'}`}
                >
                  <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
                </button>
                {!p.disponible && (
                  <div className="absolute inset-0 flex items-center justify-center bg-tinta-900/55">
                    <Badge tone="tinta" className="bg-white/90 text-tinta-700">Agotado hoy</Badge>
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display uppercase tracking-wide text-tinta-800">{p.nombre}</p>
                  {p.tag && <Badge tone="olivo" className="shrink-0">{p.tag}</Badge>}
                </div>
                <p className="line-clamp-2 text-sm text-tinta-500">{p.descripcion}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-semibold text-ladrillo-600">{formatoMoneda(p.precio)}</span>
                  <Button size="sm" disabled={!p.disponible} onClick={() => addToCart(p.id)}>Agregar</Button>
                </div>
              </div>
            </Tarjeta>
          )
        })}
        {productos.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-tinta-400">No encontramos platos con esa búsqueda.</p>
        )}
      </div>
      <p className="mt-8 pb-2 text-center text-xs text-tinta-400">Datos de ejemplo para esta demostración — precios reales a confirmar con Ramón.</p>
    </Contenedor>
  )
}
