import React, { Component } from 'react';
import {
    Accordion,
	Icon,
} from 'semantic-ui-react';

class StemsMetadata extends Component {
	state = { activeIndex: 0 }
	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index
	    this.setState({ activeIndex: newIndex })
	  }
    render() {
      const { activeIndex } = this.state
  		const MetadataStemsSubmenu = () => (
  		  <Accordion fluid styled>
  				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
  					<Icon name='dropdown' />
  					Reichard's Original StemList
  				</Accordion.Title>
  				<Accordion.Content active={activeIndex === 0}>
            <ul className="ul-left-aligned">
              <li>Title: Stem-List of the Coeur d'Alene Language</li>
              <li>isFormatof:Stem-List of the Coeur d'Alene Language</li>
              <li>Subject: Coeur d'Alene stem-list with English glosses</li>
              <li>Description: Coeur d'Alene stem-list; Reichard's 1939 Coeur d'Alene stem-list with English glosses in PDF and PNG format. Original published in the International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108) as "Stem-List of the Coeur d'Alene Language", author Gladys Reichard.</li>
              <li>Type: Text, HTML</li>
              <li>Source: International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108)</li>
              <li>Coverage: crd, Coeur d'Alene</li>
              <li>Coverage: 1939</li>
              <li>Date: 1939</li>
              <li>Date: 2009</li>
              <li>Modified: 2012</li>
              <li>Creator (co-editor-COLRC Team): Shannon Bischoff (2009, 2012)</li>
              <li>Creator (co-editor-COLRC Team): Ivy Doak (2012)</li>
              <li>Creator (co-editor-COLRC Team): Amy Fountain (2012)</li>
              <li>Creator (co-editor-COLRC Team): John Ivens (2012)</li>
              <li>Creator (co-editor-COLRC Team): Audra Vincent (2012)</li>
              <li>Creator (co-editor-COLRC Team): Musa Yasin Fort (2009)</li>
              <li>Contributor (informant): Dorothy Nicodemus</li>
              <li>Contributor (informant): Tom Miyal</li>
              <li>Contributor (linguist): Gladys Reichard</li>
              <li>Contributor (co-editor): Lawrence Nicodemus</li>
              <li>Contributor (co-editor): Julia Antelope Nicodemus</li>
              <li>Contributor (co-editor): Gladys Reichard</li>
              <li>Rights Management(original publication): Copyright expired, in public domain</li>
              <li>Format: PDF and PNG</li>
              <li>Identifier: http://www.jstor.org/stable/1263228</li>
              <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/COLRC/stem_list/crdrsl_orig09.pdf</li>
              <li>Identifier (COLRC NO.): crdrsl_orig09</li>
              <li>Language (ISO639-3): eng-US, English</li>
              <li>Language (ISO639-3): crd, Coeur d'Alene</li>
              <li>Language: Coeur d'Alene with English gloss</li>
            </ul>
  				</Accordion.Content> 
          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Reichard's Stem List in the COLRC
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ul className="ul-left-aligned">
              <li>Title: Annotated stem list</li>
              <li>isFormatof:Stem-List of the Coeur d'Alene Language</li>
              <li>Subject: Coeur d'Alene stem-list with English glosses</li>
              <li>Description: Coeur d'Alene stem-list; Reichard's 1939 Coeur d'Alene stem-list with English glosses in HTML format. Original HTML, this version, created by Shannon Bischoff and Musa Yasin-Fort 2009. Modified further by Amy Fountain and John Ivens 2012. No content altered, only formatting and orthography change for ease of search and view on the web. Orthography should be viewed as "interpretation of" Reichard orthography. Original published in the International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108) as "Stem-List of the Coeur d'Alene Language", author Gladys Reichard.</li>
              <li>Type: Text, HTML</li>
              <li>Source: International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108)</li>
              <li>Coverage: crd, Coeur d'Alene</li>
              <li>Coverage: 1939</li>
              <li>Date: 2009</li>
              <li>Modified: 2012</li>
              <li>Creator (co-editor-COLRC Team): Shannon Bischoff (2009, 2012)</li>
              <li>Creator (co-editor-COLRC Team): Ivy Doak (2012)</li>
              <li>Creator (co-editor-COLRC Team): Amy Fountain (2012)</li>
              <li>Creator (co-editor-COLRC Team): John Ivens (2012)</li>
              <li>Creator (co-editor-COLRC Team): Audra Vincent (2012)</li>
              <li>Creator (co-editor-COLRC Team): Musa Yasin Fort (2009)</li>
              <li>Contributor (informant): Dorothy Nicodemus</li>
              <li>Contributor (informant): Tom Miyal</li>
              <li>Contributor (linguist): Gladys Reichard</li>
              <li>Contributor (co-editor): Lawrence Nicodemus</li>
              <li>Contributor (co-editor): Julia Antelope Nicodemus</li>
              <li>Contributor (co-editor): Gladys Reichard</li>
              <li>Rights Management(original publication): Copyright expired, in public domain</li>
              <li>Format: HTML</li>
              <li>Identifier: http://www.jstor.org/stable/1263228</li>
              <li>Identifier (COLRC URL): http://lasrv01.ipfw.edu/crd_test/stem_list/crdrsl_html09.php</li>
              <li>Identifier (COLRC NO.): crdrsl_html09</li>
              <li>Language (ISO639-3): eng-US, English</li>
              <li>Language (ISO639-3): crd, Coeur d'Alene</li>
              <li>Language: Coeur d'Alene with English gloss</li>
            </ul>
          </Accordion.Content>   
          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            This Stem List
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <ul className="ul-left-aligned">
              <li>Title: Annotated stem list</li>
              <li>isFormatof:Stem-List of the Coeur d'Alene Language</li>
              <li>Subject: Coeur d'Alene stem-list with English glosses</li>
              <li>Description: Coeur d'Alene stem-list; Reichard's 1939 Coeur d'Alene stem-list with English glosses in HTML format. Original HTML, this version, created by Shannon Bischoff and Musa Yasin-Fort 2009. Modified further by Ivy Doak, Amy Fountain and John Ivens 2012. Content added based on additional resources available to Bischoff and Doak, formatting and orthography optomized ease of search and view on the web. Orthography should be viewed as "interpretation of" Reichard orthography. Primary source originally published in the International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108) as "Stem-List of the Coeur d'Alene Language", author Gladys Reichard.</li>
              <li>Type: Text, HTML, Javascript, mySQL</li>
              <li>Source: International Journal of American Linguistics Vol. 10, No. 2/3, Nov., 1939 (pp. 92-108)</li>
              <li>Coverage: crd, Coeur d'Alene</li>
              <li>Coverage: 1939</li>
              <li>Date: 2009</li>
              <li>Modified: 2012-2013, 2019</li>
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
              <li>Rights Management(original publication): Copyright expired, in public domain</li>
              <li>Format: HTML</li>
              <li>Identifier: http://www.jstor.org/stable/1263228</li>
              <li>Identifier (COLRC URL): http://lasrv01.pfw.edu/crd_test/stem_list/crdrsl_html13.php</li>
              <li>Identifier (COLRC NO.): crdrsl_html13</li>
              <li>Language (ISO639-3): eng-US, English</li>
              <li>Language (ISO639-3): crd, Coeur d'Alene</li>
              <li>Language: Coeur d'Alene with English gloss</li>
            </ul>
          </Accordion.Content>   
  			</Accordion>
  	   )
	
      return (     
	  	<div className='ui content'>
			<MetadataStemsSubmenu />
		</div>
	);
  }
}


export default StemsMetadata;
