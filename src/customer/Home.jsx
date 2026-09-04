import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Percent, Bell, User, Star } from 'lucide-react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, SectionHeader } from '../shell/Layout.jsx'
import { Tarjeta, Badge, Button } from '../ui/index.jsx'
import { FotoProducto } from '../ui/FoodArt.jsx'
import { DetalleProducto } from '../ui/ProductDetail.jsx'
import { DivisorOrnamentado } from '../ui/Brand.jsx'
import { formatoMoneda } from '../store/pricing.js'
import { CATEGORIAS } from '../data/catalogo.js'
import { EVENTOS } from '../data/events.js'

export default function Home() {
  const { state, addToCart } = useDemo()
  const [abierto, setAbierto] = useState(null)
  const destacados = state.productos.filter((p) => p.destacado)
  const enProceso = state.ordenes.find((o) => o.cliente === state.cliente.nombre && ['nueva', 'en_proceso'].includes(o.estado))

  const accesos = [
    { to: '/menu', icon: Flame, label: 'Catálogo', badge: null, tono: 'primario' },
    { to: '/promociones', icon: Percent, label: 'Promos', badge: state.promos.filter((p) => p.activa).length, tono: 'acento' },
    { to: '/alertas', icon: Bell, label: 'Alertas', badge: state.notificaciones.filter((n) => !n.leida).length, tono: 'exito' },
    { to: '/cuenta', icon: User, label: 'Cuenta', badge: null, tono: 'tinta' },
  ]

  return (
    <Contenedor className="py-6">
      <div className="overflow-hidden rounded-3xl bg-tinta-800 banda-textura">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="flex flex-col justify-center gap-3 p-7 sm:p-9">
            <p className="text-sm font-medium text-dorado-300">Hola, {state.cliente.nombre.split(' ')[0]} 👋</p>
            <h1 className="font-display text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
              Pizzas artesanales<br />horneadas a la leña
            </h1>
            <p className="max-w-sm text-sm text-papel-200">{state.config.lema}</p>
            <Link to="/menu"><Button size="lg" className="mt-2 w-fit">Ver el menú</Button></Link>
          </div>
          <div className="relative min-h-[220px]">
            <FotoProducto fotoId="interior" size="banner" className="h-full" seed={0} />
          </div>
        </div>
      </div>

      {enProceso && (
        <Tarjeta className="mt-5 flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dorado-100 text-dorado-600"><Flame size={18} /></span>
            <div>
              <p className="text-sm font-semibold text-tinta-800">Orden {enProceso.id} — {enProceso.estado === 'nueva' ? 'recibida' : 'en el horno'}</p>
              <p className="text-xs text-tinta-400">Te avisamos cuando esté lista.</p>
            </div>
          </div>
          <Link to="/mis-ordenes"><Button variant="outline" size="sm">Ver</Button></Link>
        </Tarjeta>
      )}

      <div className="mt-6 grid grid-cols-4 gap-3">
        {accesos.map((a) => (
          <Link key={a.to} to={a.to} className="flex flex-col items-center gap-2 rounded-2xl border border-papel-300/70 bg-white p-3 text-center transition hover:border-ladrillo-300 hover:shadow-md">
            <span className="relative">
              <a.icon size={20} className="text-ladrillo-500" />
              {!!a.badge && <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ladrillo-500 text-[10px] font-bold text-white">{a.badge}</span>}
            </span>
            <span className="text-xs font-medium text-tinta-600">{a.label}</span>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <SectionHeader title="Destacados" subtitle="Lo que más piden en Villalba" />
        <div className="grid gap-4 sm:grid-cols-2">
          {destacados.map((p, i) => (
            <Tarjeta key={p.id} className="flex cursor-pointer flex-col overflow-hidden sm:flex-row" onClick={() => setAbierto(p)}>
              <FotoProducto fotoId={p.fotoId} size="card" className="h-40 sm:h-auto sm:w-40" seed={i} />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display uppercase tracking-wide text-tinta-800">{p.nombre}</p>
                  {p.tag && <Badge tone="dorado">{p.tag}</Badge>}
                </div>
                <p className="line-clamp-2 text-sm text-tinta-500">{p.descripcion}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-semibold text-ladrillo-600">{formatoMoneda(p.precio)}</span>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); addToCart(p.id) }}>Agregar</Button>
                </div>
              </div>
            </Tarjeta>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Catálogo por categoría" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIAS.map((c) => (
            <Link key={c.id} to={`/menu?cat=${c.id}`} className="rounded-2xl border border-papel-300/70 bg-white p-4 text-center text-sm font-semibold text-tinta-700 transition hover:border-ladrillo-300 hover:text-ladrillo-600">
              {c.nombre}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Recompensas" subtitle={`${state.cliente.puntos} puntos · nivel ${state.cliente.nivel}`} />
        <Tarjeta className="flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dorado-100 text-dorado-600"><Star size={22} /></span>
          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-papel-200">
              <div className="h-full rounded-full bg-dorado-400" style={{ width: '60%' }} />
            </div>
            <p className="mt-1.5 text-xs text-tinta-400">60 puntos más para tu próxima pizza gratis.</p>
          </div>
        </Tarjeta>
      </section>

      <section className="mt-10">
        <SectionHeader title="Eventos en la casa" />
        <div className="grid gap-3 sm:grid-cols-2">
          {EVENTOS.map((e) => (
            <Tarjeta key={e.id} className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ladrillo-500">{e.fecha}</p>
              <p className="mt-1 font-display uppercase tracking-wide text-tinta-800">{e.titulo}</p>
              <p className="mt-1 text-sm text-tinta-500">{e.descripcion}</p>
            </Tarjeta>
          ))}
        </div>
      </section>

      <DivisorOrnamentado />
      <p className="pb-4 text-center font-serif italic text-tinta-400">"Hecho a la leña, servido con cariño villalbeño."</p>

      <DetalleProducto producto={abierto} onClose={() => setAbierto(null)} onAgregar={addToCart} />
    </Contenedor>
  )
}
