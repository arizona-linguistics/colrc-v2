import styled from "styled-components";

const TableStyles = styled.div`
  padding: 1rem;
  table {
    display: block;
    width: 100%;
    overflow: auto;
    thead {
      width: 100%;
    }
    tbody {
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
      overflow: auto;
      padding: 1rem;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #ddd;
    }
    th {
      border: 0px;
      background: #fafafa;
      padding: 0.5rem;
      text-align: left;
    }
    ,
    td {
      margin: 0;
      padding: 0.5rem;
      word-wrap: break-word;
      border-left: 1px solid #ddd;
      :first-child {
        border-left: 0;
      }
      position: relative;
      :last-child {
        border-right: 0;
      }
      .resizer {
        right: -1.5px;
        background: #ddd;
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        touch-action: none;
        &.isResizing {
          background: #ddd;
        }
      }
    }
    th {
      &:last-of-type {
        resizer {
          right: -2px;
        }
      }
    }
  }

  pagination: {
    padding: 10px;
  }

  globalfilter: {
    padding: 50px 10px 20px 30px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    line-height: -1em;
    margin: 0px;
    padding: 0px;
  }
  li {
    padding: 1rem;
  }
`;

export default TableStyles;
