import React from "react";
import { Link, useHistory } from "react-router-dom";
import { intersectionWith, isEqual } from "lodash";
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
  NarrowColumnFilter,
} from "../utils/Filters";
import { useAuth } from "../context/auth";
import { sortReshape, filterReshape } from "./../utils/reshapers";
import TableStyles from "./../stylesheets/table-styles";
import { Icon, Button, Grid, Message, Label, Segment } from "semantic-ui-react";
import { getRootsQuery, getAnonRootsQuery } from "./../queries/queries";
import { handleErrors } from "../utils/messages";
import BrowseList from "../utils/BrowseList";
import {
  path_segment_permissions,
  path_column_permissions,
} from "../access/permissions";
import { useExportData } from "react-table-plugins";
import { getExportFileBlob } from "../utils/ExportFileBlob";

// this table uses server-side paging, sorting and filtering.
// It does not have any dropdown menus.
// the Table function from react-tables version 7 creates the basic table setup
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  globalSearch,
}) {
  // get user information so we can check permissions
  const { user, authTokens } = useAuth();

  // set up a fuzzy text filter that gets rid of upper case chars
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

  // set default parameters for columns
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 50,
      width: 200,
      maxWidth: 500,
    }),
    []
  );
  // get all the utils we need for the table
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
    exportData,
    // list the state variables we need to pay attention to
    state: { pageIndex, pageSize, sortBy, filters, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        globalFilter: globalSearch && globalSearch !== "" ? globalSearch : null,
      }, // Pass our hoisted table state, tell the table we're doing server-side stuff
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true,
      manualGlobalFilter: true,
      defaultColumn,
      filterTypes,
      getExportFileBlob,
      getExportFileName,
    },
    // list the built-in hooks we're gonna use.  Order matters.
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExportData,
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter });
  }, [fetchData, pageIndex, pageSize, sortBy, filters, globalFilter]);

  // Listen for changes in the column selections to toggle visible columms
  React.useEffect(() => {
    setHiddenColumns(
      columns.filter((column) => !column.show).map((column) => column.id)
    );
  }, [columns, setHiddenColumns]);

  // set up the filenames for exported files from this page
  function getExportFileName({ fileType, all }) {
    let fileName = "";
    fileName =
      all === true ? "roots_sel_rows_all_cols" : "roots_sel_rows_sel_cols";
    return fileName;
  }

  // create a hook to show or hide material from the return, set to hide
  const [show, setShow] = React.useState(false);

  // Render the UI for your table
  return (
    <>
      {authTokens &&
      user &&
      intersectionWith(
        path_segment_permissions["canExport"],
        user.roles,
        isEqual
      ).length >= 1 ? (
        <>
          <Grid.Row>
            <Button
              size="mini"
              basic
              color="blue"
              type="button"
              onClick={() => setShow(!show)}
            >
              show/hide export options
            </Button>
          </Grid.Row>
          {show ? (
            <>
              <Message>
                Export visible rows or{" "}
                <Link
                  to={{ pathname: "/rootexports", state: { globalSearch } }}
                >
                  export all rows
                </Link>
              </Message>
              <Grid columns={2}>
                <Grid.Column>
                  <Segment>
                    <Label as="a" color="blue" ribbon>
                      selected columns only
                    </Label>
                    <Button.Group size="mini">
                      <Button
                        onClick={() => {
                          exportData("csv", false);
                        }}
                      >
                        to csv
                      </Button>
                      <Button.Or />
                      <Button
                        color="blue"
                        onClick={() => {
                          exportData("xlsx", false);
                        }}
                      >
                        to xlsx
                      </Button>
                      <Button.Or />
                      <Button
                        onClick={() => {
                          exportData("pdf", false);
                        }}
                      >
                        to pdf
                      </Button>
                    </Button.Group>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Label as="a" color="blue" ribbon>
                      all columns
                    </Label>
                    <Button.Group size="mini">
                      <Button
                        onClick={() => {
                          exportData("csv", true);
                        }}
                      >
                        to csv
                      </Button>
                      <Button.Or />
                      <Button
                        color="blue"
                        onClick={() => {
                          exportData("xlsx", true);
                        }}
                      >
                        to xlsx
                      </Button>
                      <Button.Or />
                      <Button
                        onClick={() => {
                          exportData("pdf", true);
                        }}
                      >
                        to pdf
                      </Button>
                    </Button.Group>
                  </Segment>
                </Grid.Column>
              </Grid>
            </>
          ) : null}
        </>
      ) : (
        <div></div>
      )}
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
      <BrowseList />
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length}>
              {user &&
                (user.roles.includes("update") ||
                  user.roles.includes("manager")) && (
                  <Link
                    to={{
                      pathname: "/addroot",
                    }}
                  >
                    <Button animated="vertical" color="blue">
                      <Button.Content hidden>Add Root</Button.Content>
                      <Button.Content visible>
                        <Icon name="plus" />
                      </Button.Content>
                    </Button>
                  </Link>
                )}
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
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
          {[10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
// now we build the columns of the table, paying attention to whether the user
// has update permissions or not, and calculating any fields we need.
function RootTable(props) {
  let history = useHistory();

  const updateColumns = React.useMemo(
    () => [
      {
        Header: "",
        disableFilters: true,
        sortable: false,
        show: true,
        width: 100,
        id: "historyEditDelete",
        label: "History/Edit/Delete",
        tableName: "RootTable",
        Cell: ({ row, original }) => (
          <div className="buttons">
            <Link
              to={{
                pathname: "/roothistory",
                search: "?id=" + row.original.id,
              }}
            >
              <button className="ui mini blue icon button">
                <Icon name="history" />
              </button>
            </Link>
            <Link
              to={{
                pathname: "/editroot",
                search: "?id=" + row.original.id,
              }}
            >
              <button className="ui mini black icon button">
                <Icon name="edit" />
              </button>
            </Link>
            <Link
              to={{
                pathname: "/deleteroot",
                search: "?id=" + row.original.id,
              }}
            >
              <button className="ui mini blue icon button">
                <Icon name="close" />
              </button>
            </Link>
          </div>
        ),
      },
      {
        Header: "√",
        width: 75,
        Filter: NarrowColumnFilter,
        accessor: "root",
        tableName: "RootTable",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: "/exactroot",
              search: `?root=${row.original.root}`,
            }}
          >
            {row.original.root}
          </Link>
        ),
        id: "root",
        show: true,
        label: "Root",
      },
      {
        Header: "#",
        width: 75,
        Filter: NarrowColumnFilter,
        accessor: "number",
        tableName: "RootTable",
        id: "number",
        show: false,
        label: "Number",
      },
      {
        Header: "Sns.",
        width: 100,
        Filter: NarrowColumnFilter,
        accessor: "sense",
        tableName: "RootTable",
        id: "sense",
        show: false,
        label: "Sense",
      },
      {
        Header: "Salish",
        width: 150,
        accessor: "salish",
        tableName: "RootTable",
        id: "salish",
        show: false,
        label: "Salish",
      },
      {
        Header: "Nicodemus",
        accessor: "nicodemus",
        width: 250,
        tableName: "RootTable",
        id: "nicodemus",
        show: true,
        label: "Nicodemus",
      },
      {
        Header: "English",
        accessor: "english",
        tableName: "RootTable",
        id: "english",
        show: true,
        label: "English",
      },
      {
        Header: "§",
        accessor: "symbol",
        width: 100,
        Filter: NarrowColumnFilter,
        tableName: "RootTable",
        id: "symbol",
        show: false,
        label: "Symbol",
      },
      {
        Header: "Gr.",
        accessor: "grammar",
        width: 100,
        Filter: NarrowColumnFilter,
        tableName: "RootTable",
        id: "grammar",
        show: false,
        label: "Grammar",
      },
      {
        Header: "x-ref",
        accessor: "crossref",
        width: 150,
        tableName: "RootTable",
        id: "crossref",
        show: false,
        label: "Cross Reference",
      },
      {
        Header: "Var.",
        accessor: "variant",
        width: 150,
        tableName: "RootTable",
        id: "variant",
        show: false,
        label: "Variant",
      },
      {
        Header: "Cog.",
        accessor: "cognate",
        width: 150,
        tableName: "RootTable",
        id: "cognate",
        show: false,
        label: "Cognate",
      },
    ],
    []
  );

  const anonColumns = React.useMemo(
    () => [
      {
        Header: "√",
        width: 75,
        Filter: NarrowColumnFilter,
        accessor: "root",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: "/exactroot",
              search: `?root=${row.original.root}`,
            }}
          >
            {row.original.root}
          </Link>
        ),
        tableName: "RootTable",
        id: "root",
        show: true,
        label: "Root",
      },
      {
        Header: "#",
        width: 75,
        Filter: NarrowColumnFilter,
        accessor: "number",
        tableName: "RootTable",
        id: "number",
        show: false,
        label: "Number",
      },
      {
        Header: "Sns.",
        width: 100,
        Filter: NarrowColumnFilter,
        accessor: "sense",
        tableName: "RootTable",
        id: "sense",
        show: false,
        label: "Sense",
      },
      {
        Header: "Salish",
        width: 150,
        accessor: "salish",
        tableName: "RootTable",
        id: "salish",
        show: false,
        label: "Salish",
      },
      {
        Header: "Nicodemus",
        accessor: "nicodemus",
        width: 250,
        tableName: "RootTable",
        id: "nicodemus",
        show: true,
        label: "Nicodemus",
      },
      {
        Header: "English",
        accessor: "english",
        tableName: "RootTable",
        id: "english",
        show: true,
        label: "English",
      },
      {
        Header: "§",
        accessor: "symbol",
        width: 100,
        Filter: NarrowColumnFilter,
        tableName: "RootTable",
        id: "symbol",
        show: false,
        label: "Symbol",
      },
      {
        Header: "Gr.",
        accessor: "grammar",
        width: 100,
        Filter: NarrowColumnFilter,
        tableName: "RootTable",
        id: "grammar",
        show: false,
        label: "Grammar",
      },
      {
        Header: "x-ref",
        accessor: "crossref",
        width: 150,
        tableName: "RootTable",
        id: "crossref",
        show: false,
        label: "Cross Reference",
      },
      {
        Header: "Var.",
        accessor: "variant",
        width: 150,
        tableName: "RootTable",
        id: "variant",
        show: false,
        label: "Variant",
      },
      {
        Header: "Cog.",
        accessor: "cognate",
        width: 150,
        tableName: "RootTable",
        id: "cognate",
        show: false,
        label: "Cognate",
      },
    ],
    []
  );
  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const { client, setAuthTokens, authTokens, user } = useAuth();

  async function getRoots(limit, offset, sortBy, filters) {
    let res = {};
    if (
      user &&
      intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1
    ) {
      res = await client.query({
        query: getRootsQuery,
        variables: {
          limit: limit,
          offset: offset,
          root_order: sortBy,
          where: filters,
        },
      });
    } else {
      res = await client.query({
        query: getAnonRootsQuery,
        variables: {
          limit: limit,
          offset: offset,
          root_order: sortBy,
          where: filters,
        },
      });
    }
    return res.data;
  }

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const controlledSort = sortReshape(sortBy);
          const controlledFilter = filterReshape(filters, globalFilter, [
            "root",
            "variant",
            "crossref",
            "cognate",
            "grammar",
            "english",
            "nicodemus",
            "salish",
          ]);
          getRoots(
            pageSize,
            pageSize * pageIndex,
            controlledSort,
            controlledFilter,
            { mode: "cors" }
          )
            .then((data) => {
              let totalCount = data.roots_aggregate.aggregate.count;
              setData(data.roots);
              setPageCount(Math.ceil(totalCount / pageSize));
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              handleErrors(error, {
                logout: { action: setAuthTokens, redirect: "/login" },
              });
              setData([]);
              setPageCount(0);
              setLoading(false);
              history.push("./login");
            });
        }
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, setAuthTokens]
  );

  let columns = {};
  if (
    authTokens &&
    user &&
    intersectionWith(path_column_permissions["canEdit"], user.roles, isEqual)
      .length >= 1
  ) {
    columns = updateColumns;
  } else {
    columns = anonColumns;
  }

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        globalSearch={props.globalSearch}
      />
    </TableStyles>
  );
}

export default RootTable;
