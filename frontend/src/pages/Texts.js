import React from "react";
import TextTable from "./TextTable";
import { Grid } from "semantic-ui-react";
import TextsAccordion from "./accordions/TextsAccordion";

function Texts(props) {
  //const { client } = useAuth()
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <TextsAccordion />
          </Grid.Row>
          <Grid.Row>
            <TextTable />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}

export default Texts;
