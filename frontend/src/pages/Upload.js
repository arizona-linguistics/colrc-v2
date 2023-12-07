import React from "react";
import { Grid, Segment } from  "semantic-ui-react";
import { getBlobQuery } from './../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from "../context/auth";


function Upload (props) {
    const { client } = useAuth()
    let { loading, error, data } = useQuery(getBlobQuery, {client: client })  

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.error(error)
        return <div>Error retreiving blob</div>
    } 
    console.log(data)

    const renderFiles = (data) => {
        return data.uploads.map(row => <li>{row.file}</li>)
      }


    return (

    <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
            <Segment>
                <ol>
                    {renderFiles(data)}
                </ol>
            </Segment>
        </Grid.Column>
    </Grid>
  );
}

export default Upload;
