import React from "react"
import { Grid } from "semantic-ui-react"
import BibliographyAccordion from "./accordions/BibliographyAccordion";
import BibliographyTable from "./BibliographyTable"

function Bibliography(props) {


  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <BibliographyAccordion />
          </Grid.Row>
          <Grid.Row>
            <BibliographyTable />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Bibliography;