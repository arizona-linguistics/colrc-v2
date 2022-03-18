import React from "react";
import { Grid, Header, Segment } from  "semantic-ui-react";
import { getMetadataTypesQuery } from '../queries/queries';
import MetadataTypes from './MetadataTypesTable';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


// Production URL: https://thecolrc.org/upload_file
// Development URL: http://localhost:80/upload_file
// In either case this should be redirected by nginx to http://localhost:8081/upload_handler


function ManageTypes (props) {
    const { client, user } = useAuth();
    let history = useHistory()
    let { loading: loading, error: error, data: data } = useQuery(getMetadataTypesQuery, {client: client }) 

    if (loading ) return <div>Loading</div>
    if (error) {
        console.log(error)
        const { graphQLErrors, networkError } = error
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            if (message.includes('JWTExpired')) {
                toast.error(`Whoops!  You have an old login.  Logging you out now`,)
                history.push('./login')
            } else {
                toast.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,)}    
        });
        return <Redirect to="/login" />;
    }

    if (data) {
        console.log('the data are ', data.metadata_type)
    }
    return (
    <>
        <Grid textAlign='center'  verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 750 }} textAlign='center'>
                <Header as='h2'  textAlign='center'>
                    Manage Resource Types
                </Header>
                <MetadataTypes data={data.metadata_type} />
            </Grid.Column>
        </Grid>
    </>
    )
}

export default ManageTypes