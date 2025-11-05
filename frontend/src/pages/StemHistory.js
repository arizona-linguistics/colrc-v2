
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { getStemHistoryByIdQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import LogHistory from "./LogHistory";

function StemHistory(props) {
  const { client } = useAuth();
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id");
  console.log(id);

  let { loading, error, data } = useQuery(getStemHistoryByIdQuery, {
    client: client,
    variables: { table_name: "stems", row_data: { id: parseInt(id) } },
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  console.log(data.audit_logged_actions);

  return (
    <>
      <LogHistory
        logData={data.audit_logged_actions}
        tableName="Stem"
      />
    </>
  )
}

export default StemHistory;