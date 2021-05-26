import React from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getAffixHistoryByIdQuery } from './../queries/queries'
import { useQuery } from '@apollo/react-hooks'
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "./../stylesheets/table-styles"
import { Icon, Button } from "semantic-ui-react";

function AffixHistory() {
    const { client } = useAuth();
    const search = new URLSearchParams(useLocation().search)
    const id = search.get("id")
    console.log(id)
    const history = useHistory()
  
    let { loading: affixHistoryLoading, error: affixHistoryError, data: affixHistoryData } = useQuery(getAffixHistoryByIdQuery, 
        {client: client, variables: {"table_name": "affixes", "row_data": {"id": parseInt(id)}} }) 
     
    if (affixHistoryLoading) {
      return <div>loading...</div>
    }
    if (affixHistoryError) {
      return <div>Something went wrong</div>
    }

    return(JSON.stringify(affixHistoryData.audit_logged_actions.map(elem => {
      return { action: elem.action, userId: elem.hasura_user["x-hasura-user-id"], english: elem.row_data.english}
    })))

}



export default AffixHistory