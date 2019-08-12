import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import { withRouter } from 'react-router-dom';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withApollo, graphql, compose } from 'react-apollo';
import { getElicitationSetsQuery, getUserFromToken } from '../queries/queries';

class Elicitations extends Component {
  constructor() {
    super();
    this.state = {
    	data: [],
    	loading: true
     };
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('TOKEN')
        if (token) {
          let userQuery = await this.props.client.query({
            query: getUserFromToken,
          })
          const user = userQuery.data.getUserFromToken_Q
          // set the state with user info based on token, and if the user has an 'admin' role, set 
          // the state variable 'admin' to true.  Else, set it to false. 
          await this.setState({
            // if the roles array includes admin, set state to logged in as admin
            admin: user.roles.includes("admin") || user.roles.includes("owner") || user.roles.includes("update"),
            fields: {
              first: user.first,
              last: user.last,
              email: user.email,
              username: user.username,
              roles: user.roles
            }
          }) 
          console.log("My user is " + user)
          console.log(this.state)
        } else {
          await this.setState({
            admin: false,
            fields: {
              first: "anonymous",
              last: "anonymous",
              email: "anonymous",
              username: "anonymous",
              roles: ["view"]
            }
          })
          console.log(this.state)
          console.log("and here's the role " + this.state.fields.roles)
        }
      // now we're going to get only active stems if we are not admin, else 
      // we will get all the stems
      const getElicitationSets = await this.props.client.query({
        query: getElicitationSetsQuery,
        variables: { language: "Coeur d'Alene"} 
      })
      this.setState({
        data: getElicitationSets.data.elicitationsets_Q,
        loading: false
      })

    } catch(error) {
      console.log(error)
    }
  } 

  render() {

    const columns = [
    {
      Header: 'Item',
      accessor: 'title',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      style: { 'whiteSpace': 'unset'},
      width: 300
    },
    {
      Header: 'Audio',
      accessor: 'audio',
      Cell: ({row, original}) => ( <AudioPlayer key={original.key} title={original.title} speaker={original.speaker} language={original.language} sources={original.elicitationfiles} />),
    }, 
    { 
      Header: 'Transcription'
    }
    ]

    const dataOrError = this.state.error ?
         <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
         <ReactTable
           data={this.state.data}
           loading={this.state.data.loading}
           columns={columns}
           filterable
           defaultPageSize={5}
           className="-striped -highlight"         
         />;

    return (
      <div className='ui content'>
        <h3>Elicitations</h3>
        <p></p>
        {dataOrError}
		    <p></p>
		    <SimpleKeyboard / >
		    <p></p>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getElicitationSetsQuery, { name: 'getElicitationSetsQuery' }),
  graphql(getUserFromToken, { name: 'getUserFromToken_Q' }),  
)(withRouter(Elicitations));