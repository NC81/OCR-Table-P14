import React from 'react'
import ReactDOM from 'react-dom/client'
import Table from './components/table'
import { mockList } from './mock/mockList'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Table data={mockList} />
  </React.StrictMode>
)
