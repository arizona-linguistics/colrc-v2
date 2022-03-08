import React from 'react';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages';
import { intersectionWith, isEqual } from 'lodash';
import { path_button_permissions } from "../access/permissions";

function Users(props) {

  const { client, authTokens, setAuthTokens, user } = useAuth()
  console.log('the user.roles is', user.roles)

  function logOut() {
    setAuthTokens();
    broadCastSuccess(`Logged Out`)
  }

  return (
    <Grid textAlign='center'  verticalAlign='top'>
      <Grid.Column style={{ maxWidth: 750 }} textAlign='center'>
        <Header as='h2'  textAlign='center'>
            User Actions
        </Header>
        <Segment stacked textAlign='center'>
          <Button color='blue' onClick={(e)=> props.history.push('/userprofile')}>
            Update Your Profile
          </Button>
          <Button  color='black' path='/changepassword' onClick={(e) => props.history.push('/changepassword')}>
            Change Your Password
          </Button>
          <Button color='blue'
            onClick={(e) => {
              logOut()
              props.history.push('/')
            }}>
            Logout
          </Button>
          {authTokens && user && intersectionWith(path_button_permissions['adminUsers'], user.roles, isEqual).length >= 1 ? (
            <Button  color='black' onClick={(e)=> props.history.push('/userlist')}>
              Administer Users
            </Button>): ( 
            <div></div>
            )
          }
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Users