import React from 'react'
import ReactDOM from 'react-dom/client'
import MockPage from './mock/mock-page'
import './lib/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MockPage />
  </React.StrictMode>
)
