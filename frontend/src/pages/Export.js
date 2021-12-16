import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
//import './App.css';

function Export(props) {
    const [people, setPeople] = useState(
        [
            { name: "Keanu Reeves", profession: "Actor" },
            { name: "Lionel Messi", profession: "Football Player" },
            { name: "Cristiano Ronaldo", profession: "Football Player" },
            { name: "Jack Nicklaus", profession: "Golf Player" },
        ]        
    );


    function exportPDF() {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "My Awesome Report";
        const headers = [["NAME", "PROFESSION"]];

        const data = people.map(elt=> [elt.name, elt.profession]);

        let content = {
        startY: 50,
        head: headers,
        body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    return (
      <div>
        <button onClick={() => exportPDF()}>Generate Report</button>
      </div>
    );

}

export default Export;


