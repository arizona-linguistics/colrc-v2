import React from "react";
import ElicitationsTable from "./ElicitationsTable";
import { Grid } from "semantic-ui-react";
import ElicitationsAccordion from "./accordions/ElicitationsAccordion";

function Elicitations(props) {
  //const { client } = useAuth()
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <ElicitationsAccordion />
          </Grid.Row>
          <Grid.Row>
            <ElicitationsTable />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}

export default Elicitations;
