import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { semilla } from './seed.js'

const KEY = 'artesanale-demo-v3'

const cargar = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* localStorage no disponible: seguimos con la semilla */ }
  return semilla()
}

const guardar = (state) => {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignorar */ }
}

let idOrden = 1043
let idNotif = 100

function reducer(state, action) {
  switch (action.type) {
    case 'addToCart': {
      const existe = state.carrito.find((i) => i.productoId === action.productoId)
      const carrito = existe
        ? state.carrito.map((i) => i.productoId === action.productoId ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...state.carrito, { productoId: action.productoId, cantidad: 1 }]
      return { ...state, carrito, ui: { ...state.ui, toast: 'Agregado al carrito' } }
    }
    case 'removeFromCart':
      return { ...state, carrito: state.carrito.filter((i) => i.productoId !== action.productoId) }
    case 'updateCartQty':
      return {
        ...state,
        carrito: state.carrito
          .map((i) => i.productoId === action.productoId ? { ...i, cantidad: Math.max(0, action.cantidad) } : i)
          .filter((i) => i.cantidad > 0),
      }
    case 'clearCart':
      return { ...state, carrito: [] }
    case 'checkout': {
      const nueva = {
        id: `ORD-${idOrden++}`,
        canal: 'Portal',
        tipo: action.tipo || 'Recoger',
        items: state.carrito,
        estado: 'nueva',
        hora: 'Ahora mismo',
        cliente: state.cliente.nombre,
      }
      const notif = {
        id: `n${idNotif++}`,
        texto: `Recibimos tu orden ${nueva.id}. ¡Gracias, ${state.cliente.nombre.split(' ')[0]}!`,
        hora: 'Ahora',
        leida: false,
      }
      return {
        ...state,
        ordenes: [nueva, ...state.ordenes],
        carrito: [],
        notificaciones: [notif, ...state.notificaciones],
        ui: { ...state.ui, toast: `Orden ${nueva.id} enviada a cocina` },
        ultimaOrdenId: nueva.id,
      }
    }
    case 'setStatus': {
      const SIG_TEXTO = {
        en_proceso: 'está en el horno 🔥',
        lista: 'está lista para recoger 🍕',
        completada: 'fue entregada. ¡Buen provecho!',
      }
      const ordenes = state.ordenes.map((o) => o.id === action.ordenId ? { ...o, estado: action.estado } : o)
      const orden = ordenes.find((o) => o.id === action.ordenId)
      const notifExtra = SIG_TEXTO[action.estado] && orden
        ? [{ id: `n${idNotif++}`, texto: `Tu orden ${orden.id} ${SIG_TEXTO[action.estado]}`, hora: 'Ahora', leida: false }]
        : []
      return {
        ...state,
        ordenes,
        notificaciones: [...notifExtra, ...state.notificaciones],
        ui: { ...state.ui, toast: `Orden ${action.ordenId} → ${action.estado.replace('_', ' ')}` },
      }
    }
    case 'cancelOrder':
      return {
        ...state,
        ordenes: state.ordenes.map((o) => o.id === action.ordenId ? { ...o, estado: 'cancelada' } : o),
        ui: { ...state.ui, toast: `Orden ${action.ordenId} cancelada` },
      }
    case 'setAvailability':
      return {
        ...state,
        productos: state.productos.map((p) => p.id === action.productoId ? { ...p, disponible: action.disponible } : p),
        ui: { ...state.ui, toast: action.disponible ? 'Producto disponible' : 'Producto marcado agotado' },
      }
    case 'setPrice':
      return {
        ...state,
        productos: state.productos.map((p) => p.id === action.productoId ? { ...p, precio: action.precio } : p),
        ui: { ...state.ui, toast: 'Precio actualizado' },
      }
    case 'togglePromo':
      return {
        ...state,
        promos: state.promos.map((pr) => pr.id === action.promoId ? { ...pr, activa: !pr.activa } : pr),
      }
    case 'featurePromo':
      return {
        ...state,
        promos: state.promos.map((pr) => ({ ...pr, destacada: pr.id === action.promoId })),
        ui: { ...state.ui, toast: 'Promoción destacada' },
      }
    case 'setSettings':
      return { ...state, config: { ...state.config, ...action.valores }, ui: { ...state.ui, toast: 'Configuración guardada' } }
    case 'toggleFavorite': {
      const fav = state.cliente.favoritos.includes(action.productoId)
      return {
        ...state,
        cliente: {
          ...state.cliente,
          favoritos: fav
            ? state.cliente.favoritos.filter((id) => id !== action.productoId)
            : [...state.cliente.favoritos, action.productoId],
        },
      }
    }
    case 'readNotifications':
      return { ...state, notificaciones: state.notificaciones.map((n) => ({ ...n, leida: true })) }
    case 'pushNotification':
      return { ...state, notificaciones: [{ id: `n${idNotif++}`, texto: action.texto, hora: 'Ahora', leida: false }, ...state.notificaciones] }
    case 'toast':
      return { ...state, ui: { ...state.ui, toast: action.mensaje } }
    case 'clearToast':
      return { ...state, ui: { ...state.ui, toast: null } }
    case 'reset':
      return semilla()
    default:
      return state
  }
}

const StoreCtx = createContext(null)

export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, cargar)

  useEffect(() => { guardar(state) }, [state])

  const api = {
    state,
    addToCart: (productoId) => dispatch({ type: 'addToCart', productoId }),
    removeFromCart: (productoId) => dispatch({ type: 'removeFromCart', productoId }),
    updateCartQty: (productoId, cantidad) => dispatch({ type: 'updateCartQty', productoId, cantidad }),
    clearCart: () => dispatch({ type: 'clearCart' }),
    checkout: (tipo) => dispatch({ type: 'checkout', tipo }),
    setStatus: (ordenId, estado) => dispatch({ type: 'setStatus', ordenId, estado }),
    cancelOrder: (ordenId) => dispatch({ type: 'cancelOrder', ordenId }),
    setAvailability: (productoId, disponible) => dispatch({ type: 'setAvailability', productoId, disponible }),
    setPrice: (productoId, precio) => dispatch({ type: 'setPrice', productoId, precio }),
    togglePromo: (promoId) => dispatch({ type: 'togglePromo', promoId }),
    featurePromo: (promoId) => dispatch({ type: 'featurePromo', promoId }),
    setSettings: (valores) => dispatch({ type: 'setSettings', valores }),
    toggleFavorite: (productoId) => dispatch({ type: 'toggleFavorite', productoId }),
    readNotifications: () => dispatch({ type: 'readNotifications' }),
    pushNotification: (texto) => dispatch({ type: 'pushNotification', texto }),
    toast: (mensaje) => dispatch({ type: 'toast', mensaje }),
    clearToast: () => dispatch({ type: 'clearToast' }),
    reset: () => dispatch({ type: 'reset' }),
  }

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>
}

export const useDemo = () => useContext(StoreCtx)
