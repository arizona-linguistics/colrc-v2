import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUsersQuery, getUserFromToken, updateUserAdminMutation } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      fields: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      }
    };
  }

  // async componentDidMount() {
  //   try {
  //     let userQuery = await this.props.client.query({
  //       query: getUserFromToken,
  //     })
  //     const user = userQuery.data.getUserFromToken_Q
  //     this.setState({
  //       fields: {
  //         first: user.first,
  //         last: user.last,
  //         email: user.email,
  //         username: user.username,
  //         password: user.password || ''
  //       }
  //     }) 
  //     console.log(user)
  //     console.log(this.state)
  //   } catch(error) {
  //     console.log(error)
  //   }
  // } 

  render() {
    const columns = [
      {
        Header: 'First',
        accessor: 'first'
      },
      {
        Header: 'Last',
        accessor: 'last'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({row, original}) => (original.roles.join(', ')),

      }
    ]

    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.props.getUsersQuery.users_Q}
        loading={this.props.getUsersQuery.loading}
        columns={columns}
        defaultPageSize={5}
        className="-striped -highlight left"
        filterable
      />;

    return ( 
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as='h3'  textAlign='center'>
              Set User Roles
          </Header>

          {dataOrError}
       </Grid.Column>
      </Grid>
    )      
  }
}

export default compose(
  withApollo,
  graphql(getUsersQuery, { name: "getUsersQuery"}), 
  graphql(updateUserAdminMutation, { name: "updateUserAdminMutation"}),  
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(withApollo(Admin)));

