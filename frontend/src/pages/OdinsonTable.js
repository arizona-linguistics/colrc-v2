import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getLogQuery } from '../queries/queries'
import { sortReshape, filterReshape } from "../utils/reshapers"
import TableStyles from "../stylesheets/table-styles"
import { handleErrors } from '../utils/messages';
import { useRowSelect } from 'react-table/dist/react-table.development';


function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  globalSearch
//   selectValues
}) {

  const { user } = useAuth();
  //console.log("Inside table, I have select values: ", selectValues)

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
      Filter: DefaultColumnFilter,       // Let's set up our default Filter UI
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
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
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, filters, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
        globalFilter: ((globalSearch && globalSearch !== '') ? globalSearch : null)
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
      //hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
    //   selectValues
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,   
  )
  
  console.log(globalFilter)
  // function OdinsonReturn(props) {
  
  //   const [data, setData] = useState([]);
  //   const [list, setList] = useState([]);
  //   const [pattern, setPattern] = useState("");
  
  //   const handleSubmit = async (evt) => {
  //     evt.preventDefault();
  //     let res = await getPattern(pattern)
  //     console.log(res.scoreDocs)
  //     setList(res.scoreDocs)
  //   }
  
  // }

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter, setScore, score, setDoc, doc, setCache, cache, setTotalHits, totalHits })
  }, [fetchData, pageIndex, pageSize, sortBy, filters, globalFilter])

  React.useEffect(
    () => {
      setHiddenColumns(
        columns.filter(column => !column.show).map(column => column.id)
      );
    },
    [columns, setHiddenColumns]
  );

  const [cache, setCache] = useState([]);
  const [doc, setDoc] = useState(-1);
  const [score, setScore] = useState(-1.0);
  const [totalHits, setTotalHits] = useState(-1);

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
      
    {/* <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pattern:
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div> */}

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
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
            { (user && (user.roles.includes('update') || user.roles.includes('manager')))
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
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
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

  // // We'll start our table without any data
  // const [data, setData] = React.useState([])
  // const [loading, setLoading] = React.useState(false)
  // const [pageCount, setPageCount] = React.useState(0)
  // //const [orderBy, setOrderBy] = React.useState([{'english': 'desc'}, {'nicodemus': 'asc'}])
  // const { client, setAuthTokens, user } = useAuth();

function OdinsonTable(props) {
  
  const [data, setData] = useState([]);
  // const [cache, setCache] = useState([]);
  // const [doc, setDoc] = useState(-1);
  // const [score, setScore] = useState(-1.0);
  const [pattern, setPattern] = useState("");
  const fetchIdRef = React.useRef(0)
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(0)
  const { client, setAuthTokens, user } = useAuth();

  let history = useHistory()

  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      //   tableName: 'LogTable',
      //   show: false,
      //   disableFilters: true,
      //   id: 'id'
      // },
      {
        Header: 'DocumentId',
        accessor: 'documentId',
        Filter: DefaultColumnFilter,
        tableName: 'OdinsonTable',
        show: true,
        disableSortBy: true,
        id: 'documentId',
        label: 'documentId'
      },
      {
        Header: 'Words',
        accessor: 'words',
        tableName: 'OdinsonTable',
        // Cell: ({ row }) => <span>{data.words.join(" ")}</span>,
        Cell: ({ cell: { value } }) => <span>{value.join(" ")}</span>,
        show: true,
        id: 'words',
        label: 'words'
      }
    ], []
  )
  
  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   let res = await getPattern(pattern)
  //   console.log(res.scoreDocs)
  //   setList(res.scoreDocs)
  // }
  
  // async function getPattern(pattern) {
  //   let res = {}
  //   console.log("getting data")
  //   let odindata = await fetch('http://localhost:80/odinson/?' + new 
  //   URLSearchParams({
  //   odinsonQuery: `[word = /.*${pattern}.*/]`
  //   }),{mode:'cors'}).then((res) => res.json())
  //   .then((data) => {
  //     return data
  //   }).catch(error => console.log(error))
  //   console.log("got data")
  //   return odindata
  // }

  // async function getLog(limit, offset, sortBy, filters) {
  //   let res = {}
  //   if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
  //     res = await client.query({
  //       query: getLogQuery,
  //       variables: { 
  //         limit: limit,
  //         offset: offset,
  //         log_order: sortBy,
  //         where: filters,
  //        }
  //     })
  //   }
    // else {
    //   res = await client.query({
    //     query: getAnonAffixesQuery,
    //     variables: { 
    //       limit: limit,
    //       offset: offset,
    //       affix_order: sortBy,
    //       where: filters,
    //     }
    //   })
    // }
    // return res.data
  // }  

  async function getPattern(globalSearch,pageSize,pageIndex,setScore,score,setDoc,doc,setCache,cache,setTotalHits,totalHits) {
    let tempCache = Array.from(cache)
    let hits = totalHits
    let tempScore = score
    let tempDoc = doc
    // console.log("page count and index: ", pageCount, pageIndex)
    // if (pageIndex > pageCount) {
    //   pageIndex = 0
    // }
    while (pageIndex*pageSize >= tempCache.length) {
      let odindata = await getNextCachePage(globalSearch, tempScore, tempDoc)
      hits = odindata.totalHits
      tempDoc = odindata.scoreDocs[odindata.scoreDocs.length-1].sentenceId
      tempScore = odindata.scoreDocs[odindata.scoreDocs.length-1].score
      tempCache = addPageToCache(tempCache, odindata, setCache)
      setPriorDocScoreHits(tempDoc, tempScore, hits, setDoc, setScore, setTotalHits)
    }
    let data = getCurrentViewPage(pageIndex, pageSize, tempCache, hits)
    return data
  }

  async function getNextCachePage(globalSearch, prevScore, prevDoc) {
    console.log("prevScore and Doc: ", prevScore, prevDoc)
    let searchParams = new URLSearchParams({
      odinsonQuery: `[word = /.*${globalSearch}.*/]`
    })
    if (prevScore > -1){
      searchParams = new URLSearchParams({
        odinsonQuery: `[word = /.*${globalSearch}.*/]`,
        prevScore: prevScore,
        prevDoc: prevDoc
      })
    }
    let odindata = await fetch('http://localhost:80/odinson/?' + searchParams, {mode:'cors'})
    .then((res) => res.json())
    .then((data) => {
      return data
    }).catch(error => console.log(error))
    return odindata
  }

  function getCurrentViewPage(pageIndex, pageSize, cache, totalHits) {
    let start = pageIndex*pageSize
    let end = start+pageSize > cache.length ? cache.length : start+pageSize
    let tempData = {
      totalHits: totalHits,
      scoreDocs: []
    }
    tempData.scoreDocs = cache.slice(start,end)
    return tempData
  }

  function addPageToCache(cache, page, setCache) {
    cache = cache.concat(page.scoreDocs)
    setCache(cache)
    return cache
  }

  function setPriorDocScoreHits(doc, score, totalHits, setDoc, setScore, setTotalHits) {
    setDoc(doc)
    setScore(score)
    setTotalHits(totalHits)
  }

  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter, setScore, score, setDoc, doc, setCache, cache, setTotalHits, totalHits }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const controlledSort = sortReshape(sortBy,"event_id")
        const controlledFilter = filterReshape(filters, globalFilter, ['action', 'table_name'])
        // console.log(controlledFilter)
        // reset to first page when filters change
        // if (filters.length > 0) {
        //   pageIndex = 0
        // }
        getPattern(globalFilter,pageSize,pageIndex,setScore, score, setDoc, doc, setCache, cache, setTotalHits, totalHits)
        .then((data) => {
          console.log(data)  
          let totalCount = data.totalHits
          console.log("the total count from fetchData is ", totalCount)
          setData(data.scoreDocs)
          setPageCount(Math.ceil(totalCount/pageSize))
          // setPageSize(totalCount)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          handleErrors(error, {'logout': {'action': setAuthTokens, 'redirect': '/login'}})
          setData([])
          setPageCount(0)
          setLoading(false)
          history.push('./login')
        })
      }
    }, 1000)
  }, [history, setAuthTokens])

  // let columns = updateColumns
  
  console.log(props.globalSearch)
  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        globalSearch={props.globalSearch}
        // selectValues={props.selectValues}
      />
    </TableStyles>
  )
}

export default OdinsonTable