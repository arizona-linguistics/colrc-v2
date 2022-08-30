import React from 'react';
import { Button, Input } from 'semantic-ui-react'
import matchSorter from 'match-sorter'

// {
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }

// Define a default UI for filtering

export function GlobalFilter({
    globalFilter,
    setGlobalFilter
  }) {

  return (
    <span>
      <label style={{marginRight: '10px'}}> Search all:</label>
      <Input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`enter a search term`}
        style={{
          fontSize: '1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
export function DefaultColumnFilter({
  pageCount, 
  state: { pageSize },
  column: { id, tableName, filterValue, setFilter },
  }) {
  // console.log(theHash)
  // const id = theHash.column.id
  // const tableName = theHash.column.tableName
  // const filterValue = theHash.column.filterValue
  // const preFilteredRows = theHash.column.preFilteredRows
  // const setFilter = theHash.column.setFilter
  // const pageSize = theHash.state.pageSize
  // const pageCount = theHash.pageCount
  // console.log('the pageSize is', pageSize)
  // console.log('the pageCount is', pageCount)
  //const count = preFilteredRows.length
  const count = pageSize * pageCount

  return (
    <Input
      value={filterValue || ''}
      display='inline-block'
      size='mini'
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`~ ${count}...`}
      style={{
        width: '125px',
        marginRight: '1rem',
      }}
    />
  )
}

// Define a default UI for filtering
export function NarrowColumnFilter({
  pageCount, 
  state: { pageSize },
  column: { id, tableName, filterValue, setFilter },
  }) {
  // console.log(theHash)
  // const id = theHash.column.id
  // const tableName = theHash.column.tableName
  // const filterValue = theHash.column.filterValue
  // const preFilteredRows = theHash.column.preFilteredRows
  // const setFilter = theHash.column.setFilter
  // const pageSize = theHash.state.pageSize
  // const pageCount = theHash.pageCount
  // console.log('the pageSize is', pageSize)
  // console.log('the pageCount is', pageCount)
  //const count = preFilteredRows.length
  const count = pageSize * pageCount

  return (
    <Input
      value={filterValue || ''}
      display='inline-block'
      size='mini'
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`~ ${count}...`}
      style={{
        width: '50px',
        marginRight: '1rem',
      }}
    />
  )
}

export function TinyColumnFilter({
  pageCount, 
  state: { pageSize },
  column: { id, tableName, filterValue, setFilter },
  }) {

  return (
    <Input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      style={{
        width: '0.5rem',
        marginRight: '0.5rem',
      }}
    />
  )
}



// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  selectValues,
  column: { filterValue, setFilter, id },
}) {
  console.log('my selectValues are ', selectValues)
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    // const options = new Set()
    // preFilteredRows.forEach(row => {
    //   options.add(row.values[id])
    // })
    const options = new Set()
    if (selectValues[id]) {
      return selectValues[id]
    } else {
      options.add("snarg")
      options.add("blarf")
      options.add("warp")
      return [...options.values()]
    }
  }, [id, selectValues])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <React.Fragment>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button onClick={() => setFilter(undefined)}>Off</Button>
    </React.Fragment>
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

// Define a custom filter filter function!
export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]], threshold: matchSorter.rankings.CONTAINS})
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export function SelectOrthographyFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add("R")
      options.add("S")
      options.add("N")
    })
    return [...options.values()]
  }, [preFilteredRows])
  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function ClientSelectFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])
  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}