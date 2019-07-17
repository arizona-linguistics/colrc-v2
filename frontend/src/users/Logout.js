import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  
  render() {  
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Logout
          </Header>
          <Segment>
            Here is the logout landing page, which we probably don't need.
          </Segment>
        </Grid.Column>
      </Grid>
   );
  }
}

export default Logout;