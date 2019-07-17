import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUserToken, getUserFromToken } from '../queries/queries';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          password: user.password
        }
      }) 
      console.log(user)
      console.log(this.state)
    } catch(error) {
      console.log(error)
    }
  } 

  handleClick(e) {
    console.log('this is:', this);
    this.props.history.push('./.');
  }

render() {
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 600 }} textAlign='center'>
          <Header as='h2'  textAlign='center'>
              User Actions
          </Header>
          <Message>
            You are currently logged in as <div style={{ color: 'blue' }}>{this.state.fields.username}</div>  You can update your user profile, change your password, or log out.
          </Message>
          <Segment stacked textAlign='center'>
            <Button size='large' primary onClick={(e) => this.props.history.push('../userprofile')}>
              Update Your Profile
            </Button>
            <Button size='large' secondary path='../changepassword' onClick={(e) => this.props.history.push('../changepassword')}>
              Change Your Password
            </Button>
            <Button size='large' primary path='../logout' onClick={(e) => this.props.history.push('../logout')}>
              Logout
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
   );
  }
}

export default compose(
  withApollo,
  graphql(getUserToken, { name: "getUserToken"}), 
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(Users));