import React, { Component } from 'react';

class More extends Component {
  render() {
    const MoreText = () => (
       <p>This is a placeholder for the 'more resources' area of the site.  It will likely be a menu of additional features and resources. </p>
    );
    return (     
      <div className='ui content'>
        <MoreText />
      </div>
    );
  }
}
export default More;