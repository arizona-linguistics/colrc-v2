import React from 'react'
import { Link } from 'react-router-dom';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter} from 'react-table'
import { DefaultColumnFilter, GlobalFilter, SelectColumnFilter, fuzzyTextFilterFn } from '../utils/Filters';
import { sortTypes } from '../utils/Sorters';
import { Icon, Button } from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles"
import { includes } from 'lodash';

  
function UserListTable(props) {

 
  function Table({ 
    columns, 
    data,
    loading,
    selectValues,
    filterValues,
   }) {

    
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
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
        roleValue: (rows, ids, filterValue) => {
          return rows.filter(row => {
            return ids.some(role_value => {
              const rowValue = row.values[role_value]
              console.log('my rowValue is ', rowValue)
              let elements = rowValue.reduce(
                function(previousValue, currentValue) {
                  return previousValue.concat(currentValue.role.role_value)
                },
                []
              )
              console.log('the elements are ', elements)
              return elements.includes(filterValue)
            })
          })
        }
      }),
      []
    )


    const defaultColumn = React.useMemo(
      () => ({
        Filter: DefaultColumnFilter, // Let's set up our default Filter UI
      }),
      []
    );
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
      page,
      state,
      preFilteredRows,
      preGlobalFilteredRows,
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      visibleColumns,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize, filters, globalFilter }
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes,
        filterValues,
        sortTypes,
        selectValues,
      },
      useGlobalFilter,
      useFilters,
      useSortBy,
      usePagination,
    )

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
              filterValues,
              filters,
              globalFilter,
            },
            null,
            2
          )}
        </code>
      </pre>  */}
      <table className="table" {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length}>
                <Link 
                  to={{
                    pathname: "/adduser",
                  }}>
                  <Button animated='vertical' color='blue'>
                    <Button.Content hidden>Add User</Button.Content>
                    <Button.Content visible>
                      <Icon name='plus' />
                    </Button.Content>
                  </Button> 
                </Link> 
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
      
  //const userData = getUsers()
  const userData = props.userListData
  // const Roles = ({ values }) => {
  //   return (
  //     <>
  //       {values.map(function( user) {
  //         return user.role.role_value;
  //       }).join(',')}
  //     </>
  //   );
  // };


  const Roles = ({ values }) => {
    return(
      <>
        {
          values.map(function(user) {
            return <div key={user.role.id} className="role">{user.role.role_value}</div>;
          })
        }
      </>
    )
  }

 
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        disableFilters: true,
        sortable: false,
        width: 100,
        show: true,
        id: 'manageUser',
        label: 'Manage',
        tableName: 'UserListTable',
        Cell: ({row, original}) => (
          <div className="buttons">
            <Link 
              to={{
                pathname: "/edituser",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini black icon button">
                <Icon name="edit" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/userhistory",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="history" />
              </button>              
            </Link>
          </div>
        )
      }, 
      {
        Header: 'First',
        accessor: 'first'
      },
      {
        Header: 'Last',
        accessor: 'last'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Roles',
        id: 'roles',
        accessor: 'user_roles',
        Cell: ({ cell: { value }}) => <Roles values={value} />,
        sortType:'customRoleSort',
        Filter: SelectColumnFilter,
        filter: 'roleValue',
      },
    ],
    []
  )


  return (
          <TableStyles>
            <Table 
              columns={columns} 
              data={userData}
              globalSearch={props.globalSearch}
              selectValues={props.selectValues}
            />
          </TableStyles>

  )

}

export default UserListTable;