import React, { Component } from 'react';

class Users extends Component {
  render() {
    const UsersText = () => (
       <p>This is a placeholder for the 'users' area of the site.  It will hold login and account information. </p>
    );
    return (     
      <div className='ui content'>
        <UsersText />
      </div>
    );
  }
}
export default Users;