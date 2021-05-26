import React from "react"
import { Grid } from "semantic-ui-react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getAffixTypesQuery } from './../queries/queries'
import AffixesAccordion from "./accordions/AffixesAccordion";
import AffixTable from "./AffixTable"

function Affixes(props) {
  const { client } = useAuth()

  let { loading: affixTypesLoading, error: affixTypesError, data: affixTypesData } = useQuery(getAffixTypesQuery, {client: client })  

  if (affixTypesLoading) {
    return <div>Loading...</div>
  }

  if (affixTypesError) {
    console.error(affixTypesError)
    return <div>Error!</div>
  }

  
  let affixTypeSelections = []
  let affixTypes = affixTypesData.affix_types
  affixTypes.forEach((item) => {
    affixTypeSelections.push(item.value)
  })

  let selectAffixValues = {
    "affix_type.value": affixTypeSelections
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <AffixesAccordion />
          </Grid.Row>
          <Grid.Row>
            <AffixTable selectValues={selectAffixValues} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Affixes;