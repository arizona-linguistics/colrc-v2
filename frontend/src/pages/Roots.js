import React from "react"
import { useAuth } from "../context/auth"
import { Grid, Container } from 'semantic-ui-react'
import RootsAccordion from "./accordions/RootsAccordion";
import RootTable from "./RootTable"

function Roots(props) {
  const { client } = useAuth()

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