import React from "react";
import {
  useTable,
} from "react-table";
import SubTableStyles from "../stylesheets/sub-table-styles";
import AudioPlayer from '../utils/AudioPlayer';
import { Link } from 'react-router-dom';


function Table({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <React.Fragment>
      <table className='subtable'{...getTableProps()}>
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
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}



function SubTable({ subData }) {
  console.log('this is my subData ', subData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => [
    {
      Header: 'Materials',
      id: 'src',
      accessor: 'source', 
      Cell: ({ row }) => (
        row.original.type === "text"
        ? <span><a href={row.original.path} target="_blank" rel="noopener noreferrer">{row.original.title}</a> and <Link to={{pathname: "/metadata", search:`?metadata=${row.original.metadata}`}} target="_blank">{row.original.metadata}</Link></span>
        : (row.original.type === "audio"
          ? <AudioPlayer key={row.original.key} title={row.original.title} speaker={row.original.speaker} sources={row.original.sources} />
          : (row.original.type ==="textimages"
            ? <Link to={{
                pathname: '/imageviewer/',
                search: '?key=' + row.original.key + row.original.src }}
                target="_blank"
                rel="noopener noreferrer"
                >
                {row.original.title}
              </Link>
            : <Link to={{
                pathname: '/splitview/',
                search: '?key=' + row.original.key + row.original.src }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.original.title}
              </Link>
            )
          )
        )
      } 
    ])


  const [data] = React.useState(() => subData);

  
  return (
    <SubTableStyles>
    <Table 
        columns={columns} 
        data={data}
      />
    </SubTableStyles>
  );
}

export default SubTable;