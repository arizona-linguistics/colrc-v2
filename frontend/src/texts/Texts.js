import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import TextsAccordion from '../accordions/TextsAccordion';
import TextsList from "./TextsList";
import TextsMetadata from "./TextsMetadata";

class Texts extends Component {
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
        currentItem = <TextsList textState={this.props.textState} changeTextState={this.props.changeTextState}/>;
    }
	else {
		currentItem = <TextsMetadata />;
	};
	  return (
        <div className='ui content'>
	      	<Menu size='mini'>
		        <Menu.Item 
					name='list'
					active={activeItem === 'list'}
					onClick={this.handleItemClick}>
					Texts
		        </Menu.Item>
		        <Menu.Item 
					name='metadata'
					active={activeItem === 'metadata'}
					onClick={this.handleItemClick}>
					Metadata
		        </Menu.Item>
	      	</Menu>
        <p></p>
        <TextsAccordion />
		<p></p>
		{currentItem}
	   </div>
      );
    }
}

export default Texts;
