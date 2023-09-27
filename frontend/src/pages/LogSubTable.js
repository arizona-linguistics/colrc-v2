import React from "react";
import {useTable} from "react-table";
import { formatCell } from '../utils/helpers'


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({columns, data})

  React.useEffect(
    () => {
      setHiddenColumns(
        columns.filter(column => column.hide).map(column => column.id)
      );
    },
    [columns, setHiddenColumns]
  );

  // Render the UI for your table
  return (
    <React.Fragment>
      <table className='logSubTable'{...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

function LogSubTable({ rowData, modifiedRows }) {
  const isUpdate = !!(modifiedRows !== null && rowData !== modifiedRows)
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id: 'before_or_after',
        accessor: (obj) => obj === rowData ? 'Before' : 'After',
        hide: !isUpdate
      },
      ...Object.keys(rowData).map(
        key => ({
          Header: modifiedRows && key in modifiedRows 
                  ? (<span style={{backgroundColor: "#88bbff"}}>{key}</span>) 
                  : key, 
          id: key, 
          accessor: (obj) => formatCell(obj[key] || rowData[key] || "NULL")
        })
    )], [])
  const [data] = React.useState(() => (isUpdate ? [rowData, modifiedRows] : [rowData]));
  
  return (
    <Table 
        columns={columns} 
        data={data}
      />
  );
}

export default LogSubTable;