import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { updateUserMutation, getUserFromToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component {
  
  render() {
  
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Change Your Password
          </Header>
        </Grid.Column>
      </Grid>
   );
  }
}

export default ChangePassword;