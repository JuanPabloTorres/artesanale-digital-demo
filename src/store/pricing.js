export const formatoMoneda = (n) =>
  `$${Number(n || 0).toFixed(2)}`

export const calcularTotales = (items, productos, cargoServicio = 0.1) => {
  const subtotal = items.reduce((acc, it) => {
    const prod = productos.find((p) => p.id === it.productoId)
    if (!prod) return acc
    return acc + prod.precio * it.cantidad
  }, 0)
  const servicio = subtotal * cargoServicio
  const total = subtotal + servicio
  return { subtotal, servicio, total }
}
