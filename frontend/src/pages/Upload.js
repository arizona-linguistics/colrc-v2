import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button"
import { Grid } from  "semantic-ui-react";


// Production URL: https://thecolrc.org/upload_file
// Development URL: http://localhost:80/upload_file
// In either case this should be redirected by nginx to http://localhost:8081/upload_handler

const Upload = () => (
    <>
    <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
            <Grid.Row>
                <Uploady destination={{
                    url: "http://localhost:80/upload_file"
                }}>
                <UploadButton/>
                </Uploady>
            </Grid.Row>
        </Grid.Column>
    </Grid>
    </>
);

export default Upload