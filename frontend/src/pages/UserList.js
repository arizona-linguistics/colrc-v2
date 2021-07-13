import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { getUsersQuery } from '../queries/queries';
import UserListTable from "./UserListTable";
import { handleErrors } from "../utils/messages";
import { Grid, Header} from 'semantic-ui-react';

// note that getting this up and running for issue 110 required the following changes in hasura:
//
// update permissions on tables 'roles' and 'user_roles' for update, manager to have select permissions
// we'll need to think about

function UserList(props) {
    const { client, user } = useAuth();
    const userList = useQuery(getUsersQuery, { client: client });

    if (userList.loading) return <div>Loading</div>
    if (userList.error) {
        console.log(userList.error)
        handleErrors(userList.error)
        return <Redirect to="/users" />;
    }

    console.log("Data from user query: ", userList)

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
                        <UserListTable userListData={userList.data.users} />
                    </Grid.Row>
                </Grid.Column>
            </Grid> 
          )
         
    }
    
    return <Redirect to="/login" />;
}

export default UserList;