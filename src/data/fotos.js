// Fotos de ejemplo (Pexels, libres de uso). Se guardan solo los ids y la URL
// se arma por tamaño, para no pedir 1100px donde hay un hueco de 260px.
//
// IMPORTANTE (ver LEEME.md): lo primero que hay que hacer si Ramón acepta la
// propuesta es sustituir estas fotos por las del propio negocio.

export const FOTOS_REALES = {
  // ambiente y cabeceras
  interior: 31969434,      // servicio en salón acogedor
  hornoLena: 905847,       // pizza saliendo del horno de leña

  // pizzas
  pizzaAvancina: 6068718,
  pizzaDonaJuana: 32763320,
  pizzaVillalbena: 31094832,
  pizzaMargarita: 31596394,

  // tapas
  wings: 27562875,
  bruschetta: 5639423,
  tabla: 6660311,

  // pastas
  pastaPesto: 14930726,
  pastaCamarones: 29208502,

  // bebidas
  cervezaBarril: 1267681,
  cervezaBotella: 5537952,
  jugoNaranja: 14510445,
}

// Pide siempre el tamaño del hueco, nunca 900x900 para una miniatura de 44px.
export const TAMANOS = {
  thumb: [260, 260], tile: [520, 400], card: [760, 480],
  banner: [1100, 640], hero: [760, 760], evento: [560, 380],
}

export const urlFoto = (key, size = 'thumb') => {
  const id = FOTOS_REALES[key]
  if (!id) return null
  const [w, h] = TAMANOS[size] || TAMANOS.thumb
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`
}
