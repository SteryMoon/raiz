import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RaizProvider } from './store/RaizContext.jsx'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RaizProvider>
      <App />
    </RaizProvider>
  </React.StrictMode>
)
