import React from "react";
import {useTable} from "react-table";


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({columns, data})

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
  const columns = React.useMemo(
    () => Object.keys(rowData).map(
            key => ({
              Header: modifiedRows && key in modifiedRows ? (<mark>{key}</mark>) : key, 
              id: key, 
              accessor: (obj) => obj[key] || "NULL"}
            )
    ), [])
  const [data] = React.useState(() => [rowData]);

  return (
    <Table 
        columns={columns} 
        data={data}
      />
  );
}

export default LogSubTable;