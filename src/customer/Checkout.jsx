import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Tarjeta, Button, Field } from '../ui/index.jsx'
import { formatoMoneda, calcularTotales } from '../store/pricing.js'

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
              <div className="flex gap-2">
                {['Recoger', 'Mesa'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold ${tipo === t ? 'border-ladrillo-500 bg-ladrillo-50 text-ladrillo-600' : 'border-tinta-200 text-tinta-500'}`}
                  >
                    {t}
                  </button>
                ))}
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
