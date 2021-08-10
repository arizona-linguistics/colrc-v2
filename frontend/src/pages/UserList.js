import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { getUsersQuery, getRolesQuery } from '../queries/queries';
import UserListTable from "./UserListTable";
import { handleErrors } from "../utils/messages";
import { Grid, Header} from 'semantic-ui-react';


function UserList(props) {
    const { client, user } = useAuth();

    let { loading: userListLoading, error: userListError, data: userListData } = useQuery(getUsersQuery, { client: client });
    let { loading: rolesLoading, error: rolesError, data: rolesData } = useQuery(getRolesQuery, { client: client });


    if (userListLoading || rolesLoading ) return <div>Loading</div>
    if (userListError || rolesError ) {
        console.log(userListError)
        handleErrors(userListError)
        return <Redirect to="/users" />;
    }

    // if ( rolesData ) {
    //     return <div>{JSON.stringify(rolesData)}</div>
    // }

    let roleSelections = []
    let roles = rolesData.roles
    roles.forEach((item) => {
      roleSelections.push(item.role_value)
    })
  
    let selectRoles = {
      "roles": roleSelections
    }

	if (user && user.roles && user.roles.includes('update')) {
  		return (

            <Grid>
                <Grid.Column width="16">
                    <Grid.Row>
                        <Header as='h2'  textAlign='center'>
                            User List
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        <UserListTable selectValues={ selectRoles } userListData={ userListData.users } />
                    </Grid.Row>
                </Grid.Column>
            </Grid> 
          )
         
    }
    
    return <Redirect to="/login" />;
}

export default UserList;