import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { DemoProvider } from './store/DemoStore.jsx'
import Shell from './shell/Shell.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <DemoProvider>
        <Shell />
      </DemoProvider>
    </HashRouter>
  </React.StrictMode>
)
