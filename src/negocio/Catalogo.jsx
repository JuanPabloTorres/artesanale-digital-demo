import React from 'react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor, PageHeader } from '../shell/Layout.jsx'
import { Switch } from '../ui/index.jsx'
import { CATEGORIAS } from '../data/catalogo.js'

export default function NegocioCatalogo() {
  const { state, setPrice, setAvailability } = useDemo()

  return (
    <Contenedor className="py-4">
      <PageHeader eyebrow="Modo Negocio" title="Catálogo" subtitle="Precio editable en línea y disponibilidad — se refleja al instante en el modo Cliente." />

      <div className="overflow-hidden rounded-2xl border border-papel-300/70 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-papel-100 text-xs uppercase tracking-wide text-tinta-500">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Disponible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-papel-200">
            {state.productos.map((p) => (
              <tr key={p.id} className={!p.disponible ? 'opacity-50' : ''}>
                <td className="px-4 py-3 font-medium text-tinta-800">{p.nombre}</td>
                <td className="px-4 py-3 text-tinta-500">{CATEGORIAS.find((c) => c.id === p.categoria)?.nombre}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-tinta-700">
                    <span>$</span>
                    <input
                      type="number"
                      step="0.5"
                      value={p.precio}
                      onChange={(e) => setPrice(p.id, parseFloat(e.target.value) || 0)}
                      className="w-20 rounded-lg border border-tinta-200 px-2 py-1 outline-none focus:border-ladrillo-400"
                    />
                  </div>
                </td>
                <td className="px-4 py-3"><Switch checked={p.disponible} onChange={(v) => setAvailability(p.id, v)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Contenedor>
  )
}
