# OCR-Table-P14

This student project is a React Table library converted from this [jQuery plugin](https://github.com/DataTables/DataTables.git).

## Technologies

- JS
- React

## Dependencies

- PropTypes

## Features

- Sort (texts, numbers and dates)
- Entries selection
- Pagination with info text
- Search
- Good accessibility

## Installation

`npm install ocr-table-p14`

## Usage

### Define data prop

```js
[
  { title: 'Alien ', releaseDate: '09/12/1979', rating: '5' },
  { title: 'Blade Runner', releaseDate: '09/15/1982', rating: '5' },
  { title: 'Brazil', releaseDate: '12/18/1985', rating: '5' },
  { title: 'Soylent Green', releaseDate: '04/19/1973', rating: '5' },
]
```

**data** is an array of objects representing rows.

Each property refers to a column.

To make dates sorting work, just be careful to :

- Include _date_ (case insensitive : e.g., _releaseDate_) in property key
- Format values as _MM/DD/YYYY_ strings

### Define columns prop

Provided you have passed the previous **data** array, you should set your **columns** array as following :

```js
[
  { key: 'title', header: 'Title' },
  { key: 'releaseDate', header: 'Release Date' },
  { key: 'rating', header: 'Our review' },
]
```

- **key** serves as accessors providing access to data object properties
- **header** defines corresponding columns titles

### Place Table in your App

```js
import { Table } from 'ocr-table-p14'

function App() {

  const dataArray = [
    { title: 'Alien ', releaseDate: '09/12/1979', rating: '5' },
    { title: 'Blade Runner', releaseDate: '09/15/1982', rating: '5' },
    { title: 'Brazil', releaseDate: '12/18/1985', rating: '5' },
    { title: 'Soylent Green', releaseDate: '04/19/1973', rating: '5' },
  ]

  const columnsArray = [
    { key: 'title', header: 'Title' },
    { key: 'releaseDate', header: 'Release Date' },
    { key: 'rating', header: 'Our review' },
  ]

  return <Table data={dataArray} columns={columnsArray} />
}
```

### Update live data

When data is updated, **ocr-table-p14** will render last addition without re-rendering previous rows.

Just make sure one object is added at a time to render it live.
