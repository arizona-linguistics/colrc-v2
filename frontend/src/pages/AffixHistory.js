import LogHistory from "./LogHistory";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { getAffixHistoryByIdQuery } from "./../queries/queries";
import { useQuery } from "@apollo/react-hooks";

function AffixHistory() {
  const { client } = useAuth();
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id");
  console.log(id);

  let { loading, error, data } = useQuery(getAffixHistoryByIdQuery, {
      client: client,
      variables: { table_name: "affixes", row_data: { id: parseInt(id) } },
    });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <LogHistory
      logData={data.audit_logged_actions}
      tableName="Affix"
    />
  )
}

export default AffixHistory;
