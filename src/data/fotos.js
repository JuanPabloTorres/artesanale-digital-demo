// Fotos reales de ArtesanAle (Villalba, PR), localizadas por investigación web.
// Fuente: reseñas públicas de viajeros en Tripadvisor (perfil del negocio).
// IMPORTANTE (ver LEEME.md): sustituir por fotos propias del negocio en cuanto
// Ramón las comparta — estas son las mejores disponibles públicamente hoy.

export const FOTOS_REALES = {
  interior: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a9/7f/74/photo3jpg.jpg',
  pizzaAvancina: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/72/b3/1b/pizza-avancina.jpg',
  pizzaDonaJuana: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/72/b3/14/pizza-dona-juana.jpg',
  bebidas: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a9/7f/73/photo2jpg.jpg',
  ambiente1: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a9/7f/71/photo0jpg.jpg',
  ambiente2: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a9/7f/72/photo1jpg.jpg',
}

// Tamaños con el parámetro real de Tripadvisor (w=,h=,s=1) — nunca pidas 900x900
// para una miniatura de 44px.
export const TAMANOS = {
  thumb: [260, 260], tile: [520, 400], card: [760, 480],
  banner: [1100, 640], hero: [900, 700], evento: [560, 380],
}

export const urlFoto = (key, size = 'thumb') => {
  const base = FOTOS_REALES[key]
  if (!base) return null
  const [w, h] = TAMANOS[size] || TAMANOS.thumb
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}w=${w}&h=${h}&s=1`
}
