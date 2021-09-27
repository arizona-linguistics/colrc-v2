import React from "react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getStemCategoriesQuery } from './../queries/queries'
import { Grid } from 'semantic-ui-react'
import StemsAccordion from "./accordions/StemsAccordion";
import StemTable from "./StemTable"
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function Stems(props) {
  const { client } = useAuth()
  let history = useHistory()

  let { loading: stemCategoriesLoading, error: stemCategoriesError, data: stemCategoriesData } = useQuery(getStemCategoriesQuery, {client: client })  

  if (stemCategoriesLoading) {
    return <div>Loading...</div>
  }

  if (stemCategoriesError) {
    console.error(stemCategoriesError)
    const { graphQLErrors, networkError } = stemCategoriesError
    if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
        if (message.includes('JWTExpired')) {
            toast.error(`Whoops!  You have an old login.  Logging you out now`,)
            history.push('./login')
        } else {
            toast.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,)}    
    });
    return <div>Stem Category Loading Error!</div>
  }

  
  let stemCategorySelections = []
  console.log(stemCategoriesData)
  let stemCategories = stemCategoriesData.stem_categories
  stemCategories.forEach((item) => {
    stemCategorySelections.push(item.value)
  })

  let selectStemValues = {
    "stem_category.value": stemCategorySelections
  }

  return (  
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <StemsAccordion />
          </Grid.Row>
          <Grid.Row>
            <StemTable selectValues={selectStemValues} />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  </React.Fragment> 
  )
}

export default Stems;