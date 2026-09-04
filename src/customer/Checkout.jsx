import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, Field } from '../ui/index.jsx'
import { formatoMoneda, calcularTotales } from '../store/pricing.js'

const OPCIONES_TIPO = [
  { valor: 'Recoger', icon: ShoppingBag, desc: 'Pasas a buscarla al mostrador' },
  { valor: 'Mesa', icon: UtensilsCrossed, desc: 'Te la servimos en tu mesa' },
]

export default function Checkout() {
  const { state, checkout } = useDemo()
  const [tipo, setTipo] = useState('Recoger')
  const navigate = useNavigate()
  const { subtotal, servicio, total } = calcularTotales(state.carrito, state.productos, state.config.cargoServicio)

  const confirmar = () => {
    checkout(tipo)
    navigate(`/orden/${state.ultimaOrdenId || 'nueva'}`)
  }

  return (
    <Contenedor className="py-4">
      <PageHeader title="Confirmar orden" subtitle="Simulación — ningún cargo real se procesa en esta demostración." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Tarjeta className="p-5">
            <Field label="Tipo de entrega">
              <div className="grid grid-cols-2 gap-3">
                {OPCIONES_TIPO.map((o) => {
                  const activo = tipo === o.valor
                  return (
                    <button
                      key={o.valor}
                      type="button"
                      onClick={() => setTipo(o.valor)}
                      aria-pressed={activo}
                      className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition ${activo ? 'border-ladrillo-500 bg-ladrillo-50' : 'border-tinta-200 bg-white hover:border-tinta-300'}`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <o.icon size={20} className={activo ? 'text-ladrillo-600' : 'text-tinta-400'} />
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${activo ? 'border-ladrillo-500' : 'border-tinta-300'}`}>
                          {activo && <span className="h-2.5 w-2.5 rounded-full bg-ladrillo-500" />}
                        </span>
                      </div>
                      <span className={`font-display uppercase tracking-wide ${activo ? 'text-ladrillo-700' : 'text-tinta-700'}`}>{o.valor}</span>
                      <span className="text-xs text-tinta-400">{o.desc}</span>
                    </button>
                  )
                })}
              </div>
            </Field>
          </Tarjeta>
          <Tarjeta className="p-5">
            <p className="mb-2 font-display uppercase tracking-wide text-tinta-800">Método de pago</p>
            <div className="rounded-xl border border-dashed border-tinta-200 p-4 text-sm text-tinta-400">
              Pago simulado para la demostración — no se procesa ningún cobro.
            </div>
          </Tarjeta>
        </div>
        <Tarjeta className="h-fit p-5 lg:sticky lg:top-32">
          <p className="mb-3 font-display uppercase tracking-wide text-tinta-800">Total</p>
          <div className="space-y-1.5 text-sm text-tinta-500">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatoMoneda(subtotal)}</span></div>
            <div className="flex justify-between"><span>Servicio (ejemplo)</span><span>{formatoMoneda(servicio)}</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-papel-200 pt-3 font-semibold text-tinta-800">
            <span>Total</span><span>{formatoMoneda(total)}</span>
          </div>
          <Button className="mt-4 w-full" onClick={confirmar}>Confirmar orden</Button>
        </Tarjeta>
      </div>
    </Contenedor>
  )
}
