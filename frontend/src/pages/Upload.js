import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button"
import { Grid, Segment } from  "semantic-ui-react";
//import { useAuth } from "../context/auth";
//import { useHistory } from 'react-router-dom';


// Production URL: https://thecolrc.org/upload_file
// Development URL: http://localhost:80/upload_file
// In either case this should be redirected by nginx to http://localhost:8081/upload_handler


function Upload (props) {
    //const { client, user } = useAuth();
    //let history = useHistory()

    return (

    <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
            <Segment>
                <Uploady destination={{url: "http://thecolrc.org:80/upload_file"}}>
                    <UploadButton className="ui black button"/>
                </Uploady>
            </Segment>
        </Grid.Column>
    </Grid>

    )
}

export default Upload