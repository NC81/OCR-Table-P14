import { useState } from 'react'
import Table from '../lib/components/table'
import { mockList1 } from './lists/mock-list-1'
import { mockList2 } from './lists/mock-list-2'
import { mockList3 } from './lists/mock-list-3'
import { mockList4 } from './lists/mock-list-4'
import { mockColumns } from './mock-columns'

export default function MockPage() {
  const [list, setList] = useState(mockList1)

  return (
    <div>
      <button
        data-testid="mock-update-button"
        onClick={() => {
          setList(mockList2)
        }}
      >
        Update 1
      </button>
      <br />
      <button onClick={() => setList(mockList3)}>Update 2</button>
      <br />
      <button onClick={() => setList(mockList4)}>Update 3</button>
      <br />
      <Table data={list} columns={mockColumns} />
    </div>
  )
}
