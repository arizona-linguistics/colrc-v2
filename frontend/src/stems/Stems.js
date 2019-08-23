import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import StemsAccordion from '../accordions/StemsAccordion';
import StemList from "./StemList";
import StemsMetadata from "./StemsMetadata";

class Stems extends Component {
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
			currentItem = <StemList stemState={this.props.stemState} changeStemState={this.props.changeStemState}/>;
    }
	else {
		currentItem = <StemsMetadata />;
	};
    return (
      <div className='ui content'>
	      <Menu size='mini'>
		      <Menu.Item
					  name='list'
					  active={activeItem === 'list'}
					  onClick={this.handleItemClick}>
					    Stem Lists
		      </Menu.Item>
		      <Menu.Item
					  name='metadata'
					  active={activeItem === 'metadata'}
					  onClick={this.handleItemClick}>
					    Metadata
		      </Menu.Item>
	      </Menu>
	      <StemsAccordion />
	      	<p></p>
        	{currentItem}
      	</div>
      );
    }
}



export default Stems;
