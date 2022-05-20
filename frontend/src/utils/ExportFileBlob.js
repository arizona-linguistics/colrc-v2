import Papa from "papaparse";
import * as XLSX from 'xlsx/xlsx.mjs';
import JsPDF from "jspdf";
import "jspdf-autotable";

export function getExportFileBlob({ columns, data, fileType, fileName }) {
    if (fileType === "csv") {
      // CSV example  :: note that excel doesn't understand this is utf-8, but notepad does
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    } else if (fileType === "xlsx") {
      // XLSX example
  
      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => { 
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });
  
      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
  
      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns.map((column) => column.exportValue);
      const doc = new JsPDF('landscape');
      doc.autoTable({
        head: [headerNames],
        body: data,
        margin: { top: 20 },
        styles: {
          minCellHeight: 9,
          halign: "left",
          valign: "top",
          fontSize: 10,
        },
      });
      doc.save(`${fileName}.pdf`);
  
      return false;
    }
  
    // Other formats goes here
    return false;
  }