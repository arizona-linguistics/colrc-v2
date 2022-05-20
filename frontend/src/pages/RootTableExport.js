import React from 'react'
import { useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy } from 'react-table'
import { useAuth } from "../context/auth";
import TableStyles from "../stylesheets/table-styles"
import { Button, Segment, Header, Message } from "semantic-ui-react";
import { getRootsQuery } from '../queries/queries'
import { handleErrors } from '../utils/messages';
import { useExportData } from 'react-table-plugins';
import { getExportFileBlob } from '../utils/ExportFileBlob';


function Table({
  columns,
  data,
  fetchData,
  loading,
}) {
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setHiddenColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    exportData,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
       }, // Pass our hoisted table state
      getExportFileBlob,
    },
    useSortBy,
    useExportData,
    usePagination,
  )



// Listen for changes in pagination and use the state to fetch our new data
React.useEffect(() => {
  fetchData({ pageIndex, pageSize, sortBy })
}, [fetchData, pageIndex, pageSize, sortBy])

React.useEffect(
  () => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  },
  [columns, setHiddenColumns]
);

  // Render the UI for your table
  return (
    <>
      <Segment>
        <Header as='h3'>Export All</Header>
        <Button color='blue'
          onClick={() => {
            exportData("csv", true);
          }}
        >
          to csv
        </Button>
        <Button color='blue'
          onClick={() => {
            exportData("xlsx", true);
          }}
        >
          to xlsx
        </Button>
        <Button color='blue'
          onClick={() => {
            exportData("pdf", true);
          }}
        >
          to pdf
        </Button>
        <Message>Export all columns and rows of this table to your selected format. Note that the export-all process may take several seconds to complete.</Message>
      </Segment>


      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}                 
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50, 100, 200 ].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function RootTableExport(props) {
  //console.log('my props.globalSearch is ', props.globalSearch)
  let history = useHistory()
 
  const columns = React.useMemo(
    () => [
      {
        Header: '√',
        width: 75,
        accessor: 'root',
        tableName: 'RootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'RootTable',
        id: 'number',
        show: true,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'RootTable',
        id: 'sense',
        show: true,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'RootTable',
        id: 'salish',
        show: true,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'RootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'RootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'RootTable',
        id: 'symbol',
        show: true,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'RootTable',
        id: 'grammar',
        show: true,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'RootTable',
        id: 'crossref',
        show: true,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'RootTable',
        id: 'variant',
        show: true,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'RootTable',
        id: 'cognate',
        show: true,
        label: 'Cognate',
      },
    ], []
  )
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const { client, setAuthTokens, user } = useAuth();

  async function getRoots(limit, offset, sortBy) {
    let res = {}
    if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
      res = await client.query({
        query: getRootsQuery,
        variables: { 
          limit: 10000,
          offset: 0,
          root_order: sortBy,
          where: { },
         }
      })
    }
    return res.data
  } 
 

 

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        getRoots(pageSize, pageSize * pageIndex)
        .then((data) => {
          let totalCount = data.roots_aggregate.aggregate.count
          setData(data.roots)
          setPageCount(Math.ceil(totalCount / pageSize))
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          handleErrors(error, {'logout': {'action': setAuthTokens, 'redirect': '/login'}})
          setData([])
          setPageCount(0)
          setLoading(false)
          history.push('./login')
        })
      }
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, setAuthTokens])

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </TableStyles>
  )
}

export default RootTableExport