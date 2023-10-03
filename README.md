# OCR-Table-P14 Student Project

**OCR-Table-P14** is a React Table library converted from this [jQuery plugin](https://github.com/DataTables/DataTables.git) and intended to work with [P14 App](https://github.com/NC81/NicolasCandeli_14_08092023.git).
It can also work on any React App provided _columns_ prop is [properly configured](#on-another-app).

## Technologies

- JS
- React

## Dependencies

- PropTypes

## Features

- Entries selection
- Searching
- Sorting (texts, numbers and dates)
- Pagination
- Good accessibility

## Installation

`npm install ocr-table-p14`

## Usage

### On P14 App

In _src/pages/employees-list.jsx_ :

```js
import { useSelector } from 'react-redux'
import { employees } from '../features/employees'
import { Table } from 'ocr-table-p14'

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

As columns are already configured with a **default** prop for [P14 App](https://github.com/NC81/NicolasCandeli_14_08092023.git), defining ***columns*** prop is not required.

Here's how default columns look like :

- ==key== gives access to data object properties
- ==header== defines rendered columns titles

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

If you want to change columns order or headers titles, make sure to pass a new array in ***columns*** prop with unchanged ==key== properties.

```js
<Table data={employeesSelector} columns={newArray} />
```

### On another App

To install this package on another App, you need to pass a customized array in ***columns*** prop with ==key== values matching data keys in string.

For example, with this data array :

```js
[
  { title: 'Alien ', releaseDate: '09/12/1979', rating: '5' },
  { title: 'Blade Runner', releaseDate: '09/15/1982', rating: '5' },
  ...
]
```

You should set your columns array as following :

```js
[
  { key: 'title', header: 'Title' },
  { key: 'releaseDate', header: 'Release Date' },
  { key: 'rating', header: 'Our review' },
]
```

Finally, for dates sorting to work, be careful to :
- Include _date_ (case insensitive, e.g., _release**Date**_) in data property key and corresponding columns ==key== value
- Format values as _MM/DD/YYYY_ strings
