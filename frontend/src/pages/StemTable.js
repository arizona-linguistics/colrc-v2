import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { sortReshape, filterReshape } from "./../utils/reshapers"
import DecoratedTextSpan from "./../utils/DecoratedTextSpan"
import TableStyles from "./../stylesheets/table-styles"
import { Icon, Button } from "semantic-ui-react";
import { getStemsQuery, getAnonStemsQuery } from './../queries/queries'
import { handleErrors } from '../utils/messages';

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  selectValues,
  globalSearch
}) {

  const { user } = useAuth();
  //console.log("Inside table, I have select values: ", selectValues)

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
      Filter: DefaultColumnFilter,       // Let's set up our default Filter UI
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
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
    //getToggleHideAllColumnsProps,
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
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, filters, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0, 
        globalFilter: ((globalSearch && globalSearch !== '') ? globalSearch : null)
      }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true,
      manualGlobalFilter: true,
      defaultColumn,
      filterTypes,
      //hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
      selectValues
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,   
  )


// Listen for changes in pagination and use the state to fetch our new data
React.useEffect(() => {
  fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter })
}, [fetchData, pageIndex, pageSize, sortBy, filters, globalFilter])

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
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              filters,
              globalFilter
            },
            null,
            2
          )}
        </code>
      </pre> */}
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
      <table {...getTableProps()} className="table">
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
            { (user && (user.roles.includes('update') || user.roles.includes('manager')))  &&
              (
                <Link 
                  to={{
                    pathname: "/addstem",
                  }}>
                  <Button animated='vertical' color='blue'>
                    <Button.Content hidden>Add Stem</Button.Content>
                    <Button.Content visible>
                      <Icon name='plus' />
                    </Button.Content>
                  </Button> 
                </Link> 
              )
            }
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
                <th {...column.getHeaderProps()} className="th">
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
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
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
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function StemTable(props) {
  let history = useHistory()

  const updateColumns = React.useMemo(
    () => [
      {
        Header: 'History/Edit/Delete',
        disableFilters: true,
        sortable: false,
        width: 100,
        show: true,
        id: 'historyEditDelete',
        label: 'History/Edit/Delete',
        tableName: 'StemTable',
        Cell: ({row, original}) => (
          <div className="buttons">
            <Link 
              to={{
                pathname: "/stemhistory",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="history" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/editstem",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini black icon button">
                <Icon name="edit" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/deletestem",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="close" />
              </button>              
            </Link>
          </div>
        )
      }, 
    {
        Header: 'Category',
        accessor: 'stem_category.value',
        Filter: SelectColumnFilter,
        tableName: 'StemTable',
        show: true,
        id: 'stem_category.value',
        label: 'Category'
      },
    {
        Header: 'Reichard',
        accessor: 'reichard',
        tableName: 'StemTable',
        Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        show: false,
        id: 'reichard',
        label: 'Reichard'
      },
    {
        Header: 'Doak',
        accessor: 'doak',
        tableName: 'StemTable',
        show: false,
        id: 'doak',
        label: 'Doak'
      },
    {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        tableName: 'StemTable',
        Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        show: true,
        id: 'nicodemus',
        label: 'Nicodemus'
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        filter: 'fuzzyText',
        tableName: 'StemTable',
        show: false,
        id: 'salish',
        label: 'Salish'
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'StemTable',
        show: true,
        id: 'english',
        label: 'English'
      },
    ], []
  )

  const anonColumns = React.useMemo(
    () => [         
        {
            Header: 'Category',
            accessor: 'stem_category.value',
            Filter: SelectColumnFilter,
            tableName: 'StemTable',
            show: true,
            id: 'stem_category.value',
            label: 'Category'
          },
        {
            Header: 'Reichard',
            accessor: 'reichard',
            tableName: 'StemTable',
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
            show: false,
            id: 'reichard',
            label: 'Reichard'
          },
        {
            Header: 'Doak',
            accessor: 'doak',
            tableName: 'StemTable',
            show: false,
            id: 'doak',
            label: 'Doak'
          },
        {
            Header: 'Nicodemus',
            accessor: 'nicodemus',
            tableName: 'StemTable',
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
            show: true,
            id: 'nicodemus',
            label: 'Nicodemus'
          },
          {
            Header: 'Salish',
            accessor: 'salish',
            filter: 'fuzzyText',
            tableName: 'StemTable',
            show: false,
            id: 'salish',
            label: 'Salish'
          },
          {
            Header: 'English',
            accessor: 'english',
            tableName: 'StemTable',
            show: true,
            id: 'english',
            label: 'English'
          },
    ], []
  )
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  //const [orderBy, setOrderBy] = React.useState([{'english': 'desc'}, {'nicodemus': 'asc'}])
  const fetchIdRef = React.useRef(0)
  const { client, user, setAuthTokens } = useAuth();

  async function getStems(limit, offset, sortBy, filters) {
    let res = {}
    if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
      res = await client.query({
        query: getStemsQuery,
        variables: { 
          limit: limit,
          offset: offset,
          stem_order: sortBy,
          where: filters,
         }
      })
    }
    else {
      res = await client.query({
        query: getAnonStemsQuery,
        variables: { 
          limit: limit,
          offset: offset,
          stem_order: sortBy,
          where: filters,
        }
      })
    }
    return res.data
  }  

  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const controlledSort = sortReshape(sortBy) 
        const controlledFilter = filterReshape(filters, globalFilter, ["english", "nicodemus", "salish", "reichard", "doak"])
        console.log(controlledFilter)
        // reset to first page when filters change
        // if (filters.length > 0) {
        //   pageIndex = 0
        // }
        getStems(pageSize, pageSize * pageIndex, controlledSort, controlledFilter)
        .then((data) => {
          let totalCount = data.stems_aggregate.aggregate.count
          setData(data.stems)
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
  }, [])

  let columns = {}
  if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) {
    columns = updateColumns
  } else {
    columns = anonColumns
  }

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        selectValues={props.selectValues}
        globalSearch={props.globalSearch}
      />
    </TableStyles>
  )
}

export default StemTable