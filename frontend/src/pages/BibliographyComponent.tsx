import React from "react"
import { Input } from "semantic-ui-react"
import { Column, ColumnDef, FilterFn, Table } from "@tanstack/react-table"


export function GlobalFilter({
  globalFilter,
  setGlobalFilter
} : { 
  globalFilter: any,
  setGlobalFilter: any }) {


  return (
    <span>
      <label style={{marginRight: '10px'}}> Search all:</label>
      <DebouncedInput
        value={globalFilter || ''}
        onChange={(value: string) => setGlobalFilter(value) }
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
  column,
  table,
} : {
  column: Column<any, unknown>
  table: Table<any>
}) {

  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      table={table}
      type="text"
      value={(columnFilterValue ?? '') as string}
      display='inline-block'
      size='mini'
      onChange={(value: string) => column.setFilterValue(value)}
      style={{
        width: '125px',
        marginRight: '1rem',
      }}
    />
  )
}

export function NarrowColumnFilter({
  column,
  table,
} : {
  column: Column<any, unknown>
  table: Table<any>
}) {
  // count is a number
  // const count: number = table.getPageCount() * (table.getState() as any).pageSize;

  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      table={table}
      type="text"
      value={(columnFilterValue ?? '') as string}
      size='mini'
      display='inline-block'
      onChange={(value: string) => column.setFilterValue(value)}
      style={{
        width: '50px',
        marginRight: '1rem',
      }}
    />
  )
}

// From Tanstack Filtered Table Example
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  table,
  ...props
} : {
  value: string,
  onChange: ( value: string ) => void,
  debounce?: number
  table?: Table<any>
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
} & any ) {
  const [value, setValue] = React.useState(initialValue);
  let count: number = -1;
  if (table) {
    count = table.getPageCount() * (table.getState() as any).pageSize;
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    // <div
    // {...(count === -1) ? (
      <Input {...props} value={value} placeholder={(count===-1)?`enter search term` : `~ ${count}...`} onChange={e => setValue(e.target.value)} />
    // ) : (
      // <Input {...props} value={value} placeholder={`~ ${count}...`} onChange={e => setValue(e.target.value)} />
    // )} />
  )
}

export function AutoDetectFilter({
  column,
  table
} : {
  column: Column<any, unknown> & { columnDef: {filter: string }},
  table: Table<any>
}) {
  return React.useMemo(() => {
    if (column.columnDef.filter === 'narrowColumnFilter') {
      return NarrowColumnFilter({column, table})
    } else if (column.columnDef.filter === 'defaultColumnFilter') {
      return DefaultColumnFilter({column, table})
    }
    return ''
  }, [column.columnDef.filter])
}