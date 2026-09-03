import { PRODUCTOS } from '../data/catalogo.js'
import { PROMOS } from '../data/promos.js'
import { NEGOCIO } from '../data/config.js'

export const semilla = () => ({
  loggedIn: true,
  cliente: {
    nombre: 'Karla Rivera',
    nivel: 'Amiga ArtesanAle',
    puntos: 140,
    gastado: 186.5,
    favoritos: ['p-avancina', 'b-cerveza-barril'],
  },
  carrito: [],
  productos: PRODUCTOS.map((p) => ({ ...p })),
  promos: PROMOS.map((p) => ({ ...p })),
  ordenes: [
    {
      id: 'ORD-1042',
      canal: 'Portal',
      tipo: 'Recoger',
      items: [
        { productoId: 'p-avancina', cantidad: 1 },
        { productoId: 'b-cerveza-barril', cantidad: 2 },
      ],
      estado: 'nueva',
      hora: 'Hace 2 min',
      cliente: 'Karla Rivera',
    },
    {
      id: 'ORD-1041',
      canal: 'Instagram',
      tipo: 'Mesa',
      items: [
        { productoId: 'p-dona-juana', cantidad: 1 },
        { productoId: 't-wings', cantidad: 1 },
      ],
      estado: 'en_proceso',
      hora: 'Hace 9 min',
      cliente: 'Luis Deliz',
    },
    {
      id: 'ORD-1040',
      canal: 'Teléfono',
      tipo: 'Recoger',
      items: [{ productoId: 'p-villalbena', cantidad: 2 }],
      estado: 'lista',
      hora: 'Hace 14 min',
      cliente: 'Ana Lucía F.',
    },
    {
      id: 'ORD-1039',
      canal: 'Portal',
      tipo: 'Mesa',
      items: [
        { productoId: 't-bruschetta-salmon', cantidad: 1 },
        { productoId: 'b-cerveza-botella', cantidad: 2 },
      ],
      estado: 'completada',
      hora: 'Ayer',
      cliente: 'Karla Rivera',
    },
    {
      id: 'ORD-1038',
      canal: 'Portal',
      tipo: 'Recoger',
      items: [{ productoId: 'p-margarita', cantidad: 1 }],
      estado: 'completada',
      hora: 'Hace 3 días',
      cliente: 'Karla Rivera',
    },
  ],
  notificaciones: [
    {
      id: 'n1',
      texto: 'Tu orden ORD-1041 está en el horno 🔥',
      hora: 'Hace 9 min',
      leida: false,
    },
    {
      id: 'n2',
      texto: 'Nueva promo: Jueves de Cervecero — 2x1 en barril',
      hora: 'Hoy',
      leida: false,
    },
  ],
  config: { ...NEGOCIO },
  ui: { toast: null },
})
