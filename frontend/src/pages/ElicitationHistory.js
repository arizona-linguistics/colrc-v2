import React from 'react'
import { useLocation } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { getElicitationSetHistoryByIdQuery } from '../queries/queries'
import { useQuery } from '@apollo/react-hooks'

function ElicitationHistory(props) {
    const { client } = useAuth();
    const search = new URLSearchParams(useLocation().search)
    const id = search.get("id")
    console.log(id)
  
    let { loading, error, data } = useQuery(getElicitationSetHistoryByIdQuery, 
        {client: client, variables: {"table_name": "elicitationsets", "row_data": {"id": parseInt(id)}} })
        
    console.log(data)
     
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>Something went wrong</div>
    }
    console.log(data.audit_logged_actions)

    return(JSON.stringify(data.audit_logged_actions.map(elem => {
        return { action: elem.action, userId: elem.hasura_user["x-hasura-user-id"], prompt: elem.row_data.prompt, transcription: elem.row_data.transcription}
      })))
    
}

export default ElicitationHistory