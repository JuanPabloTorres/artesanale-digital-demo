import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Contenedor } from '../shell/Layout.jsx'
import { Button, Tarjeta } from '../ui/index.jsx'

export default function OrderConfirm() {
  const { id } = useParams()
  return (
    <Contenedor className="flex flex-col items-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olivo-100 text-olivo-600"><CheckCircle2 size={32} /></span>
      <h1 className="mt-4 font-display text-2xl uppercase tracking-wide text-tinta-800">¡Orden enviada!</h1>
      <p className="mt-1 text-tinta-500">Tu número de orden es</p>
      <Tarjeta className="mt-3 px-6 py-3"><p className="font-display text-xl text-ladrillo-600">{id}</p></Tarjeta>
      <p className="mt-4 max-w-sm text-sm text-tinta-400">
        Ya llegó a Operación en el modo Negocio, marcada como nueva. Síguela en tiempo real desde Alertas.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/alertas"><Button>Ver Alertas</Button></Link>
        <Link to="/mis-ordenes"><Button variant="outline">Mis órdenes</Button></Link>
      </div>
    </Contenedor>
  )
}
