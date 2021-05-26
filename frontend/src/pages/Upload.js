import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button"
import { Grid } from  "semantic-ui-react";


const Upload = () => (
    <>
    <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
            <Grid.Row>
                <Uploady destination={{url: "https://thecolrc.org/upload_file"}}>
                <UploadButton/>
                </Uploady>
            </Grid.Row>
        </Grid.Column>
    </Grid>
    </>
);

export default Upload