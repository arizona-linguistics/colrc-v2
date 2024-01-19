import React from "react";
import AudioTable from "./AudioTable";
import { Grid } from "semantic-ui-react";
import AudioAccordion from "./accordions/AudioAccordion";

function Audios(props) {
  //const { client } = useAuth()
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <AudioAccordion />
          </Grid.Row>
          <Grid.Row>
            <AudioTable />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}

export default Audios;
