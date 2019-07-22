import React, { Component } from 'react';
import { Button, Grid, Header, Message, Icon } from 'semantic-ui-react';
import ReactTable from "react-table";
import { withApollo, graphql, compose } from 'react-apollo';
import { getUsersQuery, getUserFromToken, updateUserAdminMutation } from '../queries/queries';
import { Link, withRouter } from 'react-router-dom';

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

  async componentDidMount() {
    try {
      let userQuery = await this.props.client.query({
        query: getUserFromToken,
      })
      const user = userQuery.data.getUserFromToken_Q
      this.setState({
        fields: {
          first: user.first,
          last: user.last,
          email: user.email,
          username: user.username,
          password: user.password || ''
        }
      }) 
      console.log(user)
      console.log(this.state)
    } catch(result) {
      console.log(result.graphQLErrors[0].message);
      this.setState({ autherror: result.graphQLErrors[0].message });
    }
  } 

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
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({row, original}) => (original.roles.join(', ')),
      },
      {
        Header: 'Edit Roles',
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({row, original}) => (
          <div>
            <Link to={{
              pathname: '/updateroles/',
              search: '?id=' + original.id +
              '&first=' + original.first +
              '&last=' + original.last +
              '&username=' + original.username +
              '&email=' + original.email +
              '&password=' + original.password +
              '&roles=' + original.roles 
            }} >
            <Button icon floated='right'>
              <Icon name='edit' />
            </Button>
            </Link>
         </div>
        )
      }
    ];

    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.props.getUsersQuery.users_Q}
        loading={this.props.getUsersQuery.loading}
        columns={columns}
        minRows={1}
        className="-striped -highlight left"
        filterable
      />;

    return ( 
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as='h3'  textAlign='center'>
              Set User Roles
          </Header>
          {this.state.autherror && (
          <Message className="error">Unsuccessful: {this.state.autherror}</Message>
          )}
          <Message>
            You are currently logged in as <div style={{ color: 'blue' }}>{this.state.fields.username}</div> 
          </Message>
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

