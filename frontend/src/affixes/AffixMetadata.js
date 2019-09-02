import React, { Component } from 'react';
import {
    Accordion,
	Icon,
} from 'semantic-ui-react';

class AffixMetadata extends Component {
	state = { activeIndex: 0 }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  render() {
    const { activeIndex } = this.state
  	const MetadataAffixesSubmenu = () => (
      <Accordion fluid styled>
    		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
    			<Icon name='dropdown' />
    			Affix List
    		</Accordion.Title>
    		<Accordion.Content active={activeIndex === 0}>
          <ul className="ul-left-aligned">
            <li>Title: Coeur d'Alene affix list</li>
            <li>isFormatof: Reichard 1938 Coeur d'Alene grammar (affix discussion)</li>
            <li>Subject: List of Coeur d'Alene affixes identified by Reichard 1938</li>
            <li>Description: Coeur d'Alene affix list derived from Reichard 1938 grammar; Contains nearly 200 affixes including 5 affixes from Doak 1997; Affixes linked to original entry in Reichard 1938 at the Internet Archive. Developed in 2009 by COLRC Team members Shannon Bischoff and Musa yasin Fort; Updated in 2012 by COLRC Team members Amy Fountain, John Ivens, Ivy Doak, and Audra Vincent; Updated in 2019 by COLRC Team members John Ivens, Angela Hughes, Amaris Le Fay, Zhengnan Xie, Amy Fountain and Audra Vincent.</li>
            <li>Type: Text, HTML, Javascript, MySQL</li>
            <li>Source: Reichard 1938 Coeur d'Alene grammar</li>
            <li>Coverage: crd, Coeur d'Alene</li>
            <li>Coverage: 1927-1929</li>
            <li>Date: 2009</li>
            <li>Modified: 2012</li>
            <li>Creator (co-editor-COLRC Team): Shannon Bischoff (2009, 2012, 2019)</li>
            <li>Creator (co-editor-COLRC Team): Ivy Doak (2012)</li>
            <li>Creator (co-editor-COLRC Team): Amy Fountain (2012, 2019)</li>
            <li>Creator (co-editor-COLRC Team): John Ivens (2012, 2019)</li>
            <li>Creator (co-editor-COLRC Team): Audra Vincent (2012, 2019)</li>
            <li>Creator (co-editor-COLRC Team): Musa Yasin Fort (2009)</li>
            <li>Creator (co-editor-COLRC Team): Angela Hughes (2019)</li>
            <li>Creator (co-editor-COLRC Team): Amaris Le Fay (2019)</li>
            <li>Creator (co-editor-COLRC Team): Zhengnan Xie (2019)</li>
            <li>Contributor (informant): Dorothy Nicodemus</li>
            <li>Contributor (informant): Tom Miyal</li>
            <li>Contributor (linguist): Gladys Reichard</li>
            <li>Contributor (co-editor): Lawrence Nicodemus</li>
            <li>Contributor (co-editor): Julia Antelope Nicodemus</li>
            <li>Contributor (co-editor): Gladys Reichard</li>
            <li>Format: Javascript</li>
            <li>Identifier (permanent URL): original source [http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up2#page/n529/mode/2up]</li>
            <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/affix_list/crdafl09.php</li>
            <li>Identifier (COLRC NO.): crdafl09</li>
            <li>Language (ISO639-3): eng-US, English</li>
            <li>Language (ISO639-3): crd, Coeur d'Alene</li>
            <li>Language: Coeur d'Alene with English gloss</li>
          </ul>
    		</Accordion.Content>  
  	 </Accordion>
  	);
      return (     
	  	<div className='ui content'>
			<MetadataAffixesSubmenu />
		</div>
	);
  }
}


export default AffixMetadata;
