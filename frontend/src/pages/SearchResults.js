import React from "react"
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getAffixTypesQuery, getStemCategoriesQuery } from './../queries/queries'
import { Grid, Segment, Header, Message } from 'semantic-ui-react'
import RootTable from "./RootTable"
import AffixTable from "./AffixTable"
import StemTable from "./StemTable"
import OdinsonTable from "./OdinsonTable"
import { intersectionWith, isEqual } from 'lodash';
import { path_odinson_permissions } from "../access/permissions";

function SearchResults(props) {
  const { client, authTokens, user } = useAuth()
  const search = new URLSearchParams(useLocation().search)
  const globalSearch = search.get("search")

  let { loading: affixTypesLoading, error: affixTypesError, data: affixTypesData } = useQuery(getAffixTypesQuery, {client: client })  
  let { loading: stemCategoriesLoading, error: stemCategoriesError, data: stemCategoriesData } = useQuery(getStemCategoriesQuery, {client: client })  

  if (stemCategoriesLoading || affixTypesLoading) {
    return <div>Loading...</div>
  }

  if (affixTypesError) {
    console.error(affixTypesError)
    return <div>Affix Types Loading Error!</div>
  }

  if (stemCategoriesError) {
    console.error(stemCategoriesError)
    return <div>Stem Category Loading Error!</div>
  }

 
  let affixTypeSelections = []
  let affixTypes = affixTypesData.affix_types
  affixTypes.forEach((item) => {
    affixTypeSelections.push(item.value)
  })

  let selectAffixValues = {
    "affix_type.value": affixTypeSelections
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
              <Header as='h2'  textAlign='center'>
                  Search Results
              </Header>
              <Message>
                Use the the filters in each table to refine your search, or <Link to="/search">create a new search</Link>!
              </Message>
          </Grid.Row>
          <Segment>
              <Grid.Row>
                <Header as='h3'  textAlign='left'>
                    Roots
                </Header>
                <RootTable globalSearch={globalSearch}/>
              </Grid.Row>
            </Segment>
            <Segment>
              <Grid.Row>
                <Header as='h3'  textAlign='left'>
                    Affixes
                </Header>
                <AffixTable selectValues={selectAffixValues} globalSearch={globalSearch}/>
              </Grid.Row>
            </Segment>
            <Segment>
              <Grid.Row>
                <Header as='h3'  textAlign='left'>
                  Stems
                </Header>
                <StemTable selectValues={selectStemValues} globalSearch={globalSearch}/>
              </Grid.Row>
            </Segment>
           {authTokens && user && intersectionWith(path_odinson_permissions['searchResults'], user.roles, isEqual).length >= 1 ? (
            <Segment>
              {/* <Grid.Row>
                <Header as='h3'  textAlign='left'>
                  Odinson
                </Header>
                <OdinsonTable globalSearch={globalSearch}/>
              </Grid.Row> */}
            </Segment>): (<div></div>)
            }
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}


export default SearchResults