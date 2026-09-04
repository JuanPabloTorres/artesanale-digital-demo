// Fotos reales de ArtesanAle (Villalba, PR). Fuente: ficha pública de Google
// Maps del negocio (fotos subidas por el propio negocio y por visitantes).
// IMPORTANTE (ver LEEME.md): las fotos de platillos específicos (Avancina,
// Doña Juana) no estaban disponibles en la ficha pública — sustituir por
// fotos propias del menú en cuanto Ramón las comparta.

export const FOTOS_REALES = {
  interior: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl1-iZ9d_BhU-CZrAG1mLK-2wWUlH758NA-b5hsDmyp_hIkss8Z_I0crsTE_HpO6ss-YWKJYuCDyAQcvoLgKJkOjUfZnYqh_qUr_eyYVyouQ0lR3bf7D9TReHzQi5vp-2sBZhef',
  stromboli: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmdOecL26N1O50RvUqxIaz7QpausgEe68jXRjbm9J2Dl_ENQDAIYHxWWAxtIcMYNPKnGrq-RUGo1yFvEcLvBCDcVJLylvT1i79CPw93dPKB7rXmC-qN3YQgMgWOHr2jvQQHXh6i0w',
  ribeye: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmDPEnOUhE453LeppYkPhw7YDWAwXOSo-GUB1Q8IWrR_tcjCzujAqrvq_WNzmxscX7MApfe3hsKi-tbS5qFf2JxjLvOedazTVWGCOhoOHMDj7QlvNd58HdHHq-823Z0IEVgGeo',
}

// Tamaños con el parámetro real de Google (=w,h) — nunca pidas 900x900
// para una miniatura de 44px.
export const TAMANOS = {
  thumb: [260, 260], tile: [520, 400], card: [760, 480],
  banner: [1100, 640], hero: [900, 700], evento: [560, 380],
}

export const urlFoto = (key, size = 'thumb') => {
  const base = FOTOS_REALES[key]
  if (!base) return null
  const [w, h] = TAMANOS[size] || TAMANOS.thumb
  return `${base}=w${w}-h${h}-no`
}
