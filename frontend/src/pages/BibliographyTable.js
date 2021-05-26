import React from 'react'
import { Link } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, NarrowColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getBibliographyQuery } from '../queries/queries'
import { sortReshape, filterReshape } from "../utils/reshapers"
import TableStyles from "../stylesheets/table-styles"
import { Icon, Button } from "semantic-ui-react";

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  globalSearch
}) {

  const { user } = useAuth();

  //console.log("Inside table, I have select values: ", selectValues)
  //console.log("Inside table, I have a globalSearch ", globalSearch)

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
        sortBy: [{ id: 'author'}, { id: 'year', desc: true }]
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
      //selectValues
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,   
  )

  console.log('filters ', filters.map(f => {
    if (f.id === "salish") {
      return f.value
    } else {
      return null
    }
  }))

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
      {/* <SimpleKeyboard /> */}
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


function BibliographyTable(props) {

    const columns = React.useMemo(
      () => [
          {
            Header: 'Author',
            accessor: 'author',
            id: 'author',
            label: 'Author',
            show: true,
          },
          {
            Header: 'Year',
            accessor: 'year',
            id: 'year',
            label: 'Year',
            Filter: NarrowColumnFilter,
            show: true,
            width: 55,
          },
          {
            Header: 'Title',
            accessor: 'title',
            id: 'title',
            label: 'Title',
            show: true,
            width: 250,
          },
          {
            Header: 'Reference',
            accessor: 'reference',
            id: 'reference',
            label: 'Reference',
            show: false,
          },
          {
            Header: 'Link',
            accessor: 'linktext',
            Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.linktext}</a>,
            show: false,
            id: 'link',
            label: 'Link (if available online)'
          },
      ], []
  )
  
  
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const { client } = useAuth();
  
  
  async function getBibliography(limit, offset, sortBy, filters) {
      let res = {}
      res = await client.query({
        query: getBibliographyQuery,
        variables: { 
          limit: limit,
          offset: offset,
          bibliographies_order: sortBy,
          where: filters,
          }
      })
      return res.data
    }  
  
  
  const fetchData = React.useCallback(({  pageSize, pageIndex, sortBy, filters, globalFilter }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.
  
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current
  
    // Set the loading state
    setLoading(true)
  
    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const controlledSort = sortReshape(sortBy) 
        const controlledFilter = filterReshape(filters, globalFilter, [])
        getBibliography(pageSize, pageSize * pageIndex, controlledSort, controlledFilter)
        .then((data) => {
          let totalCount = data.bibliographies_aggregate.aggregate.count
          setData(data.bibliographies)
          setPageCount(Math.ceil(totalCount / pageSize))
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setData([])
          setPageCount(0)
          setLoading(false)
        })
      }
    }, 1000)
  }, [])
  
  
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
  

export default BibliographyTable