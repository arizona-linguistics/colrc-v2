import React from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getUsersQuery } from '../queries/queries'
import { sortReshape, filterReshape } from "../utils/reshapers"
import TableStyles from "../stylesheets/table-styles"
import { Grid, Segment } from 'semantic-ui-react';

  
function UserListTable(props) {
 
  function Table({ 
    columns, 
    data,
    fetchData,
    loading,
   }) {

    const filterTypes = React.useMemo(
      () => ({
        fuzzyText: fuzzyTextFilterFn,
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        }
      }),
      []
    );
  
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
      state: { pageIndex, pageSize, sortBy, filters, globalFilter }
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes,
      },
      useGlobalFilter,
      useFilters,
      useSortBy,
      usePagination,
    )

    // Render the UI for your table
    return (
      <>

<table className="table" {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
            {/* { (user && (user.roles.includes('update') || user.roles.includes('manager')))  &&
              (
                <Link 
                  to={{
                    pathname: "/addtext",
                  }}>
                  <Button animated='vertical' color='blue'>
                    <Button.Content hidden>Add Text</Button.Content>
                    <Button.Content visible>
                      <Icon name='plus' />
                    </Button.Content>
                  </Button> 
                </Link> 
              )
            } */}
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
  console.log("The user data:", userData)


  const columns = React.useMemo(
    () => [
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
        Header: 'Last Updated',
        accessor: 'updatedAt'
      },
      {
        Header: 'Roles',
        accessor: 'user_roles',
        Cell: ({ cell: { value } }) => (value.map(function( user ) {
          return user.role.role_value;
        }).join(', '))
      }
    ],
    []
  )


  return (
          <TableStyles>
            <Table 
              columns={columns} 
              data={userData} 
            />
          </TableStyles>

  )

}

export default UserListTable;