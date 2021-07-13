import React from 'react';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages';

function Users(props) {

  const { setAuthTokens, user } = useAuth();
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
          { user.roles.includes('manager') &&
            (<Button  color='black' onClick={(e)=> props.history.push('/userlist')}>
              Administer Users
            </Button>)
          }
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Users