import React from "react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getStemCategoriesQuery } from './../queries/queries'
import { Grid } from 'semantic-ui-react'
import StemsAccordion from "./accordions/StemsAccordion";
import StemTable from "./StemTable"

function Stems(props) {
  const { client } = useAuth()

  let { loading: stemCategoriesLoading, error: stemCategoriesError, data: stemCategoriesData } = useQuery(getStemCategoriesQuery, {client: client })  

  if (stemCategoriesLoading) {
    return <div>Loading...</div>
  }

  if (stemCategoriesError) {
    console.error(stemCategoriesError)
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