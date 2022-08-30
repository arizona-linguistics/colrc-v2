import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { getUsersQuery } from '../queries/queries';
import UserListTable from "./UserListTable";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Grid, Header} from 'semantic-ui-react';


function UserList(props) {
    const { client, user } = useAuth();
    let history = useHistory()
    let { loading, error, data } = useQuery(getUsersQuery, {client: client }) 
    //const userList = useQuery(getUsersQuery, { client: client });

    if (loading ) return <div>Loading</div>
    if (error) {
        console.log(error)
        const { graphQLErrors } = error
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            if (message.includes('JWTExpired')) {
                toast.error(`Whoops!  You have an old login.  Logging you out now`,)
                history.push('./login')
            } else {
                toast.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,)}    
        });
        return <Redirect to="/users" />;
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
                        <UserListTable userListData={data.users} />
                    </Grid.Row>
                </Grid.Column>
            </Grid> 
          )
         
    }
    
    return <Redirect to="/login" />;
}

export default UserList;