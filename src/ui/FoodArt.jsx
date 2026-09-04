import React, { useEffect, useState } from 'react'
import { urlFoto } from '../data/fotos.js'

const PALETAS = ['#c8492b', '#dfa128', '#647a38', '#832c1a']

function IlustracionFallback({ seed = 0 }) {
  const color = PALETAS[seed % PALETAS.length]
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="200" fill="#f8f1e4" />
      <circle cx="100" cy="100" r="70" fill={color} opacity="0.15" />
      <circle cx="100" cy="100" r="46" fill={color} opacity="0.25" />
      <circle cx="72" cy="82" r="7" fill={color} opacity="0.5" />
      <circle cx="120" cy="70" r="5" fill={color} opacity="0.5" />
      <circle cx="128" cy="120" r="6" fill={color} opacity="0.5" />
      <circle cx="80" cy="128" r="4" fill={color} opacity="0.5" />
    </svg>
  )
}

// Pexels rechaza parte de la ráfaga cuando la página pide 12 fotos a la vez.
// En vez de caer a la ilustración al primer fallo, reintentamos con espera.
const MAX_REINTENTOS = 4

export function FotoProducto({ fotoId, size = 'tile', className = '', seed = 0 }) {
  const [intento, setIntento] = useState(0)
  const [rendido, setRendido] = useState(false)
  const base = urlFoto(fotoId, size)

  useEffect(() => { setIntento(0); setRendido(false) }, [base])

  const alFallar = () => {
    if (intento < MAX_REINTENTOS) {
      const espera = 600 * (intento + 1)
      setTimeout(() => setIntento((n) => n + 1), espera)
    } else {
      setRendido(true)
    }
  }

  const url = base ? (intento ? base + '&r=' + intento : base) : null

  return (
    <div className={`relative min-w-0 overflow-hidden bg-papel-100 ${className}`}>
      {url && !rendido ? (
        <img
          key={intento}
          src={url}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={alFallar}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <IlustracionFallback seed={seed} />
      )}
    </div>
  )
}
