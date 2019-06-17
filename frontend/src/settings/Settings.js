import React, { Component } from 'react';

class Settings extends Component {
  render() {
    const SettingsText = () => (
       <p>This is a placeholder for the 'settings' area of the site.  It will allow users to manage any settings we develop. </p>
    );
    return (     
      <div className='ui content'>
        <SettingsText />
      </div>
    );
  }
}
export default Settings;