import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  
  render() {  
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Logout
          </Header>
        </Grid.Column>
      </Grid>
   );
  }
}

export default Logout;