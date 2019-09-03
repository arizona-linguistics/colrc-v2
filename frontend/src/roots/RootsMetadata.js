import React, { Component } from 'react';
import {
  Accordion,
	Icon,
} from 'semantic-ui-react';

class RootsMetadata extends Component {
	state = { activeIndex: 0 }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
		const MetadataRootsSubmenu = () => (
		  <Accordion fluid styled>
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
					<Icon name='dropdown' />
					Root Dictionary
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
          <ul className="ul-left-aligned">
            <li>Title: Coeur d'Alene root dictionary</li> 
            <li>isVersionof: Lawrence Nicodemus's Coeur d'Alene dictionary in root format</li> 
            <li>isVersionof: Snchitsu'umshtsn: The Coeur d'Alene language. [In two volumes: I The grammar and Coeur d'Alene-English dictionary; II English- Coeur d'Alene dictionary]</li> 
            <li>Subject: Coeur d'Alene root dictionary with English glosses</li> 
            <li>Description: Coeur d'Alene roor dictionary; Lawrence Nicodemus' Coeur d'Alene dictionary in root format (root entries only). Original published by UMOPL and editted by Lyon, John and Greene-Wood, Rebecca. Original HTML, this version, created by Bischoff, Shannon and Yasin-Fort, Musa 2009. Modified further by Fountain, Amy and Ivens, John in 2012, and by Le Fay, Amaris, Xie, Zhengnan, Hughes, Angela, Ivens, John and Fountain, Amy in 2019. No content altered, only formatting for ease of search and view on the web.</li>
            <li>Type: Text</li> 
            <li>Source: Lawrence Nicodemus's Coeur d'Alene dictionary in root format 2009, Lyon, John and Greenwood, Rebecca, UMOPL</li> 
            <li>Coverage (ISO639-3): crd, Coeur d'Alene</li> 
            <li>Coverage: 1975, 2009, 2012, 2019</li> 
            <li>Date: 2009, 2012, 2019</li> 
            <li>Creator (co-editor-COLRC Team):Shannon Bischoff (2009, 2012)</li> 
            <li>Creator (co-editor-COLRC Team):Ivy Doak (2012)</li> 
            <li>Creator (co-editor-COLRC Team):Amy Fountain (2012, 2019)</li> 
            <li>Creator (co-editor-COLRC Team):John Ivens (2012, 2019)</li> 
            <li>Creator (co-editor-COLRC Team):Amaris Le Fey (2019)</li> 
            <li>Creator (co-editor-COLRC Team):Zhengnan Xie (2019)</li> 
            <li>Creator (co-editor-COLRC Team):Angela Hughes (2019)</li> 
            <li>Creator (co-editor-COLRC Team):Audra Vincent (2012, 2019)</li> 
            <li>Creator (co-editor-COLRC Team):Musa Yasin Fort (2009)</li> 
            <li>Creator (Original Publication Author):Lawrence Nicodemus (1975)</li> 
            <li>Creator (co-editor-Edited Edition):John Lyon (2009)</li> 
            <li>Creator (co-editor-Edited Edition):Rebecca Greenwood (2009)</li> 
            <li>Rights Management: Copyright Coeur d'Alene Tribe 2009</li> 
            <li>Format: HTML (2009, 2012)</li> 
            <li>Format: JavaScript, MySQL, graphQL (2019)</li> 
            <li>Identifier (ISBN): 9781879763203</li> 
            <li>Identifier (Stable URL): http://meltr.org/Publications/Volume20.htm</li> 
            <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/dictionary/crddict_html09.php</li> 
            <li>Identifier (COLRC NO.): crddict_html09</li> 
            <li>Language (ISO639-3): eng-US, English</li> 
            <li>Language (ISO639-3): crd, Coeur d'Alene</li> 
          </ul>  
				</Accordion.Content>  
			</Accordion>
	   );
    return (     
	  <div className='ui content'>
			<MetadataRootsSubmenu />
		</div>
	  );
  }
}


export default RootsMetadata;
