import React from 'react'
import { Modal, Button, Badge } from './index.jsx'
import { FotoProducto } from './FoodArt.jsx'
import { formatoMoneda } from '../store/pricing.js'

export function DetalleProducto({ producto, onClose, onAgregar }) {
  if (!producto) return null
  return (
    <Modal open={!!producto} onClose={onClose} title={producto.nombre}>
      <FotoProducto fotoId={producto.fotoId} size="card" className="-mx-6 -mt-2 mb-4 h-52 sm:rounded-t-none" seed={0} />
      <div className="flex items-start justify-between gap-2">
        {producto.tag && <Badge tone="dorado">{producto.tag}</Badge>}
        {!producto.disponible && <Badge tone="tinta">Agotado hoy</Badge>}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-tinta-600">{producto.detalle || producto.descripcion}</p>
      <div className="mt-5 flex items-center justify-between border-t border-papel-200 pt-4">
        <span className="font-display text-2xl text-ladrillo-600">{formatoMoneda(producto.precio)}</span>
        <Button disabled={!producto.disponible} onClick={() => { onAgregar(producto.id); onClose() }}>
          Agregar al carrito
        </Button>
      </div>
    </Modal>
  )
}
