import React from "react";
import { Link } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  DefaultColumnFilter,
  GlobalFilter,
  fuzzyTextFilterFn,
} from "../utils/Filters";
import { Icon, Button } from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles"

/**
 * Provides the data needed to construct the MetadataLexiconTable using the Table function
 * @param {*} props Used to access properties of the Table as it is used
 * @returns A rendered MetadataLexiconTable
 */
function MetadataLexiconTable(props) {
  /**
   * This function constructs a table used for displaying text data provided by the MetadataLexiconTable function.
   * @param {*} columns Each of the columns of the DataGrid
   * @param {*} data Data to be used in the table
   * @param {*} fetchData Collcts new data for the table (not used)
   * @param {*} loading Loading indicator, a boolean
   * @returns A rendered UI for the table
   */
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
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
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
      allColumns,
      setHiddenColumns,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
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
      usePagination
    );

    React.useEffect(() => {
      setHiddenColumns(
        columns.filter((column) => !column.show).map((column) => column.id)
      );
    }, [columns, setHiddenColumns]);

    // Render the UI for your table

    return (
      <>
        <div className="columnToggle">
          {allColumns.map((column) => (
            <div key={column.id} className="columnToggle">
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                {column.label}
              </label>
            </div>
          ))}
        </div>
        <table className="table" {...getTableProps()}>
          <thead>
            <tr>
              <th colSpan={visibleColumns.length}>
                <Link
                  to={{
                    pathname: "/adduser",
                  }}
                >
                  <Button animated="vertical" color="blue">
                    <Button.Content hidden>Add User</Button.Content>
                    <Button.Content visible>
                      <Icon name="plus" />
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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted ? (column.isSortedDesc ? "▲" : "▼") : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
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
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} aria-label={"First Page"}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage} aria-label={"Previous Page"}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage} aria-label={"Next Page"}>
            {">"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} aria-label={"Last Page"}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  const data = props.data;

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        disableFilters: true,
        sortable: false,
        width: 100,
        show: true,
        id: "manageUser",
        label: "Manage",
        tableName: "MetadataLexiconTable",
        Cell: ({ row, original }) => (
          <div className="buttons">
            <button className="ui mini black icon button">
              <Icon name="edit" />
            </button>
            <button className="ui mini blue icon button">
              <Icon name="close" />
            </button>
          </div>
        ),
      },
      {
        Header: "label",
        accessor: "label",
        label: "Label",
        id: "label",
        show: true,
      },
      {
        Header: "code",
        accessor: "code",
        label: "Code",
        id: "code",
        show: true,
      },
      {
        Header: "type",
        accessor: "type",
        label: "Type",
        id: "type",
        show: true,
      },
      {
        Header: "definition",
        accessor: "definition",
        label: "Definition",
        id: "definition",
        show: true,
      },
      {
        Header: "code_table",
        accessor: "code_table",
        label: "Code Table",
        id: "code_table",
        show: false,
      },
      {
        Header: "comment",
        accessor: "comment",
        label: "Comment",
        id: "comment",
        show: false,
      },
      {
        Header: "validation",
        accessor: "validation",
        label: "Validation",
        id: "validation",
        Cell: ({ row }) => (
          <span>{JSON.stringify(row.original.validation)}</span>
        ),
      },
    ],
    []
  );

  return (
    <TableStyles>
      <Table columns={columns} data={data} />
    </TableStyles>
  );
}

export default MetadataLexiconTable;
