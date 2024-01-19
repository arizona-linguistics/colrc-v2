import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
  SelectColumnFilter,
} from "../utils/Filters";
import { useAuth } from "../context/auth";
import { getAllAffixesQuery } from "../queries/queries";
import TableStyles from "../stylesheets/table-styles";
import { Button, Grid, Message, Label, Segment } from "semantic-ui-react";
import { handleErrors } from "../utils/messages";
import { useExportData } from "react-table-plugins";
import { getExportFileBlob } from "../utils/ExportFileBlob";

// this table does not use server-side paging, etc.
// It has one dropdown menu, so it uses selectValues.
// the Table function from react-tables version 7 creates the basic table setup
function Table({
  columns,
  data,
  fetchData,
  loading,
  //globalSearch,
}) {
  //get the selectValues out of the state
  const location = useLocation();
  console.log(
    "my location.state.selectValues is ",
    location.state.selectValues
  );
  const selectValues = location.state.selectValues;
  const globalSearch = location.state.globalSearch;

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
      minWidth: 25,
      width: 50,
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        globalFilter: globalSearch && globalSearch !== "" ? globalSearch : null,
      }, // Pass our hoisted table state, tell the table we're doing server-side stuff
      defaultColumn,
      filterTypes,
      selectValues,
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

  // console.log('filters ', filters.map(f => {
  //   if (f.id === "salish") {
  //     return f.value
  //   } else {
  //     return null
  //   }
  // }))

  // we don't fetch new data on page size changes, etc.
  React.useEffect(() => {
    fetchData({});
  }, [fetchData]);

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
      all === true ? "affixes_all_rows_all_cols" : "affixes_all_rows_sel_cols";
    return fileName;
  }
  // create a hook to show or hide material from the return, set to hide
  const [show, setShow] = React.useState(false);

  // Render the UI for your table
  return (
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
      {!show ? (
        <>
          <Message>
            Export all rows or{" "}
            <Link to={{ pathname: "/affixes" }}>export visible rows</Link>
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
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length}>
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
                Showing {page.length} of ~{pageCount * pageSize} results
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

// now we build the columns of the table
function AffixTableExport(props) {
  let history = useHistory();

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "affix_type.value",
        Filter: SelectColumnFilter,
        disableSortBy: true,
        tableName: "AffixTable",
        show: true,
        id: "affix_type.value",
        label: "Type",
      },
      {
        Header: "Nicodemus",
        accessor: "nicodemus",
        tableName: "AffixTable",
        show: true,
        id: "nicodemus",
        label: "Nicodemus",
      },
      {
        Header: "Salish",
        accessor: "salish",
        filter: "fuzzyText",
        tableName: "AffixTable",
        show: false,
        id: "salish",
        label: "Salish",
      },
      {
        Header: "English",
        accessor: "english",
        tableName: "AffixTable",
        show: true,
        id: "english",
        label: "English",
      },
      {
        Header: "Link",
        accessor: "page",
        Cell: ({ row }) => (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer">
            {row.original.page}
          </a>
        ),
        tableName: "AffixTable",
        show: true,
        id: "page",
        label: "Link",
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const { client, setAuthTokens, user } = useAuth();

  async function getAllAffixes(offset, sortBy, filters) {
    let res = {};
    if (
      user &&
      intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1
    ) {
      res = await client.query({
        query: getAllAffixesQuery,
        variables: {
          offset: offset,
          affix_order: sortBy,
          where: filters,
        },
      });
    }
    return res.data;
  }

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, filters }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          getAllAffixes(pageIndex, sortBy, filters)
            .then((data) => {
              let totalCount = data.affixes_aggregate.aggregate.count;
              setData(data.affixes);
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

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        selectValues={props.selectValues}
        globalSearch={props.globalSearch}
      />
    </TableStyles>
  );
}

export default AffixTableExport;
