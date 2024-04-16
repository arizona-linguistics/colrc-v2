import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  GlobalFilter,
  fuzzyTextFilterFn,
  NarrowColumnFilter,
  ClientSelectFilter,
  SelectOrthographyFilter,
} from "../utils/Filters";
import { useAuth } from "../context/auth";
import { getConsonantsQuery } from "./../queries/queries";
import { sortReshape, filterReshape } from "./../utils/reshapers";
import TableStyles from "./../stylesheets/table-styles";

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  selectValues,
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
      Filter: NarrowColumnFilter, // Let's set up our default Filter UI
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
    page,
    rows,
    state,
    allColumns,
    setHiddenColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    visibleColumns,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, filters, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [
          { id: "orthography" },
          { id: "manner", desc: true },
          { id: "voice", desc: true },
        ],
      }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true,
      manualGlobalFilter: true,
      defaultColumn,
      filterTypes,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter });
  }, [fetchData, pageIndex, pageSize, sortBy, filters, globalFilter]);

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
                    {column.isSorted ? (column.isSortedDesc ? "▲" : "▼") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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

function ConsonantChart(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Orth.",
        accessor: "orthography",
        id: "orthography",
        Filter: SelectOrthographyFilter,
        label: "Orthography: N = Nicodemus, R = Reichard, S = Salish",
        show: true,
      },
      {
        Header: "Voice",
        accessor: "voice",
        id: "voice",
        Filter: ClientSelectFilter,
        label: "Voicing:  V = voiced, VL = voiceless, VR = resonant",
        show: false,
      },
      {
        Header: "Manner",
        accessor: "manner",
        id: "manner",
        Filter: ClientSelectFilter,
        label: "Manner of Articulation",
        show: false,
      },
      {
        Header: "2nd",
        accessor: "secondary",
        label: "Secondary Articulation (Labial, Glottal, Both, None)",
        id: "secondary",
        Filter: ClientSelectFilter,
        show: false,
      },
      {
        Header: "labial",
        accessor: "labial",
        label: "Labial",
        id: "labial",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "alveolar",
        accessor: "alveolar",
        label: "Alveolar",
        id: "alveolar",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "alveo-pal.",
        accessor: "alveopalatal",
        label: "Alveopalatal",
        id: "alveopalatal",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "lateral",
        accessor: "lateral",
        label: "Lateral",
        id: "lateral",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "palatal",
        accessor: "palatal",
        label: "Palatal",
        id: "palatal",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "velar",
        accessor: "velar",
        label: "Velar",
        id: "velar",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "uvular",
        accessor: "uvular",
        label: "Uvular",
        id: "uvular",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "pharyngeal",
        accessor: "pharyngeal",
        label: "Pharyngeal",
        id: "pharyngeal",
        Filter: ClientSelectFilter,
        show: true,
      },
      {
        Header: "glottal",
        accessor: "glottal",
        label: "Glottal",
        id: "glottal",
        Filter: ClientSelectFilter,
        show: true,
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const { client } = useAuth();

  async function getConsonants(limit, offset, sortBy, filters) {
    let res = {};
    res = await client.query({
      query: getConsonantsQuery,
      variables: {
        limit: limit,
        offset: offset,
        consonant_order: sortBy,
        where: filters,
      },
    });
    return res.data;
  }

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);

      // We'll even set a delay to simulate a server here
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const controlledSort = sortReshape(sortBy);
          const controlledFilter = filterReshape(filters, globalFilter, []);
          getConsonants(
            pageSize,
            pageSize * pageIndex,
            controlledSort,
            controlledFilter
          )
            .then((data) => {
              let totalCount = data.consonants_aggregate.aggregate.count;
              setData(data.consonants);
              setPageCount(Math.ceil(totalCount / pageSize));
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setData([]);
              setPageCount(0);
              setLoading(false);
            });
        }
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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

export default ConsonantChart;
