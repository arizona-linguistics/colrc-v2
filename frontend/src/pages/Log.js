import React from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getLogQuery } from './../queries/queries'
import { useQuery } from '@apollo/react-hooks'
import LogTable from './LogTable'
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "./../stylesheets/table-styles"
import { Icon, Button } from "semantic-ui-react";

function Log() {
    const { client } = useAuth();
    const history = useHistory()

    return <LogTable/>

}



export default Log
