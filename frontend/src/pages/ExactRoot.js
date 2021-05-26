import React from 'react'
import { Link, useLocation, } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable } from 'react-table'
import { useAuth } from "../context/auth";
import TableStyles from "./../stylesheets/table-styles"
import { Icon, Message, Header } from "semantic-ui-react";
import { getExactRootQuery } from './../queries/queries'
import  BrowseList  from '../utils/BrowseList'


function Table({
  columns,
  data,
  fetchData,
  loading,
}) 
{
    let happy = new URLSearchParams(useLocation().search)
    let root = happy.get('root')
    console.log('the root is ', root)    
    const { user } = useAuth();


    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            rows,   
            allColumns,
            setHiddenColumns,
      } = useTable(
        {
            columns,
            data,
        },
     )


    React.useEffect(() => {

        fetchData({ })
    }, 
        []
    );

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
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
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

function ExactRootTable(props) {
    let happy = new URLSearchParams(useLocation().search)
    let root = happy.get('root')
    console.log('the root is ', root)    
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
        tableName: 'ExactRootTable',
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
        tableName: 'ExactRootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'ExactRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'ExactRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'ExactRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'ExactRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'ExactRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'ExactRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'ExactRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'ExactRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'ExactRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'ExactRootTable',
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
        tableName: 'ExactRootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'ExactRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'ExactRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'ExactRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'ExactRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'ExactRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'ExactRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'ExactRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'ExactRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'ExactRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'ExactRootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      },
    ], []
  )
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const fetchIdRef = React.useRef(0)
  const { client, user } = useAuth();

  async function getRoot() {
     let res = {} 
     res = await client.query({
        query: getExactRootQuery,
        variables: {
            root: root
        }
      })
      return res.data
    }


  const fetchData = React.useCallback(() => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        getRoot()
        .then((data) => {
          setData(data.roots)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setData([])
          setLoading(false)
        })
      }
    }, 1000)
  }, [])

  let columns = {}
  if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) {
    columns = updateColumns
  } else {
    columns = anonColumns
  }

  return (
    <>
    <Message>      
      <Header as='h4'>Viewing forms from root '{root}' | <Link to={{pathname: "/roots"}}>Return to full table</Link></Header> </Message>
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

export default ExactRootTable