import React from "react";
import { useHistory } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { /*DefaultColumnFilter,*/ /*GlobalFilter,*/ fuzzyTextFilterFn, /*NarrowColumnFilter*/ } from '../utils/Filters'
import { GlobalFilter, AutoDetectFilter } from "./BibliographyComponent";
import { useAuth } from "../context/auth";
import { getAllBibliographyQuery } from '../queries/queries'
import { Button, Grid, Message, Label, Segment} from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles"
import { handleErrors } from '../utils/messages';
import { useExportData } from 'react-table-plugins';
import { getExportFileBlob } from '../utils/ExportFileBlob';

/**
 * This function constructs a table used for displaying text data provided by the BibliographyTable function.
 * @param {*} columns Each of the columns of the DataGrid
 * @param {*} data Data to be used in the table
 * @param {*} fetchData Collcts new data for the table 
 * @param {*} loading Loading indicator, a boolean
 * @param {*} defaultVisibility Determines the visibility of the columns
 * @returns A rendered UI for the table
 */
function Table({
  columns,
  data,
  fetchData,
  loading,
  defaultVisibility,
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
      filter: 'defaultColumnFilter',       // Let's set up our default Filter UI
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 500, // maxWidth is only used as a limit for resizing
    }),
    []
  )

  const [ columnVisibility, setColumnVisibility ] = React.useState(defaultVisibility);
  const [ columnFilters, setColumnFilters ] = React.useState([]);
  const [ globalFilter, setGlobalFilter ] = React.useState('');

  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: defaultColumn,
    initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [{id: 'author'}, {id: 'year', desc: true }]
    }
  });
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({  })
  }, [fetchData])

  // set up the filenames for exported files from this page
  function getExportFileName({fileType, all}) {
    let fileName = ''
    fileName = (all === true) ? 'bib_sel_rows_all_cols' : 'bib_sel_rows_sel_cols'
    return fileName
  }

  // create a hook to show or hide material from the return, set to hide
  const [show, setShow] = React.useState(false);

  // Render the UI for your table
  return (
    <>
<>
      <Grid.Row>
        <Button size='mini' basic color='blue'
          type="button"
          onClick={() => setShow(!show)}
        >
          show/hide export options
        </Button>
      </Grid.Row>
      { show ? 
        ( <>
          <Message>Export Bibliography</Message>         
          <Grid columns={2}>
            <Grid.Column>
              <Segment>
                <Label as='a' color='blue' ribbon>
                  selected columns only
                </Label>
                <Button.Group size='mini'>
                  <Button 
                    onClick={() => {
                      // exportData("csv", false);
                    }}>
                      to csv
                  </Button>
                  <Button.Or />
                  <Button color='blue'
                    onClick={() => {
                      // exportData("xlsx", false);
                    }}>
                    to xlsx
                  </Button>
                  <Button.Or />
                  <Button 
                    onClick={() => {
                      // exportData("pdf", false);
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
                      // exportData("csv", true);
                    }}>
                    to csv
                  </Button>
                  <Button.Or />
                  <Button color='blue'
                    onClick={() => {
                      // exportData("xlsx", true);
                    }}>
                    to xlsx
                  </Button>
                  <Button.Or />
                  <Button 
                    onClick={() => {
                      // exportData("pdf", true);
                    }}>
                    to pdf
                  </Button>
                </Button.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </>) : null} </>
      <div className="columnToggle">
        {tableInstance.getAllColumns().map(column => (
          <div key={column.id} className="columnToggle">
            <label>
              <input {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }} />{' '}
              {column.columnDef.label}
            </label>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th
              colSpan={tableInstance.getVisibleLeafColumns().length}
            >
              <GlobalFilter
                globalFilter={tableInstance.getState.globalFilter}
                setGlobalFilter={tableInstance.setGlobalFilter}
              />
            </th>
          </tr>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                <th key={header.id} colSpan={header.colSpan}>
                  <span
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' ▼',
                      desc: ' ▲'
                    }[header.column.getIsSorted()] ?? null}
                  </span>
                  <div>
                    {header.column.getCanFilter() ? (
                      <AutoDetectFilter
                        column={header.column}
                        table={tableInstance}
                      />
                    ) : null}
                  </div>
                </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                // Column visibility tutorial
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {tableInstance.getState().pageSize} of ~{tableInstance.getPageCount() * tableInstance.getState().pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => tableInstance.setPageIndex(0)} disabled={!tableInstance.getCanPreviousPage()}>
          {'<<'}
        </button>{' '}
        <button onClick={() => tableInstance.previousPage()} disabled={!tableInstance.getCanPreviousPage()}>
          {'<'}
        </button>{' '}
        <button onClick={() => tableInstance.nextPage()} disabled={!tableInstance.getCanNextPage()}>
          {'>'}
        </button>{' '}
        <button onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)} disabled={!tableInstance.getCanNextPage()}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {tableInstance.getState().pagination.pageIndex + 1} of {tableInstance.getPageOptions().length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={tableInstance.getState().pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              tableInstance.setPageIndex(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={tableInstance.getState().pageSize}
          onChange={e => {
            tableInstance.setPageSize(Number(e.target.value))
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

/**
 * Provides the data needed to construct the BibliographyTable using the Table function
 * @param {*} props Used to access properties of the Table as it is used (not used)
 * @returns A rendered BibliographyTable
 */
function BibliographyTable(props) {
  let history = useHistory()
    const defaultVisibility = { author: true, year: true, title: true, reference: false, link: false};

    const columns = React.useMemo(
      () => [
          {
            header: 'Author',
            accessorKey: 'author',
            id: 'author',
            label: 'Author',
            show: defaultVisibility.author,
            filterFn: 'includesString',
          },
          {
            header: 'Year',
            accessorKey: 'year',
            id: 'year',
            label: 'Year',
            filter: 'narrowColumnFilter',
            show: defaultVisibility.year,
            width: 55,
            filterFn: 'includesString',
          },
          {
            header: 'Title',
            accessorKey: 'title',
            id: 'title',
            label: 'Title',
            show: defaultVisibility.title,
            width: 250,
            filterFn: 'includesString',
          },
          {
            header: 'Reference',
            accessorKey: 'reference',
            id: 'reference',
            label: 'Reference',
            show: defaultVisibility.reference,
            filterFn: 'includesString',
          },
          {
            header: 'Link',
            accessorKey: 'linktext',
            cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.linktext}</a>,
            show: defaultVisibility.link,
            id: 'link',
            label: 'Link (if available online)',
            filterFn: 'includesString',
          },
      ], []
  )
  
  
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const { client, setAuthTokens } = useAuth();
  
  
  async function getBibliography( offset, sortBy, filters) {
      let res = {}
      res = await client.query({
        query: getAllBibliographyQuery,
        variables: { 
          offset: offset,
          bibliographies_order: sortBy,
          where: filters,
          }
      })
      return res.data
    }  
  
  
  const fetchData = React.useCallback(({  pageSize, pageIndex, sortBy, filters, globalFilter }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        getBibliography(pageIndex, sortBy, filters)
        .then((data) => {
          let totalCount = data.bibliographies_aggregate.aggregate.count
          setData(data.bibliographies)
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
          defaultVisibility={defaultVisibility}
        />
      </TableStyles>
    )
  }
  

export default BibliographyTable