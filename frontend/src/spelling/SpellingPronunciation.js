import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import SpellingAccordion from '../accordions/SpellingAccordion';
import SpellingPronunciationList from './SpellingPronunciationList';
import SpellingPronunciationCharts from './SpellingPronunciationCharts';


class SpellingPronunciation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    	activeItem: 'list', 
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
	  const { activeItem } = this.state;



    const currentItem = this.state.activeItem === "list" ?
      <SpellingPronunciationList /> :
      <SpellingPronunciationCharts />;

  return (     
	  	<div className='ui content'> 
	      <Menu size='mini'>
	        <Menu.Item 
				name='list'
				active={activeItem === 'list'}
				onClick={this.handleItemClick}>
				List of Symbols
	        </Menu.Item>
	        <Menu.Item 
		        name='charts' 
		        active={activeItem === 'charts'} 
		        onClick={this.handleItemClick}>
		        Phoneme Charts
	        </Menu.Item>
	      </Menu> 
	        <h3>Spelling and Pronunciation Guide</h3>
	        <p></p>
	        <SpellingAccordion />
			<p></p>
			{currentItem}
		</div>
	);
  }
}

export default SpellingPronunciation;
