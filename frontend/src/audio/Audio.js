import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AudioAccordion from '../accordions/AudioAccordion';
import AudioList from "./AudioList";
import AudioMetadata from "./AudioMetadata";

class Audio extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	activeItem: 'list', 
	    };
	    this.handleItemClick = this.handleItemClick.bind(this);
	  };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
  render() {
  	const { activeItem } = this.state;	

	let currentItem; 
    	if (this.state.activeItem === "list") {
      		currentItem = <AudioList />;
    	}
		else {
			currentItem = <AudioMetadata />;
		};
    return (
        <div className='ui content'>
	      	<Menu size='mini'>
		        <Menu.Item 
					name='list'
					active={activeItem === 'list'}
					onClick={this.handleItemClick}>
					Audio List
		        </Menu.Item>
		        <Menu.Item 
					name='metadata'
					active={activeItem === 'metadata'}
					onClick={this.handleItemClick}>
					Metadata
		        </Menu.Item>
	      	</Menu>
	      	<p></p>
	      	<AudioAccordion />
	      	<p></p>
        	{currentItem}
      	</div>
      );
    }
}
  
export default Audio;
