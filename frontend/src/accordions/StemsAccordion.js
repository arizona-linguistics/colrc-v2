import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class StemsAccordion extends Component {
  render() {
	  const stemsIntro = 
		  <Accordion>
		    <AccordionItem>
		      <AccordionItemTitle>
            <div className="u-position-relative">
              The COLRC Stem List
            <div className="accordion__arrow" role="presentation" />
          	</div>
		      </AccordionItemTitle>
		      <AccordionItemBody>
					  <span> The stem list presented here was originally built by Gladys Reichard, and first published in the International Journal of American Linguistics in 1939. Reichard's list used her transcriptions, which are reproduced here in the 'Reichard' column.  The list presented here has been supplemented with transliterations into the Coeur d'Alene orthography ('Nicodemus'), as well as two versions of a phonetic transcription system utilized by linguists - 'Salish' is a version of the International Phonetic Alphabet that is used by many linguists who work with languages in this family.  The list presented here also benefits from the additional analysis by linguist Ivy Doak, whose representations of the stems are presented in the 'Doak' column.</span>
					</AccordionItemBody>
				</AccordionItem>
				<AccordionItem>
		      <AccordionItemTitle>
		        <div className="u-position-relative">
				    	Organization
		        <div className="accordion__arrow" role="presentation" />
		        </div>
				  </AccordionItemTitle>
				  <AccordionItemBody>
				    <span> The stems are presented in several groups, following Reichard 1939. The groups are given as 'verbs',  'adverbs, interjections, and conjunctions', and 'nouns'. Where we are missing information about a particular transcriptions of the Coeur d'Alene stem, you will find " -- "; forms for which we have no English translation are noted.</span>
		      </AccordionItemBody>
		    </AccordionItem>
		  </Accordion>
    return (
      <div className='ui content'>
        {stemsIntro}
      </div>
    );
  }
}

export default StemsAccordion;
