import React, { Component } from 'react';
import { 
	Accordion, 
	Icon,
	Image,
	Label,
} from 'semantic-ui-react';

class History extends Component {
 	state = { activeIndex: 0 }

	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }

    render() {
    const { activeIndex } = this.state;
	const ImageHistory1 = () => (
		<Image
		    src="./images/history1.jpg"
		    bordered
		  />
		);
	const ImageHistory2 = () => (
		<Image
		    src="./images/history2.jpg"
		    bordered
		  />
		);
	const History = () => (
    <Accordion fluid styled>
		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
			<Icon name='dropdown' />
			History of Materials: Introduction
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 0}>
		<p>An overview of the materials in this site (texts and grammar, stems and affixes) is presented below.  A discussion of the root dictionary can be found in the roots section of this site.</p>  
		</Accordion.Content>  
		<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Texts and Grammar (incomplete)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 1}>    
		    <p>The unpublished field notes and typed manuscripts of Coeur d'Alene myths and tales presented in this archive were recorded in 1927 and 1929 by Gladys Reichard. The COLRC contains a biographical sketch of Reichard by Julia S. Falk. The texts, or narratives, cover what Reichard classified into "myths and tales" and "tales with historical elements". The "myths and tales" are further divided into "Coyote cycle" and "myths not in Coyote cycle." She notes in her English translation (Reichard 1947:5-6) in the collection there are... the following regarding the narratives:
			    </p>
			    <p className="indentQuote">"In this collection there are thirty-eight myths, that is, accounts of things as they happened before the world was as it is now; two tales or accounts of happenings in the historical period; and ten narratives of actual historical encounters which were remembered by living people or which happened not less than a hundred years ago."
			    </p>
			    <p>The numbering of each text in the COLRC follows numbering of Reichard 1947 (cf. Figure 1 below) directly preceding the title. The unpublished manuscripts are numbered in accordance with Reichard's written number on each manuscript and the same is true of the fieldnotes (cf. Figure 2 below).The COLRC includes the Reichard 1947 number in the COLRC identifier for each narrative in its various forms (e.g. unpublished manuscripts, fieldnote, or audio recordings). In addition, the titles reflect Reichard 1947 and may differ from titles on field notes and typed manuscripts (see metadata for cross referencing).</p>
			    <span className="imageCenter">
			    {ImageHistory1() } 	
			    <Label size="mini" >Figure 1 from 1947 Table of Contents</Label>
			    <p></p>
			    {ImageHistory2() }
			    <Label size="mini">Figure 2 fieldnotes and typed manuscript</Label>
			    </span>
			    <p></p>
				<p>Reichard notes that some of the narratives were given no titles by the narrators. In such cases she chose a title that reflected the content of the narrative. Published English translations of each narrative/text, can be accessed by selecting the 'Published English Translation' link. This link will take the viewer to the pages of 'An Analysis of Coeur d'Alene Indian Myths' (Reichard 1947) found at the Internet Archive where the narrative translation can be found.</p>

				<p>The 1917 publication of Teit's Coeur d'Alene "tales" which include different versions of a small number of the Coeur d'Alene texts recorded by Reichard, and which Reichard makes reference to in her 1938 grammar, can also be found online at the Internet Archive.</p>

				<p>The narratives provided here were collected from photo-copies of Reichard's original manuscripts and the quality varies from text to text. Files are available for download in PDF form or as PNG files within the website. The list of complete narratives can be found here.</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Stem Lists (incomplete)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 2}>
		<p>Copy discussion of Stem Lists here</p>
		</Accordion.Content> 
		<Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Affix List (incomplete)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 3}>
		<p>Copy discussion of Affix List here</p>
		</Accordion.Content> 
		<Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Orthographies (incomplete)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 4}>
		<p>Copy discussion of orthographies here</p>
		</Accordion.Content> 
			<Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
			<Icon name='dropdown' />
			References (incomplete)
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 5}>
		<p>Copy references here - or just point to bibliography?</p>
		</Accordion.Content> 
	</Accordion>

	);
	
      return (     
	  	<div className='ui content'>
			<History />
		</div>
	);
  }
}


export default History;
