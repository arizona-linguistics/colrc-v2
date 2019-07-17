import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUserToken, getUserFromToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component {
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
 
  render() {
  
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Change Your Password
          </Header>
          <Message>
            You are currently logged in as <div style={{ color: 'blue' }}>{this.state.fields.username}</div>  You can change your password here.
          </Message>
          <Segment>
            Here is the change your password page, which I haven't built.
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
)(withRouter(ChangePassword));