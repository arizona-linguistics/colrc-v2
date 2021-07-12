import React from "react"
import { Grid, Container } from 'semantic-ui-react'
import RootsAccordion from "./accordions/RootsAccordion";
import RootTable from "./RootTable"

function Roots(props) {

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <RootsAccordion />
            </Grid.Row>
            <Grid.Row>
              <RootTable/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Roots;