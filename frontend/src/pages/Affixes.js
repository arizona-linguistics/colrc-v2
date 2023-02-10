import React from "react"
import { Grid } from "semantic-ui-react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getAffixTypesQuery } from './../queries/queries'
import AffixesAccordion from "./accordions/AffixesAccordion";
import AffixTable from "./AffixTable"
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function Affixes(props) {
  const { client } = useAuth()
  let history = useHistory()

  let { loading: affixTypesLoading, error: affixTypesError, data: affixTypesData } = useQuery(getAffixTypesQuery, {client: client })  

  if (affixTypesLoading) {
    return <div>Loading...</div>
  }

  if (affixTypesError) {
    console.error(affixTypesError)
    const { graphQLErrors } = affixTypesError
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message.includes('JWTExpired')) {
            toast.error(`Whoops!  You have an old login.  Logging you out now`,)
            history.push('./login')
        } else {
            toast.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,)}    
    });
    return <div>Affix Category Loading Error!</div>
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