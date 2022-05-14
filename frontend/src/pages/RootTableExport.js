import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { GlobalFilter, fuzzyTextFilterFn, NarrowColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { sortReshape, filterReshape } from "../utils/reshapers"
import TableStyles from "../stylesheets/table-styles"
import { Icon, Button, Segment, Header } from "semantic-ui-react";
import { getRootsQuery } from '../queries/queries'
import { handleErrors } from '../utils/messages';
import  BrowseList  from '../utils/BrowseList'
import { path_segment_permissions } from "../access/permissions";
import { useExportData } from 'react-table-plugins';
import Papa from "papaparse";
import * as XLSX from 'xlsx/xlsx.mjs';
import JsPDF from "jspdf";
import "jspdf-autotable";



function Table({
  columns,
  data,
  fetchData,
  loading,
  selectValues,
  globalSearch
}) {

  const { user, authTokens } = useAuth();
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

  // produce various exports using react-table-plugins
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;
  
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }
  
  
  function getExportFileBlob({ columns, data, fileType, fileName }) {
    if (fileType === "csv") {
      // CSV example  :: note that excel doesn't understand this is utf-8, but notepad does
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    } else if (fileType === "xlsx") {
      // XLSX example
  
      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => { 
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });
  
      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
  
      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns.map((column) => column.exportValue);
      const doc = new JsPDF('landscape');
      doc.autoTable({
        head: [headerNames],
        body: data,
        margin: { top: 20 },
        styles: {
          minCellHeight: 9,
          halign: "left",
          valign: "top",
          fontSize: 10,
        },
      });
      doc.save(`${fileName}.pdf`);
  
      return false;
    }
  
    // Other formats goes here
    return false;
  }

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
    exportData,
    // Get the state from the instance
    state: { sortBy, filters, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
        globalFilter: ((globalSearch && globalSearch !== '') ? globalSearch : null)
       }, // Pass our hoisted table state
      defaultColumn,
      filterTypes,
      //hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
      selectValues,
      getExportFileBlob,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExportData,
  )



// Listen for changes in pagination and use the state to fetch our new data
React.useEffect(() => {
  fetchData({ sortBy, filters, globalFilter })
}, [fetchData, sortBy, filters, globalFilter])

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
      <BrowseList/>
        {authTokens && user && intersectionWith(path_segment_permissions['canExport'], user.roles, isEqual).length >= 1 ? 
          (<Segment><Header as='h3'>Exports</Header>
            <Button color='blue'
              onClick={() => {
                exportData("csv", true);
              }}
            >
              all to csv
            </Button>
            <Button basic color='blue'
              onClick={() => {
                exportData("csv", false);
              }}
            >
              view to csv
            </Button>
            <Button color='blue'
              onClick={() => {
                exportData("xlsx", true);
              }}
            >
              all to xlsx
            </Button>
            <Button basic color='blue'
              onClick={() => {
                exportData("xlsx", false);
              }}
            >
              view to xlsx
            </Button>
            <Button color='blue'
              onClick={() => {
                exportData("pdf", true);
              }}
            >
              all to pdf
            </Button>{" "}
            <Button basic color='blue'
              onClick={() => {
                exportData("pdf", false);
              }}
            >
              view to pdf
            </Button>
          </Segment>) : (<div></div>)
        }
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
            { (user && (user.roles.includes('update') || user.roles.includes('manager')))  &&
              (
                <Link 
                  to={{
                    pathname: "/addroot",
                  }}>
                  <Button animated='vertical' color='blue'>
                    <Button.Content hidden>Add Root</Button.Content>
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
        </tbody>
      </table>
    </>
  )
}

function RootTable(props) {
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
  const fetchIdRef = React.useRef(0)
  const { client, setAuthTokens, user } = useAuth();

  async function getRoots(sortBy, filters) {
    let res = {}
    if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
      res = await client.query({
        query: getRootsQuery,
        variables: { 
          root_order: sortBy,
          where: filters,
         }
      })
    }
    return res.data
  } 
 

 

  const fetchData = React.useCallback(({ sortBy, filters, globalFilter }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const controlledSort = sortReshape(sortBy) 
        const controlledFilter = filterReshape(filters, globalFilter, ["root", "variant", "crossref", "cognate", "grammar", "english", "nicodemus", "salish"])
        getRoots(controlledSort, controlledFilter)
        .then((data) => {
          setData(data.roots)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          handleErrors(error, {'logout': {'action': setAuthTokens, 'redirect': '/login'}})
          setData([])
          setLoading(false)
          history.push('./login')
        })
      }
    }, 1000)
  }, [history, setAuthTokens])

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        selectValues={props.selectValues}
        globalSearch={props.globalSearch}
      />
    </TableStyles>
  )
}

export default RootTable