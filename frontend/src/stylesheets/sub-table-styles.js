import styled from 'styled-components'

const SubTableStyles = styled.div`
.subtable 
  table {
    overflow: auto;
    display: block;
    tr {
      background: #f5f5f5;
    }
    th {
      border: 0px;
      background: #f5f5f5;
      padding: 1rem;
      text-align: left;
    },
    td {
      margin: 0;
      padding: .5rem;
      word-wrap: break-word;
      }
    }
  }
`

export default SubTableStyles