import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useAuth } from "../context/auth";
import TableStyles from "../stylesheets/table-styles"
import { Icon, Message, Header } from "semantic-ui-react";
import { getBrowseRootQuery } from '../queries/queries'
import { handleErrors } from '../utils/messages';
import  BrowseList  from '../utils/BrowseList'

function Table({
  columns,
  data,
  fetchData,
}) 
{
  

    function DefaultColumnFilter({
      column: { filterValue, preFilteredRows, setFilter },
    }) {
      const count = preFilteredRows.length
    
      return (
        <input
          value={filterValue || ''}
          onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          placeholder={`Search ${count} records...`}
        />
      )
    }

  
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
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,   
            allColumns,
            setHiddenColumns,
            state: { pageIndex, pageSize }
      } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            defaultColumn,

        },

        useFilters,
        useSortBy,
        usePagination
     )

    let browseroot = new URLSearchParams(useLocation().search)
    let root = browseroot.get('root')
    React.useEffect(() => {
      fetchData(root)
    }, [fetchData, root])
    

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
      <BrowseList/>
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

function BrowseRootTable(props) {
    let history = useHistory()
    let browseroot = new URLSearchParams(useLocation().search)
    let browselabel = new URLSearchParams(useLocation().search)
    let root = browseroot.get('root')
    let label = browselabel.get('label')
    let where = {}
    if (root === "q%") {
      where = {"_and": [{"root": {"_ilike": "q%"}}, {"root": {"_nilike": "q'%"}}, {"root": {"_nilike": "qʷ%"}}]}     
    } 
    else if (root === "q'%") {
      where = {"_and": [{"root": {"_ilike": "q'%"}}, {"root": {"_nilike": "q'ʷ%"}}]}     
    }
    else if (root === "c%") {
      where = {"_and": [{"root": {"_ilike": "c%"}}, {"root": {"_nilike": "c'%"}}]}     
    }
    else if (root === "č%") {
      where = {"_and": [{"root": {"_ilike": "č%"}}, {"root": {"_nilike": "č'%"}}]}     
    }
    else if (root === "k%") {
      where = {"_and": [{"root": {"_ilike": "k%"}}, {"root": {"_nilike": "k'%"}}, {"root": {"_nilike": "kʷ%"}}]}     
    }
    else if (root === "l%") {
      where = {"_and": [{"root": {"_ilike": "l%"}}, {"root": {"_nilike": "l'%"}}]}     
    }
    else if (root === "m%") {
      where = {"_and": [{"root": {"_ilike": "m%"}}, {"root": {"_nilike": "m'%"}}]}     
    }
    else if (root === "n%") {
      where = {"_and": [{"root": {"_ilike": "n%"}}, {"root": {"_nilike": "n'%"}}]}     
    }
    else if (root === "p%") {
      where = {"_and": [{"root": {"_ilike": "p%"}}, {"root": {"_nilike": "p'%"}}]}     
    }
    else if (root === "t%") {
      where = {"_and": [{"root": {"_ilike": "t%"}}, {"root": {"_nilike": "t'%"}}]}     
    }
    else if (root === "w%") {
      where = {"_and": [{"root": {"_ilike": "w%"}}, {"root": {"_nilike": "w'%"}}]}     
    }
    else if (root === "x̣%") {
      where = {"_and": [{"root": {"_ilike": "x̣%"}}, {"root": {"_nilike": "x̣ʷ%"}}]}     
    }
    else if (root === "y%") {
      where = {"_and": [{"root": {"_ilike": "y%"}}, {"root": {"_nilike": "y'%"}}]}     
    }
    else if (root === "ʕ%") {
      where = {"_and": [{"root": {"_ilike": "ʕ%"}}, {"root": {"_nilike": "ʕʷ%"}}]}     
    }
    else { 
      where = {root: {_ilike: `${root}` }}
    }
  const updateColumns = React.useMemo(
    () => [
      {
        Header: '',
        disableFilters: true,
        sortable: false,
        show: true,
        width: 100,
        id: 'historyEditDelete',
        label: 'History/Edit/Delete',
        tableName: 'BrowseRootTable',
        Cell: ({row, original}) => (
          <div className="buttons">
            <Link 
              to={{
                pathname: "/roothistory",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="history" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/editroot",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini black icon button">
                <Icon name="edit" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/deleteroot",
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
        Header: '√',
        width: 75,
        accessor: 'root',
        tableName: 'BrowseRootTable',
        Cell: ({ row }) => <Link to={{pathname: "/exactroot", search:`?root=${row.original.root}`}} target="_blank">{row.original.root}</Link>,
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'BrowseRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'BrowseRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'BrowseRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'BrowseRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'BrowseRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      },
    ], []
  )

  const anonColumns = React.useMemo(
    () => [
      {
        Header: '√',
        width: 75,
        accessor: 'root',
        tableName: 'BrowseRootTable',
        Cell: ({ row }) => <Link to={{pathname: "/exactroot", search:`?root=${row.original.root}`}} target="_blank">{row.original.root}</Link>,
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'BrowseRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'BrowseRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'BrowseRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'BrowseRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'BrowseRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      },
    ], []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [location, setLocation] = React.useState()
  const fetchIdRef = React.useRef(0)
  const { client, setAuthTokens, user } = useAuth();

  async function getBrowseRoots(root) {
     let res = {} 
     res = await client.query({
        query: getBrowseRootQuery,
        variables: {
            where: where
        }
      })
      return res.data
    }


  const fetchData = React.useCallback(({where}) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) { 
        const Root = root   
        getBrowseRoots(Root)
        .then((data) => {
          setData(data.roots)
          setLocation(location)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location, root, setAuthTokens])

  let columns = {}
  if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) {
    columns = updateColumns
  } else {
    columns = anonColumns
  }

  return (
    <>
    <Message>
      <Header as='h4'>Browsing roots beginning with '{label}' | <Link to={{pathname: "/roots"}}>Return to full table</Link></Header> 
    </Message>
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

export default BrowseRootTable