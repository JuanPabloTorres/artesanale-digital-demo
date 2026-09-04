import React, { useState } from 'react'
import { Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AlertTriangle, RotateCcw, HelpCircle, ShoppingBag, Bell, Home as HomeIcon, Flame, Percent, User, LayoutGrid } from 'lucide-react'
import { useDemo } from '../store/DemoStore.jsx'
import { Contenedor } from './Layout.jsx'
import { Wordmark, IconosRedes } from '../ui/Brand.jsx'
import { Guide } from './Guide.jsx'
import { Toaster } from './Toaster.jsx'

import Home from '../customer/Home.jsx'
import Menu from '../customer/Menu.jsx'
import Cart from '../customer/Cart.jsx'
import Checkout from '../customer/Checkout.jsx'
import OrderConfirm from '../customer/OrderConfirm.jsx'
import Promos from '../customer/Promos.jsx'
import MyOrders from '../customer/MyOrders.jsx'
import Alerts from '../customer/Alerts.jsx'
import Account from '../customer/Account.jsx'

import Resumen from '../negocio/Resumen.jsx'
import Operacion from '../negocio/Operacion.jsx'
import NegocioCatalogo from '../negocio/Catalogo.jsx'
import NegocioPromociones from '../negocio/Promociones.jsx'
import Canales from '../negocio/Canales.jsx'
import Config from '../negocio/Config.jsx'

const NAV_CLIENTE = [
  { to: '/', label: 'Inicio', icon: HomeIcon, exact: true },
  { to: '/menu', label: 'Catálogo', icon: Flame },
  { to: '/promociones', label: 'Promos', icon: Percent },
  { to: '/mis-ordenes', label: 'Mis Órdenes', icon: ShoppingBag },
  { to: '/alertas', label: 'Alertas', icon: Bell },
  { to: '/cuenta', label: 'Cuenta', icon: User },
]

const NAV_NEGOCIO = [
  { to: '/negocio', label: 'Resumen', exact: true },
  { to: '/negocio/cocina', label: 'Operación' },
  { to: '/negocio/menu', label: 'Catálogo' },
  { to: '/negocio/promociones', label: 'Promociones' },
  { to: '/negocio/canales', label: 'Canales' },
  { to: '/negocio/config', label: 'Configuración' },
]

