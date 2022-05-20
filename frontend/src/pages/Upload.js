import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button"
import { Grid, Header, Dropdown, Segment, Button } from  "semantic-ui-react";
//import { useAuth } from "../context/auth";
//import { useHistory } from 'react-router-dom';


// Production URL: https://thecolrc.org/upload_file
// Development URL: http://localhost:80/upload_file
// In either case this should be redirected by nginx to http://localhost:8081/upload_handler


function Upload (props) {
    //const { client, user } = useAuth();
    //let history = useHistory()

    return (
    <>
        <Grid textAlign='center'  verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 750 }} textAlign='center'>
                <Header as='h2'  textAlign='center'>
                    Upload Resources
                </Header>
                <Segment stacked textAlign='center'>
                    <Button color='blue'>
                        Manage Types
                    </Button>
                    <Button color='blue'>
                        Manage Files
                    </Button>
                    <Header as ='h4'>
                        or
                    </Header>
                    <Dropdown
                        placeholder='select a resource type'
                        selection
                        options={[{key: 'fieldnotes', text: 'fieldnotes', value: 'fieldnotes'}, {key: 'audio', text: 'audio', value: 'audio'},{key: 'workbook', text: 'workbook', value: 'workbook'}]}/>             
                    <Header as ='h4'>
                        then
                    </Header>
                    <Uploady destination={{url: "http://localhost:80/upload_file"}}>
                    <UploadButton className="ui black button"/>
                    </Uploady>
                </Segment>
            </Grid.Column>
        </Grid>
    </>
    )
}

export default Upload