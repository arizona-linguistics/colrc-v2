import React from "react";
import { useHistory } from "react-router-dom";
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
import { getAllBibliographyQuery } from "../queries/queries";
import { Button, Grid, Message, Label, Segment } from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles";
import { handleErrors } from "../utils/messages";
import { useExportData } from "react-table-plugins";
import { getExportFileBlob } from "../utils/ExportFileBlob";

function Table({ columns, data, fetchData, loading }) {
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
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 500, // maxWidth is only used as a limit for resizing
    }),
    []
  );

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
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [{ id: "author" }, { id: "year", desc: true }],
      }, // Pass our hoisted table state

      defaultColumn,
      filterTypes,
      getExportFileBlob,
      getExportFileName,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExportData,
    usePagination
  );
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({});
  }, [fetchData]);

  React.useEffect(() => {
    setHiddenColumns(
      columns.filter((column) => !column.show).map((column) => column.id)
    );
  }, [columns, setHiddenColumns]);

  // set up the filenames for exported files from this page
  function getExportFileName({ fileType, all }) {
    let fileName = "";
    fileName = all === true ? "bib_sel_rows_all_cols" : "bib_sel_rows_sel_cols";
    return fileName;
  }

  // create a hook to show or hide material from the return, set to hide
  const [show, setShow] = React.useState(false);

  // Render the UI for your table
  return (
    <>
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
            <Message>Export Bibliography</Message>
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
        ) : null}{" "}
      </>
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

function BibliographyTable(props) {
  let history = useHistory();

  const columns = React.useMemo(
    () => [
      {
        Header: "Author",
        accessor: "author",
        id: "author",
        label: "Author",
        show: true,
      },
      {
        Header: "Year",
        accessor: "year",
        id: "year",
        label: "Year",
        Filter: NarrowColumnFilter,
        show: true,
        width: 55,
      },
      {
        Header: "Title",
        accessor: "title",
        id: "title",
        label: "Title",
        show: true,
        width: 250,
      },
      {
        Header: "Reference",
        accessor: "reference",
        id: "reference",
        label: "Reference",
        show: false,
      },
      {
        Header: "Link",
        accessor: "linktext",
        Cell: ({ row }) => (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer">
            {row.original.linktext}
          </a>
        ),
        show: false,
        id: "link",
        label: "Link (if available online)",
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const { client, setAuthTokens } = useAuth();

  async function getBibliography(offset, sortBy, filters) {
    let res = {};
    res = await client.query({
      query: getAllBibliographyQuery,
      variables: {
        offset: offset,
        bibliographies_order: sortBy,
        where: filters,
      },
    });
    return res.data;
  }

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          getBibliography(pageIndex, sortBy, filters)
            .then((data) => {
              let totalCount = data.bibliographies_aggregate.aggregate.count;
              setData(data.bibliographies);
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
      />
    </TableStyles>
  );
}

export default BibliographyTable;
