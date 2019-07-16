import React, { Component } from 'react';
import { Grid, Header, Segment, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import Logout from './Logout';

class Users extends Component {
  constructor(props) {
    super(props);
      this.state = { 
      activeItem: 'profile', 
    };
      this.handleItemClick = this.handleItemClick.bind(this);
  }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

render() {
  const { activeItem } = this.state;
  let currentItem; 
    if (this.state.activeItem === "profile") {
        currentItem = <UserProfile />;
    }
    else if (this.state.activeItem === "password") {
    currentItem = <ChangePassword />;
  }
  else {
    currentItem = <Logout />;
  };

    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'  textAlign='center'>
              User Actions
          </Header>
          <Menu>
            <Menu.Item 
              name='profile'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}>
              Update Your Profile
            </Menu.Item>
            <Menu.Item 
              name='password'
              active={activeItem === 'password'}
              onClick={this.handleItemClick}>
              Change Your Password
            </Menu.Item>
            <Menu.Item 
              name='Log out' 
              active={activeItem === 'logout'} 
              onClick={this.handleItemClick}>
              Log out
            </Menu.Item>
          </Menu>
          <Segment stacked>
          {currentItem}
          </Segment>
        </Grid.Column>
      </Grid>
   );
  }
}

export default Users;