import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { getRootHistoryByIdQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";

function RootHistory(props) {
  const { client } = useAuth();
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id");
  console.log(id);

  let { loading, error, data } = useQuery(getRootHistoryByIdQuery, {
    client: client,
    variables: { table_name: "roots", row_data: { id: parseInt(id) } },
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  console.log(data.audit_logged_actions);

  // let headings = JSON.stringify(data.audit_logged_actions)

  function MakeRows() {
    let rows = data.audit_logged_actions.map((elem) => {
      return {
        id: elem.event_id,
        action: elem.action,
        userId: elem.hasura_user["x-hasura-user-id"],
        addr: elem.client_addr,
        root: elem.row_data.root,
        rootId: elem.row_data.id,
        number: elem.row_data.number,
        sense: elem.row_data.sense ? elem.row_data.sense : null,
        english: elem.row_data.english,
        nicodemus: elem.row_data.nicodemus,
        salish: elem.row_data.salish ? elem.row_data.salish : null,
        grammar: elem.row_data.grammar ? elem.row_data.grammar : null,
        symbol: elem.row_data.symbol ? elem.row_data.symbol : null,
        crossref: elem.row_data.crossref ? elem.row_data.crossref : null,
        variant: elem.row_data.variant ? elem.row_data.variant : null,
        cognate: elem.row_data.cognate ? elem.row_data.cognate : null,
        editnote: elem.changed_fields ? elem.changed_fields.editnote : null,
        newroot: elem.changed_fields ? elem.changed_fields.root : null,
        newnumber: elem.changed_fields ? elem.changed_fields.number : null,
        newsense: elem.changed_fields ? elem.changed_fields.sense : null,
        newengl: elem.changed_fields ? elem.changed_fields.english : null,
        newnicodmus: elem.changed_fields ? elem.changed_fields.nicodemus : null,
        newsalish: elem.changed_fields ? elem.changed_fields.salish : null,
        newgrammar: elem.changed_fields ? elem.changed_fields.grammar : null,
        newsymbol: elem.changed_fields ? elem.changed_fields.symbol : null,
        newcrossref: elem.changed_fields ? elem.changed_fields.crossref : null,
        newvariant: elem.changed_fields ? elem.changed_fields.variant : null,
      };
    });
    return (
      <tr>
        {rows.map((row) => (
          <td key={row.id}>
            ID: {row.id}, Action: {row.action}, UserId: {row.userId}, Editnote:{" "}
            {row.editnote}, Root: {row.root}, Nicodemus: {row.english}, English:{" "}
            {row.english}, Salish: {row.salish}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <React.Fragment>
      <table className="historyTable">
        <tbody>{MakeRows()}</tbody>
      </table>
    </React.Fragment>
  );
}

export default RootHistory;
