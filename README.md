# Table-P14 Student Project

Table-P14 is a React Table library converted from this [jQuery plugin](https://github.com/DataTables/DataTables.git) and intended to work with [P14 App](https://github.com/NC81/NicolasCandeli_14_08092023.git)
It can also work on any React App provided **columns** prop is [properly configured](#on-another-app)

## Technologies

- JS
- React

## Dependencies

- PropTypes

## Features

- Entries selector
- Search
- Sorting
- Pagination
- Good Accessibility

## Installation

`npm install table-p14`

## Usage

### On P14 App

In _src/pages/employees-list.jsx_ :

```js
import { useSelector } from 'react-redux'
import { employees } from '../features/employees'
import { Table } from 'table-p14'

export default function EmployeesList() {
  const employeesSelector = useSelector(employees)

  return (
    <div className="page-wrapper">
      <Table data={employeesSelector} />
    </div>
  )
}
```

#### Optional

As columns are already configured to work with P14 project, defining **columns** prop is not required

Here's how columns are represented in the default **columns** prop :

- **key** gives access to data object properties
- **header** defines rendered columns titles

```js
[
  { key: 'firstName', header: 'First Name' },
  { key: 'lastName', header: 'Last Name' },
  { key: 'startDate', header: 'Start Date' },
  { key: 'department', header: 'Department' },
  { key: 'birthDate', header: 'Date of Birth' },
  { key: 'street', header: 'Street' },
  { key: 'city', header: 'City' },
  { key: 'state', header: 'State' },
  { key: 'zip', header: 'Zip Code' },
]
```

If you want to change columns order or headers titles, make sure the new array passed in **columns** prop has unchanged key properties

### On another App

To install this package on another App, you need to pass a customized array in **columns** prop with key values matching objects data keys in string

For example, with this data array :

```js
[
  { title: 'Alien ', date: '1979', rating: '5' },
  { title: 'Blade Runner', date: '1982', rating: '5' },
  ...
]
```

You should set your columns array as following :

```js
[
  { key: 'title', header: 'Title' },
  { key: 'date', header: 'Release Date' },
  { key: 'rating', header: 'Our review' },
]
```

Finally, for dates sorting to work, be careful to include 'date' string in your key (case insensitive)
