import React from 'react'
import ReactDOM from 'react-dom/client'
import Container from './components/container'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Container />
    {/* <Table data={mockList} /> */}
  </React.StrictMode>
)
