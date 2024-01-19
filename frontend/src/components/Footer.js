import React from "react";
import { Message, Grid } from "semantic-ui-react";

function Footer() {
  return (
    <React.Fragment>
      <Grid relaxed columns={1} textAlign="center" verticalAlign="top">
        <Grid.Column>
          <Grid.Row>
            <Message compact size="mini">
              <p>
                Coeur d'Alene online language resource center copyright
                2009-2023, rights to language content reserved by the Coeur
                d'Alene Tribal Language Programs.
              </p>
              <p>
                Project supported by the National Science Foundation awards
                BCS-1160627 and BCS-1160394 and the National Endowment for the
                Humanities award PD-261031-18.
              </p>
            </Message>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}

export default Footer;
