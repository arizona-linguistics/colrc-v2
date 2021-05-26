import React from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import TableStyles from "../components/table-styles";
import { DefaultColumnFilter, fuzzyTextFilterFn, GlobalFilter } from "../utils/Filters"
import { Grid , Segment } from 'semantic-ui-react';

  
function UserList(props) {
 
  function Table({ columns, data }) {
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
      state,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes,
      },
      useGlobalFilter,
      useFilters,
      useSortBy
    )

    // Render the UI for your table
    return (
      <>
      <Segment>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          />
      </Segment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => {
                const {
                  render,
                  getHeaderProps,
                  isSorted,
                  isSortedDesc,
                  getSortByToggleProps,
                  canFilter
                } = column;
                const extraClass = isSorted
                  ? isSortedDesc
                    ? "↑"
                    : "↓"
                  : "";
                return (
                  <th
                    key={`th-${i}`}
                    className={extraClass}              >
                    <div {...getHeaderProps(getSortByToggleProps())}>
                      {render("Header")}
                    </div>
                    <div>{canFilter ? render("Filter") : null}</div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
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
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({ cell: { value } }) => ( value.join(", ")),
      }
    ],
    []
  )

  return (
    <React.Fragment>
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='bottom'>
        <Grid.Row>
          <h3>Manage Users</h3>
        </Grid.Row>
        <Grid.Row>
          <TableStyles>
            <Table 
              columns={columns} 
              data={userData} 
            />
          </TableStyles>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  )

}

export default UserList;