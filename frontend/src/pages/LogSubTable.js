import React from "react";
import { useTable } from "react-table";
import { formatCellValue } from '../utils/helpers'
import { getRowHistoryQuery } from './../queries/queries'
import { useAuth } from "../context/auth";



function Table({ columns, data, fetchData, getCellProps }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({columns, data, getCellProps})

  // I don't know enough about React to know if this is necessary, 
  //  but I'm too scared to deal with async stuff in a different way
  React.useEffect(() => {fetchData({})}, [])

  React.useEffect(
    () => {
      setHiddenColumns(
        columns.filter(column => column.hide).map(column => column.id)
      );
    },
    [columns]
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
                    return <td {...cell.getCellProps([getCellProps(cell)])}>{cell.render('Cell')}</td>
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

function LogSubTable({ rowData, modifiedRows, tableName }) {
  function getCellProps(cell) {
    var header = cell.column.key
    var modifiedRows = cell.row.original.changed_fields

    if (modifiedRows !== null && header in modifiedRows) {
      return {bgcolor: '#5e97e0'}
    }
    return {}
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Action',
        id: 'action',
        accessor: 'action'
      },
      {
        Header: 'Actor',
        id: 'user',
        accessor: (row) => row.audit_user[0]?.first ?? "N/A"
      },
      ...Object.keys(rowData).map(
        key => ({
          Header: key,
          key: key,
          id: "rd_" + key, 
          accessor: (row) => (row.changed_fields !== null ? row.changed_fields[key] : false) || row.row_data[key],
          Cell: ({ value }) => formatCellValue(value ?? "N/A (COLUMN DOES NOT EXIST)"),
        })
      ),
    ], [])
  
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { client } = useAuth();

  async function getLog() {
    var res = await client.query({
      query: getRowHistoryQuery,
      variables: { 
        row_contains: {id: rowData.id},
        table_name: tableName
      }
    })
    return res.data
  }  

  const fetchData = React.useCallback(({}) => {
    setLoading(true)
    getLog()
    .then((data) => {
      console.log(data) 
      setData(data.audit_logged_actions)
      setLoading(false)
    })
  })

  return (
    <Table 
        columns={columns} 
        data={data}
        fetchData={fetchData}
        getCellProps={getCellProps}
      />
  );
}

export default LogSubTable;