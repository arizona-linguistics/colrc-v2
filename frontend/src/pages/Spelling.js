import React from "react";
import SpellingTable from "./SpellingList";
import ConsonantChart from "./ConsonantChart";
import VowelChart from "./VowelChart";
import { Grid, Segment, Header } from 'semantic-ui-react'
import SpellingAccordion from "./accordions/SpellingAccordion";

function Spelling(props) {

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <SpellingAccordion />
          </Grid.Row>
        <Segment>
          <Grid.Row>
            <Header as='h3'  textAlign='left'>
              Spelling List
            </Header>
            <SpellingTable />
          </Grid.Row>
        </Segment>
        <Segment>
          <Grid.Row>
            <Header as='h3' textAlign='left'>
              Consonant Chart
            </Header>
            <ConsonantChart />
          </Grid.Row>
        </Segment>
        <Segment>
          <Grid.Row>
            <Header as='h3' textAlign='left'>
              Vowel Chart
            </Header>
            <VowelChart />
          </Grid.Row>
        </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
  
}

export default Spelling;