export default function Shell() {
  const { state, reset } = useDemo()
  const [guiaAbierta, setGuiaAbierta] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const enNegocio = location.pathname.startsWith('/negocio')
  const carritoCount = state.carrito.reduce((a, i) => a + i.cantidad, 0)
  const sinLeer = state.notificaciones.filter((n) => !n.leida).length

  const cambiarModo = (modo) => navigate(modo === 'negocio' ? '/negocio' : '/')

  return (
    <div className="min-h-screen bg-papel-50">
      {/* Barra de demo */}
      <div className="sticky top-0 z-50 flex h-11 items-center justify-between bg-tinta-900 px-3 text-xs text-papel-100 sm:px-5">
        <div className="flex items-center gap-1.5 truncate">
          <AlertTriangle size={13} className="shrink-0 text-dorado-400" />
          <span className="truncate">Demostración — datos simulados</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button onClick={() => setGuiaAbierta(true)} className="hidden items-center gap-1 rounded-full px-2.5 py-1 hover:bg-white/10 sm:flex">
            <HelpCircle size={13} /> Guía
          </button>
          <button onClick={reset} className="flex items-center gap-1 rounded-full px-2.5 py-1 hover:bg-white/10">
            <RotateCcw size={13} /> <span className="hidden sm:inline">Reiniciar</span>
          </button>
          <div className="flex overflow-hidden rounded-full bg-white/10 p-0.5">
            <button onClick={() => cambiarModo('cliente')} className={`rounded-full px-2.5 py-1 font-medium ${!enNegocio ? 'bg-ladrillo-500 text-white' : 'text-papel-200'}`}>Cliente</button>
            <button onClick={() => cambiarModo('negocio')} className={`rounded-full px-2.5 py-1 font-medium ${enNegocio ? 'bg-ladrillo-500 text-white' : 'text-papel-200'}`}>Negocio</button>
          </div>
        </div>
      </div>

      {/* Cabecera del portal */}
      <div className="sticky top-11 z-40 border-b border-papel-300/60 bg-white/95 backdrop-blur">
        <Contenedor className="flex h-[70px] items-center justify-between gap-4">
          <Link to={enNegocio ? '/negocio' : '/'}><Wordmark /></Link>

          {!enNegocio ? (
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_CLIENTE.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.exact}
                  className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive ? 'bg-ladrillo-50 text-ladrillo-600' : 'text-tinta-500 hover:text-ladrillo-500'}`}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
          ) : (
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_NEGOCIO.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.exact}
                  className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive ? 'bg-tinta-800 text-white' : 'text-tinta-500 hover:text-tinta-800'}`}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!enNegocio && (
              <>
                <Link to="/alertas" className="relative rounded-full p-2 text-tinta-500 hover:bg-papel-200">
                  <Bell size={19} />
                  {sinLeer > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-ladrillo-500" />}
                </Link>
                <Link to="/carrito" className="relative rounded-full p-2 text-tinta-500 hover:bg-papel-200">
                  <ShoppingBag size={19} />
                  {carritoCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ladrillo-500 text-[10px] font-bold text-white">{carritoCount}</span>}
                </Link>
              </>
            )}
            <Link to={enNegocio ? '/' : '/negocio'} className="hidden items-center gap-1.5 rounded-full bg-tinta-800 px-3.5 py-2 text-xs font-semibold text-white sm:flex">
              <LayoutGrid size={14} /> {enNegocio ? 'Ver como cliente' : 'Modo Negocio'}
            </Link>
          </div>
        </Contenedor>
      </div>

      <Toaster />

      <main className="pb-24 lg:pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orden/:id" element={<OrderConfirm />} />
          <Route path="/promociones" element={<Promos />} />
          <Route path="/mis-ordenes" element={<MyOrders />} />
          <Route path="/alertas" element={<Alerts />} />
          <Route path="/cuenta" element={<Account />} />

          <Route path="/negocio" element={<Resumen />} />
          <Route path="/negocio/cocina" element={<Operacion />} />
          <Route path="/negocio/menu" element={<NegocioCatalogo />} />
          <Route path="/negocio/promociones" element={<NegocioPromociones />} />
          <Route path="/negocio/canales" element={<Canales />} />
          <Route path="/negocio/config" element={<Config />} />
        </Routes>
      </main>

      {/* Pie */}
      <footer className="hidden border-t border-papel-300/60 bg-tinta-900 py-10 text-papel-200 lg:block">
        <Contenedor className="flex flex-col items-center gap-3 text-center">
          <Wordmark className="[&>*]:text-white [&>*:first-child]:text-ladrillo-300" />
          <p className="font-serif italic text-papel-300">"Hecho a la leña, servido con cariño villalbeño."</p>
          <IconosRedes config={state.config} />
          <p className="mt-2 text-xs text-papel-400">{state.config.direccion} · {state.config.telefono}</p>
        </Contenedor>
      </footer>

      {/* BottomNav móvil */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-papel-300 bg-white/95 backdrop-blur lg:hidden">
        {(enNegocio ? [
          { to: '/negocio', label: 'Resumen', icon: HomeIcon, exact: true },
          { to: '/negocio/cocina', label: 'Cocina', icon: Flame },
          { to: '/negocio/menu', label: 'Catálogo', icon: LayoutGrid },
          { to: '/negocio/canales', label: 'Canales', icon: Percent },
        ] : NAV_CLIENTE.slice(0, 5)).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.exact}
            className={({ isActive }) => `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${isActive ? 'text-ladrillo-600' : 'text-tinta-400'}`}>
            <n.icon size={18} />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <Guide open={guiaAbierta} onClose={() => setGuiaAbierta(false)} />
    </div>
  )
}
