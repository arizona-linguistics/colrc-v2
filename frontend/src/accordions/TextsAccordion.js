import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class TextsAccordion extends Component {
  render() {
	  const textsIntro = 
	    <Accordion>
	      <AccordionItem>
          <AccordionItemTitle>
            <div className="u-position-relative">
              Introduction
            <div className="accordion__arrow" role="presentation" />
          	</div>
          </AccordionItemTitle>
	        <AccordionItemBody>
  			    <span>The Coeur d'Alene narratives presented here were recorded in 1927 and 1929 by Gladys Reichard, Dorthy Nicodemus, Julia Antelope Nicodemus and Tom Miyal. English translations of these texts were published in <a href="http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up" target="_blank" rel="noopener noreferrer">Reichard 1947</a>.  The original fieldnotes, which in most cases include a handwritten transcription that was later revised into a typed manuscript with interlinear glossing, were collected and digitized by Shannon Bischoff and Musa Yassin Fort in 2009, and are presented here along with the published English free translations.  In a few cases, audio recordings of the narrative are available here as well.</span>
            <p></p>
            <span>In the 1949 publication, titled 'An Analysis of Coeur D'Alene Indian Myths', Reichard classified the texts into two major groupings, which she called "myths and tales" and "tales with historical elements". The "myths and tales" are further divided into "Coyote cycle" and "myths not in Coyote cycle."  We have retained Reichard's organization and nominclature here, except that we present the narratives in three major groups (which we refer to as 'cycles'), rather than nesting them.</span>
            <p></p>
  					<span>In <a href="http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up" target="_blank" rel="noopener noreferrer">Reichard 1947</a>, each narrative is numbered.  The original fieldnotes, both in their handwritten and typed versions, are also numbered, and we have retained these numbering systems in our presentation.  In most cases, the numbers and titles are the same for each narrative regardless of format (handwritten fieldnotes, typed fieldnotes, published English translations), but in some cases they are inconsistent.  We group all of the versions of each narrative together in the table below, and retain the titling and numbering found in each set of original sources.</span>
            <p></p>
  					<span>Analysis of some texts along with other excellent Coeur d'Alene resources can be found at Ivy Doak's <a href="http://ivydoak.com/Coeurd%27Alene/" target="_blank" rel="noopener noreferrer">Coeur d'Alene website</a>. The 1917 publication of Teit's <a href="https://archive.org/stream/folktalesofsalis00boas#page/118/mode/1up" target="_blank" rel="noopener noreferrer">Coeur d'Alene "tales"</a> which include different versions of a small number of the Coeur d'Alene texts in the archive can also be found online.</span>
				  </AccordionItemBody>
			  </AccordionItem>
			<AccordionItem>
	      <AccordionItemTitle>
	        <div className="u-position-relative">
			    	Guide to Presentation
	        <div className="accordion__arrow" role="presentation" />
	        </div>
			</AccordionItemTitle>
		  <AccordionItemBody>
			  <span>The texts provided here were collected from photo-copies of Reichard's original manuscripts and quality varies from text to text. To accommodate different viewers' environments, these files are available for download in PDF form or as a corresponding set of image (PNG) files.</span>
        <p></p>
        <span>For those texts for which we have both hand-written and typed versions of the original field notes, we provide a view that allows you to see those versions side by side. This combined view provides insights into the complex process that this group of scholars navigated as they 'collected' the narrative and then worked to translate it.  The typed manuscripts represent an intermediate version of each text, in which the original hand-written notes are modified and corrected by the team, and interlinear glosses are settled on.  The collaborative nature of the original work is made visible to some extent in these documents.</span>
	    </AccordionItemBody>
	  </AccordionItem>
	</Accordion>
	  return (
      <div className='ui content'>
		    {textsIntro}
	   </div>
    );
  }
}

export default TextsAccordion;
