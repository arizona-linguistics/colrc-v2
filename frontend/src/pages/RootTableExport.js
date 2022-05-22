import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, NarrowColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import TableStyles from "../stylesheets/table-styles"
import { Button, Segment, Header, Grid, Label } from "semantic-ui-react";
import { getAllRootsQuery } from '../queries/queries'
import { handleErrors } from '../utils/messages';
import { useExportData } from 'react-table-plugins';
import { getExportFileBlob } from '../utils/ExportFileBlob';

function Table({
  columns,
  data,
  fetchData,
  loading,
  globalSearch,
}) {
  
  //console.log("Inside table, I have select values: ", selectValues)
  console.log("Inside table, I have globalSearch ", globalSearch)

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )


  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,   
      minWidth: 50, // minWidth is only used as a limit for resizing
      width: 200, // width is used for both the flex-basis and flex-grow
      maxWidth: 500, // maxWidth is only used as a limit for resizing
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    allColumns,
    setHiddenColumns,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
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
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
        pageSize: 10,
        globalFilter: ((globalSearch && globalSearch !== '') ? globalSearch : null)
       }, // Pass our hoisted table state
      defaultColumn,
      filterTypes,
      getExportFileBlob,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExportData,
    usePagination,
  )



// Listen for changes in pagination and use the state to fetch our new data
React.useEffect(() => {
  fetchData({  })
}, [fetchData])

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
      <div>
        <Header as="h3">Export all rows or <Link to={{pathname: "/roots"}}>go back to roots table</Link></Header>
        <Grid columns={2}>
          <Grid.Column>
            <Segment>
              <Label as='a' color='blue' ribbon>
                only selected columns
              </Label>
              <Button.Group size='mini'>
                <Button 
                  onClick={() => {
                    exportData("csv", false);
                  }}>
                    to csv
                </Button>
                <Button.Or />
                <Button color='blue'
                  onClick={() => {
                    exportData("xlsx", false);
                  }}>
                  to xlsx
                </Button>
                <Button.Or />
                <Button 
                  onClick={() => {
                    exportData("pdf", false);
                  }}>
                  to pdf
                </Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Label as='a' color='blue' ribbon>
                all columns 
              </Label>
              <Button.Group size='mini'>
                <Button onClick={() => {
                    exportData("csv", true);
                  }}>
                  to csv
                </Button>
                <Button.Or />
                <Button color='blue'
                  onClick={() => {
                    exportData("xlsx", true);
                  }}>
                  to xlsx
                </Button>
                <Button.Or />
                <Button 
                  onClick={() => {
                    exportData("pdf", true);
                  }}>
                  to pdf
                </Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
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
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
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
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
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
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{pageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
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
          {[10, 20, 30, 40, 50, 100, 200].map(pageSize => (
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
        Filter: NarrowColumnFilter,
        accessor: 'root',
        Cell: ({ row }) => <Link to={{pathname: "/exactroot", search:`?root=${row.original.root}`}}>{row.original.root}</Link>,
        tableName: 'RootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        Filter: NarrowColumnFilter,
        accessor: 'number',
        tableName: 'RootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        Filter: NarrowColumnFilter,
        accessor: 'sense',
        tableName: 'RootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'RootTable',
        id: 'salish',
        show: false,
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
        Filter: NarrowColumnFilter,
        tableName: 'RootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        Filter: NarrowColumnFilter,
        tableName: 'RootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'RootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'RootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'RootTable',
        id: 'cognate',
        show: false,
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



  async function getAllRoots(offset, sortBy, filters) {
    let res = {}
    if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
      res = await client.query({
        query: getAllRootsQuery,
        variables: { 
          offset: offset,
          root_order: sortBy,
          where: filters,
         }
      })
    }
    return res.data
  } 



  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter}) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        getAllRoots(pageIndex, sortBy, filters)
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