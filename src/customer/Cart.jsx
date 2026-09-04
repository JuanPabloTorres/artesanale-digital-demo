import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, EmptyState } from '../ui/index.jsx'
import { FotoProducto } from '../ui/FoodArt.jsx'
import { formatoMoneda, calcularTotales } from '../store/pricing.js'

export default function Cart() {
  const { state, updateCartQty, removeFromCart } = useDemo()
  const navigate = useNavigate()
  const { subtotal, servicio, total } = calcularTotales(state.carrito, state.productos, state.config.cargoServicio)

  if (state.carrito.length === 0) {
    return (
      <Contenedor className="py-10">
        <EmptyState
          icon={<ShoppingBag size={26} className="text-tinta-300" />}
          title="Tu carrito está vacío"
          subtitle="Agrega algo del catálogo para empezar una orden de ejemplo."
          action={<Link to="/menu"><Button className="mt-2">Ver catálogo</Button></Link>}
        />
      </Contenedor>
    )
  }

  return (
    <Contenedor className="py-4">
      <PageHeader title="Tu carrito" subtitle="Datos de ejemplo — no se procesa ningún pago real." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {state.carrito.map((item, i) => {
            const prod = state.productos.find((p) => p.id === item.productoId)
            if (!prod) return null
            return (
              <Tarjeta key={item.productoId} className="flex items-center gap-3 p-3">
                <FotoProducto fotoId={prod.fotoId} size="thumb" className="h-16 w-16 shrink-0 rounded-xl" seed={i} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-tinta-800">{prod.nombre}</p>
                  <p className="text-sm text-tinta-400">{formatoMoneda(prod.precio)} c/u</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateCartQty(item.productoId, item.cantidad - 1)} className="rounded-full border border-tinta-200 p-1.5 text-tinta-500 hover:border-ladrillo-300"><Minus size={14} /></button>
                  <span className="w-5 text-center text-sm font-semibold">{item.cantidad}</span>
                  <button onClick={() => updateCartQty(item.productoId, item.cantidad + 1)} className="rounded-full border border-tinta-200 p-1.5 text-tinta-500 hover:border-ladrillo-300"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.productoId)} className="p-1.5 text-tinta-300 hover:text-ladrillo-500"><Trash2 size={16} /></button>
              </Tarjeta>
            )
          })}
        </div>

        <Tarjeta className="h-fit p-5 lg:sticky lg:top-32">
          <p className="mb-3 font-display uppercase tracking-wide text-tinta-800">Resumen</p>
          <div className="space-y-1.5 text-sm text-tinta-500">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatoMoneda(subtotal)}</span></div>
            <div className="flex justify-between"><span>Servicio (ejemplo)</span><span>{formatoMoneda(servicio)}</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-papel-200 pt-3 font-semibold text-tinta-800">
            <span>Total</span><span>{formatoMoneda(total)}</span>
          </div>
          <Button className="mt-4 w-full" onClick={() => navigate('/checkout')}>Continuar</Button>
        </Tarjeta>
      </div>
    </Contenedor>
  )
}
