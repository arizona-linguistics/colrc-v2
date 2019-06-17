import React, { Component } from 'react';
import {
    Accordion,
	Icon,
} from 'semantic-ui-react';

class AudioMetadata extends Component {
	state = { activeIndex: 0 }

	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }

    render() {
       const { activeIndex } = this.state

		const MetadataAudioSubmenu = () => (
		    <Accordion fluid styled>
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
					<Icon name='dropdown' />
					Audios (unfinished)
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
				<p>Metadata for Audios goes here.</p>  
				</Accordion.Content>  
			</Accordion>
	);
	
      return (     
	  	<div className='ui content'>
			<MetadataAudioSubmenu />
		</div>
	);
  }
}


export default AudioMetadata;
