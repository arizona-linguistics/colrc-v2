import styled from "styled-components";

// const Styles = styled.div`
//   padding: 1rem;
//   ${'' /* These styles are suggested for the table fill all available space in its containing element */}
//   display: block;
//   ${'' /* These styles are required for a horizontaly scrollable table overflow */}
//   overflow: auto;

//   .table {
//     border-spacing: 0;
//     border: 1px solid black;

//     .thead {
//       ${'' /* These styles are required for a scrollable body to align with the header properly */}
//       overflow-y: auto;
//       overflow-x: hidden;
//     }

//     .tbody {
//       ${'' /* These styles are required for a scrollable table body */}
//       overflow-y: scroll;
//       overflow-x: hidden;
//       height: 250px;
//     }

//     .tr {
//       :last-child {
//         .td {
//           border-bottom: 0;
//         }
//       }
//       border-bottom: 1px solid black;
//     }

//     .th,
//     .td {
//       margin: 0;
//       padding: 0.5rem;
//       border-right: 1px solid black;

//       ${'' /* In this example we use an absolutely position resizer,
//        so this is required. */}
//       position: relative;

//       :last-child {
//         border-right: 0;
//       }

//       .resizer {
//         right: 0;
//         background: blue;
//         width: 10px;
//         height: 100%;
//         position: absolute;
//         top: 0;
//         z-index: 1;
//         ${'' /* prevents from scrolling while dragging on touch devices */}
//         touch-action :none;

//         &.isResizing {
//           background: red;
//         }
//       }
//     }
//   }
// `
const TableStyles = styled.div`
  padding: 1rem;
  display: block;
  overflow: auto;

  table {
    width: 100%;
    display: inline-block;
    tr {
      :nth-child(even) {
        background-color: #f5f5f5;
      }
      :nth-child(odd) {
        background-color: #dae5f4;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      border: 0px;
      background: #f5f5f5;
    }
    th {
      border: 0px;
      background: #f5f5f5;
      padding: .5rem;
      text-align: left;
    },
    td {
      margin: 0;
      border: 0px;
      padding: 1rem;
      word-wrap: break-word;
      }
    }
  }

  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
  }

  .columnToggle {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: .5rem;
  }

  .allExpandToggle {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 1rem;
  }

  .toggle {
    margin: 1rem;
  }
`;

export default TableStyles;
