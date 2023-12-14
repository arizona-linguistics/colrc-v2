import React from "react";
import { useTable } from "react-table";
import AudioPlayer from '../utils/AudioPlayer';
import { Link } from 'react-router-dom';

/**
 * This function constructs a table used for displaying text data provided by the AudioMaterialsTable function.
 * @param {*} columns Each of the columns of the DataGrid
 * @param {*} data Data to be used in the table
 * @returns A rendered UI for the table
 */
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //  visibleColumns
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <React.Fragment>
      <table className="materialsTable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
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
        </tbody>
      </table>
    </React.Fragment>
  );
}

/**
 * Provides the data needed to construct the AudioMaterialsTable using the Table function
 * @param {*} materialData the material data for the audio materials
 * @returns A rendered AudioMaterialsTable
 */
function AudioMaterialsTable({ materialData }) {
  console.log("this is my materialData ", materialData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => [
    {
      Header: "Materials",
      id: "src",
      accessor: "source",
      Cell: ({ row }) =>
        row.original.type === "text" ? (
          <span>
            <a
              href={row.original.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.original.title}
            </a>
          </span>
        ) : row.original.type === "audio" ? (
          <AudioPlayer
            key={row.original.key}
            title={row.original.title}
            speaker={row.original.speaker}
            sources={row.original.sources}
          />
        ) : row.original.type === "textimages" ? (
          <Link
            to={{
              pathname: "/imageviewer/",
              search: "?key=" + row.original.key + row.original.src,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.title}
          </Link>
        ) : (
          <Link
            to={{
              pathname: "/splitview/",
              search: "?key=" + row.original.key + row.original.src,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.title}
          </Link>
        ),
    },
  ]);

  const [data] = React.useState(() => materialData);

   return (
      <Table
         columns={columns}
         data={data}
      />
   );
}

export default AudioMaterialsTable;
