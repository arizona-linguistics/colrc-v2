import React from 'react'
import { useHistory } from 'react-router-dom';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getAudioSetsQuery } from './../queries/queries'
import AudioPlayer from '../utils/AudioPlayer';
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "./../stylesheets/table-styles"
import { handleErrors } from '../utils/messages';

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  selectValues, 
}) {

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
    page,
    rows,
    state,
    allColumns,
    setHiddenColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    visibleColumns,
    prepareRow,
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
                        ? '▲'
                        : '▼'
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}

          <tr>  
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10"> Loading... </td>
            ) : (
              <td colSpan="10">
                Showing {page.length} of ~{pageCount * pageSize} results
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


function AudioTable(props) {
  let history = useHistory()

  const columns = React.useMemo(
    () => [
      {
        Header: 'Audio',
        id: 'audio',
        accessor: 'audiosets_audiofiles', 
        label: 'Audio',
        show: true,
        //Cell: ({ row }) => <span>{JSON.stringify(row.original)}</span>,
        Cell: ({ row }) => (<AudioPlayer id={row.original.id} title={row.original.title} speaker={row.original.speaker} sources={row.original.audiosets_audiofiles} />)
      }, 
      {
        Header: 'Title',
        accessor: 'title',
        tableName: 'AudioTable',
        show: true,
        id: 'title',
        label: 'Title'
      },
      {
        Header: 'Speaker',
        accessor: 'speaker',
        tableName: 'Audio',
        show: true,
        id: 'speaker',
        label: 'Speaker'
      },
      {
        Header: 'Text',
        accessor: 'text.title',
        tableName: 'Audio',
        show: false,
        id: 'text',
        label: 'Text'
      },
      {
        Header: 'Cycle',
        accessor: 'text.cycle',
        tableName: 'Audio',
        show: false,
        id: 'cycle',
        label: 'Cycle'
      }
    ], []
  )


// We'll start our table without any data
const [data, setData] = React.useState([])
const [loading, setLoading] = React.useState(false)
const [pageCount, setPageCount] = React.useState(0)
const fetchIdRef = React.useRef(0)
const { client, setAuthTokens } = useAuth();


async function getAudios(limit, offset, sortBy, filters) {
    let res = {}
    res = await client.query({
      query: getAudioSetsQuery,
      variables: { 
        limit: limit,
        offset: offset,
        order: sortBy,
        where: filters,
        }
    })
    return res.data
  }  


const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
  // This will get called when the table needs new data


  // Give this fetch an ID
  const fetchId = ++fetchIdRef.current

  // Set the loading state
  setLoading(true)

  // We'll even set a delay to simulate a server here
  setTimeout(() => {
    if (fetchId === fetchIdRef.current) {
      const controlledSort = sortReshape(sortBy) 
      const controlledFilter = filterReshape(filters, globalFilter, [])
      getAudios(pageSize, pageSize * pageIndex, controlledSort, controlledFilter)
      .then((data) => {
        let totalCount = data.audiosets_aggregate.aggregate.count
        setData(data.audiosets)
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

export default AudioTable