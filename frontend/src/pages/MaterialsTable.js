import React from "react";
import {useTable, useExpanded} from "react-table";
import AudioPlayer from '../utils/AudioPlayer';
import { Link } from 'react-router-dom';


function Table({ columns, data, renderRowSubComponent }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable({
    columns,
    data,
    renderRowSubComponent
  }, 
  useExpanded
  )

  // Render the UI for your table
  return (
    <React.Fragment>
      <table className='materialsTable'{...getTableProps()}>
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
              <React.Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({row})}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

function MaterialsTable({ materialData }) {
  console.log('this is my materialData ', materialData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => [
    {
      Header: () => null,
      id: "subexpander",
      // remove arrow if engl
      Cell: ({ row }) => (
        row.original.metadata && row.original.metadata.length > 0 
        ? <span {...row.getToggleRowExpandedProps()}> {row.isExpanded ? '▼' : '▶'} </span>
        : <span/>
      ),
    },
    {
      Header: 'Materials',
      id: 'src',
      accessor: 'source', 
      Cell: ({ row }) => (
        row.original.type === "text"
        ? <span><a href={row.original.path} target="_blank" rel="noopener noreferrer">{row.original.title}</a></span>
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

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <div>
        <MaterialMetadataTable materialMetadata={row.original.metadata}/>
      </div>    
    ),
    []
  ) 

  const [data] = React.useState(() => materialData);

  
  return (
    <Table 
      className = 'materialMetadataTable'  
      columns={columns} 
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
  );
}

function MaterialMetadataTable({ materialMetadata }) {
  console.log('this is my materialMetadata ', materialMetadata)
  const columns = React.useMemo(() => [
      {
        Header: 'Field',
        id: 'field',
        accessor: 'field'
      },
      {
        Header: 'Value',
        id: 'value',
        accessor: 'value'
      }
  ])

  const [data] = React.useState(() => materialMetadata);

  return (
    <Table 
        columns={columns} 
        data={data}
      />
  );
}

export default MaterialsTable;