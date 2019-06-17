import React, { Component } from 'react';
import { 
	Accordion, 
	Icon,
} from 'semantic-ui-react'

class RootsHistory extends Component {
 	state = { activeIndex: 0 }

	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }

    render() {
    const { activeIndex } = this.state;
	const HistoryRootsSubmenu = () => (
    <Accordion fluid styled>
		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
			<Icon name='dropdown' />
			History of Root Dictionary (Unfinished)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 0}>
		<p>History of Root Dictionary goes here.</p>  
		</Accordion.Content>  
	</Accordion>

	);
	
      return (     
	  	<div className='ui content'>
			<HistoryRootsSubmenu />
		</div>
	);
  }
}


export default RootsHistory;
