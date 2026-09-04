import React from 'react'
import { Modal } from '../ui/index.jsx'

const PASOS = [
  { t: 'Negocio → Canales', d: 'De dónde ya viene la gente hoy: la publicación de redes y el QR de mesa. Toca el enlace de la publicación.' },
  { t: 'Cliente', d: 'Agrega la Pizza Avancina, ve al carrito y confirma la orden. Termina en la pantalla de confirmación con el número.' },
  { t: 'Negocio → Operación', d: 'La orden aparece marcada como nueva. Avánzala dos pasos (en el horno → lista).' },
  { t: 'Cliente → Alertas', d: 'Los avisos ya cambiaron solos y se ven en la pantalla de bloqueo simulada. Este es el momento que vende.' },
  { t: 'Negocio → Resumen', d: 'Trabajo del día, solicitudes por confirmar, ventas. Cierra apagando un producto agotado y copiando el enlace de una promo.' },
]

export function Guide({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Guía de la demostración">
      <p className="mb-4 text-sm text-tinta-500">Cinco pasos para mostrarle a Ramón cómo el portal conecta al cliente con la cocina, en vivo.</p>
      <ol className="space-y-4">
        {PASOS.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ladrillo-500 text-sm font-bold text-white">{i + 1}</span>
            <div>
              <p className="font-semibold text-tinta-800">{p.t}</p>
              <p className="text-sm text-tinta-500">{p.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Modal>
  )
}
