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
  const count: number = table.getPageCount() * (table.getState() as any).pageSize;

  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      display='inline-block'
      size='mini'
      onChange={(value: string) => column.setFilterValue(value)}
      placeholder={`~ ${count}...`}
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
  const count: number = table.getPageCount() * (table.getState() as any).pageSize;

  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      size='mini'
      display='inline-block'
      onChange={(value: string) => column.setFilterValue(value)}
      placeholder={`~ ${count}...`}
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
  ...props
} : {
  value: string,
  onChange: ( value: string ) => void,
  debounce?: number
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
} & any ) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
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