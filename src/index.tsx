import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AccountsProvider } from './contexts/accounts'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AccountsProvider>
      <App />
    </AccountsProvider>
  </React.StrictMode>
)
