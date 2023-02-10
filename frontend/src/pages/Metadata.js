import React from 'react'
import { useTable } from 'react-table'
import { useAuth } from "../context/auth";
import TableStyles from "./../stylesheets/table-styles"
import { Message } from "semantic-ui-react";
import { getMetadataQuery } from './../queries/queries'


function Table({
  columns,
  data,
  fetchData,
  // loading,
}) 
{
    //let happy = new URLSearchParams(useLocation().search)
    //let root = happy.get('root')
    //console.log('the root is ', root)    

    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            rows,   
            allColumns,
            setHiddenColumns,
        } = useTable(
        {
            columns,
            data,
        },
     )

    React.useEffect(() => {

        fetchData({ })
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    React.useEffect(
        () => {
            setHiddenColumns(
            columns.filter(column => !column.show).map(column => column.id)
            );
        },
        [columns, setHiddenColumns]
    );

  return (
    <>
      <div className="columnToggle">
        {allColumns.map(column => (
          <div key={column.id} className="columnToggle">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.label}
            </label>
          </div>
        ))}
      </div>
      <table {...getTableProps()}>
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
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>


    </>
  )
}

function MetadataTable(props) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'originalTitle',
        accessor: 'originalTitle',
        show: true,
        id: 'originalTitle',
        label: 'originalTitle',
        tableName: 'MetadataTable',

      },
      {
        Header: 'source',
        accessor: 'source',
        show: true,
        id: 'source',
        label: 'source',
        tableName: 'MetadataTable',

      },
 
    ], []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const fetchIdRef = React.useRef(0)
  const { client } = useAuth();

  async function getMetadata() {
     
    let res = {} 
    res = await client.query({
        query: getMetadataQuery,
        variables: {
            textFileId: 10,
        }
      })
      console.log(res.data)
      return res.data
  }
  


  const fetchData = React.useCallback(() => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        getMetadata()
        .then((data) => {
          let json = data.textfilemetadata[0].metadata
          let newdata = []
          newdata.push(JSON.parse(json))
          setData(newdata)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setData([])
          setLoading(false)
        })
      }
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
    <Message>Results for Metadata </Message>
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
      />
    </TableStyles>
    </>
  )
}

export default MetadataTable