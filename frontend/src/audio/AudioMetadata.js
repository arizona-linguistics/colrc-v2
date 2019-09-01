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
					Audio - Cricket Rides Coyote 
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
          <ul className="ul-left-aligned">
            <li>Title: Cricket rides coyote (audio Coeur d'Alene)</li>
            <li>isFormatof (typed manuscript): XVI Cricket rides Coyote</li>
            <li>Subject: Reading of unpublished typed manuscript; Coeur d'Alene Narrative</li>
            <li>Description: Reading of unpublished typed manuscript; Coeur d'Alene narrative Cricket rides Coyote; Reader: Lawrence Nicodemus; Date recorded circa 1935; Recording of Lawrence Nicodemus reading "Cricket rides Coyote" recorded circa 1935 by Gladys Reichard. Original recorded on 12 inch discs stored at Indiana University Bloomington Archive of Traditional Music url: [http://www.indiana.edu/~libarchm/] Collection title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Type: Audio, wave file (.wav)</li>
            <li>Source: Digital copy of 12 inch disc</li>
            <li>Coverage: crd, Coeur d'Alene</li>
            <li>Coverage: 1927-1929, pre-1935</li>
            <li>Date: 2012</li>
            <li>Creator (COLRC Team): Shannon Bischoff (2012)</li>
            <li>Creator (COLRC Team): Amy Fountain (2012)</li>
            <li>Creator (linguist): Gladys Reichard</li>
            <li>Creator (reader): Lawrence Nicodemus</li>
            <li>Format: wave file (.wav)</li>
            <li>Identifier (permanent): Indiana University Bloomington Archive of Traditional Music, Collection Title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/audio/crdt27-29_arc20.wav</li>
            <li>Identifier (COLRC NO.): crdt27-29_arc20</li>
            <li>Language (ISO639-3): crd, Coeur d'Alene</li>
            <li>Language: Coeur d'Alene</li>
          </ul> 
				</Accordion.Content>  
        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Audio - Little Mosquito 
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <ul className="ul-left-aligned">
            <li>Title: Little Mosquito (audio Coeur d'Alene) Part I and Part II</li>
            <li>isFormatof: XXX Little Mosquito (typed manuscript)</li>
            <li>Subject: Reading of unpublished typed manuscript; Coeur d'Alene Narrative</li>
            <li>Description: Reading of unpublished typed manuscript; Coeur d'Alene narrative Little Mosquito; Reader: Lawrence Nicodemus (unconfirmed); Date recorded circa 1935; Recording of most likely Lawrence Nicodemus (identified by contemporary listeners who knew him) reading "Little Mosquito" recorded circa 1935 by Gladys Reichard. Original recorded on 12 inch discs stored at Indiana University Bloomington Archive of Traditional Music url: [http://www.indiana.edu/~libarchm/] Collection title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Type: Audio, wave file (.wav)</li>
            <li>Source: Digital copy of 12 inch disc</li>
            <li>Coverage: crd, Coeur d'Alene</li>
            <li>Coverage: 1927-1929, pre-1935</li>
            <li>Date: 2012</li>
            <li>Creator (COLRC Team): Shannon Bischoff (2012)</li>
            <li>Creator (COLRC Team): Amy Fountain (2012)</li>
            <li>Creator (linguist): Gladys Reichard</li>
            <li>Creator (reader): Lawrence Nicodemus</li>
            <li>Format: wave file (.wav)</li>
            <li>Identifier (permanent): Indiana University Bloomington Archive of Traditional Music, Collection Title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/audio/crdt27-29_arc28.wav</li>
            <li>Identifier (COLRC NO.): crdt27-29_arc28</li>
            <li>Language (ISO639-3): crd, Coeur d'Alene</li>
            <li>Language: Coeur d'Alene</li>
          </ul>
        </Accordion.Content>  
        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Audio - Rabbit and Jackrabbit
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>        
          <ul className="ul-left-aligned">
            <li>Title: Rabbit and Jack Rabbit (audio Coeur d'Alene and English) Part I and Part II</li>
            <li>isFormatof (Published English Translation): 35 Rabbit and Jack Rabbit</li>
            <li>isFormatof (typed manuscript): XXXVII Rabbit and Jack Rabbit</li>
            <li>Subject: Reading of unpublished typed manuscript and English translation; Coeur d'Alene Narrative</li>
            <li>Description: Reading of unpublished typed manuscript and English translation; Coeur d'Alene narrative Rabbit and Jack Rabbit; Reader: Lawrence Nicodemus; Date recorded circa 1935; Recording of Lawrence Nicodemus reading "Rabbit and Jack Rabbit" in Coeur d'Alene and English recorded circa 1935 by Gladys Reichard. Coeur d'Alene version of XXXVIII Rabbit and Jack Rabbit typed manuscripts and English translation numbered 35 in Reichard 1947 "Rabbit and Jack Rabbit" page 192 [http://archive.org/stream/analysisofcoeurd41reic#page/192/mode/2up]. Original recorded on 12 inch discs stored at Indiana University Bloomington Archive of Traditional Music url: [http://www.indiana.edu/~libarchm/] Collection title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Type: Audio, wave file (.wav)</li>
            <li>Source: Digital copy of 12 inch disc</li>
            <li>Coverage: crd, Coeur d'Alene</li>
            <li>Coverage: 1927-1929, pre-1935</li>
            <li>Date: 2012</li>
            <li>Creator (COLRC Team): Shannon Bischoff (2012)</li>
            <li>Creator (COLRC Team): Amy Fountain (2012)</li>
            <li>Creator (linguist): Gladys Reichard</li>
            <li>Creator (reader): Lawrence Nicodemus</li>
            <li>Format: wave file (.wav)</li>
            <li>Identifier (permanent): Indiana University Bloomington Archive of Traditional Music, Collection Title: 85-550-F. Idaho, Coeur d'Alene. Gladys Reichard, ca. 1935. Speaker: Lawrence Nicodemus.</li>
            <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/audio/crdt27-29_arc-e35.wav</li>
            <li>Identifier (COLRC NO.): crdt27-29_arc-e35</li>
            <li>Language (ISO639-3): eng-US, English</li>
            <li>Language (ISO639-3): crd, Coeur d'Alene</li>
            <li>Language: Coeur d'Alene with English translation</li>
          </ul>
        </Accordion.Content>  
			</Accordion>
	  )
    return (     
	  	<div className='ui content'>
			 <MetadataAudioSubmenu />
		  </div>
	  )
  }
}


export default AudioMetadata;
