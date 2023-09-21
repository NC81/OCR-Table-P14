import React from 'react'
import ReactDOM from 'react-dom/client'
import Table from './components/table'
import { mockList } from './data/mockList'
import { columns } from './data/columns'
import './table.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Table data={mockList} columns={columns} />
  </React.StrictMode>
)
