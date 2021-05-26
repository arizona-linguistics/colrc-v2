import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { getUsersQuery } from '../queries/queries';
import UserList from "./UserList";
import { handleErrors } from "../utils/messages";

function UserListContainer(props) {
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
  		return <UserList userListData={userList.data.users_Q} />
    }
    
    return <Redirect to="/login" />;
}

export default UserListContainer;