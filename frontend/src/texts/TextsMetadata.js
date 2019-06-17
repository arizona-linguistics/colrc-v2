import React, { Component } from 'react';
import {
    Accordion,
	Icon,
} from 'semantic-ui-react';

class TextsMetadata extends Component {
	state = { activeIndex: 0 }

	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }

    render() {
       const { activeIndex } = this.state

		const MetadataTextsSubmenu = () => (
		    <Accordion fluid styled>
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
					<Icon name='dropdown' />
					Texts (unfinished)
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
				<p>Metadata for Text List goes here.</p>  
				</Accordion.Content>  
			</Accordion>
	);
	
      return (     
	  	<div className='ui content'>
			<MetadataTextsSubmenu />
		</div>
	);
  }
}


export default TextsMetadata;
