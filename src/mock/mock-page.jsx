import { useState } from 'react'
import Table from '../lib/components/table'
import { initialList } from './list'
import { listUpdate1 } from './list-update-1'
import { listUpdate2 } from './list-update-2'
import { listUpdate3 } from './list-update-3'

export default function MockPage() {
  const [list, setList] = useState(initialList)

  return (
    <div>
      <button
        data-testid="mock-update-button"
        onClick={() => {
          setList(listUpdate1)
        }}
      >
        Update 1
      </button>
      <br />
      <button onClick={() => setList(listUpdate2)}>Update 2</button>
      <br />
      <button onClick={() => setList(listUpdate3)}>Update 3</button>
      <br />
      <Table data={list} />
    </div>
  )
}
