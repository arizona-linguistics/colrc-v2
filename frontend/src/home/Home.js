import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import HomeAccordion from '../accordions/HomeAccordion';
import Mission from './Mission';
import History from './History';
import About from './About';

class Home extends Component {

	 constructor(props) {
	    super(props);
	    this.state = { 
	    	activeItem: 'about', 
	    };
	    this.handleItemClick = this.handleItemClick.bind(this);
	  }

	  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
	  const { activeItem } = this.state;

   let currentItem; 
    if (this.state.activeItem === "about") {
      	currentItem = <About />;
    }
    else if (this.state.activeItem === "mission") {
		currentItem = <Mission />;
	}
	else {
		currentItem = <History />;
	};

      return (
 	  	<div className='ui content'> 
	      <Menu size='mini'>
	      <Menu.Item 
				name='about'
				active={activeItem === 'about'}
				onClick={this.handleItemClick}>
				About
	        </Menu.Item>
	        <Menu.Item 
				name='mission'
				active={activeItem === 'mission'}
				onClick={this.handleItemClick}>
				Mission Statement
	        </Menu.Item>
	        <Menu.Item 
		        name='history' 
		        active={activeItem === 'history'} 
		        onClick={this.handleItemClick}>
		        History of Materials
	        </Menu.Item>
	      </Menu>
	      {currentItem}
	      <p></p>
	      <HomeAccordion />
	      <p></p>
        </div>
      );
    }
}

export default Home;