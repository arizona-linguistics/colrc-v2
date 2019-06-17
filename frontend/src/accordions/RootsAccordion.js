import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class RootsAccordion extends Component {

    render() {
  		const rootsIntro = 
		    <Accordion>
		        <AccordionItem>
		            <AccordionItemTitle>
		                <div className="u-position-relative">
		                Introduction
		                <div className="accordion__arrow" role="presentation" />
		                </div>
		            </AccordionItemTitle>
		            <AccordionItemBody>
			            <p>The root dictionary presented here was compiled by John Lyon and Rebecca Greene-Wood and contains nearly 1,400 roots and about 7690 "word" forms. The data come from Lawrence Nicodemus's Coeur d'Alene dictionary. The original work was published by UMOPL and can be found at <a href="http://meltr.org/Publications/" target="_blank" rel="noopener noreferrer">Lyon and Greene-Wood 2007</a>. All material is copyrighted by the Coeur d'Alene Tribe and may not be copied in any format without written permission from the Coeur d'Alene Tribe.
					    </p>
					</AccordionItemBody>
				</AccordionItem>
				<AccordionItem>
		            <AccordionItemTitle>
		            	<div className="u-position-relative">
				    	Guide to Entries
		                <div className="accordion__arrow" role="presentation" />
		                </div>
				    </AccordionItemTitle>
				    <AccordionItemBody>
					    <p>For reasons of searchability and clarity of presentation, the organization of the dictionary has been altered from its original form. Within a root header, the entries are organized beginning with the least complex and move towards more complex forms. Each entry is separated by a new line and numbered. The entries first appear in the Salishan orthography, then the Nicodemus, and finally an English translation. Nicodemus sometimes identifies the simplest forms as (stem), but not in all cases. Intransitive and simple nominalized forms directly follow, then reduplicated forms, complex forms (those with lexical suffixes), and finally transitive forms and compounds. The following symbols are used to separate the different types of entries: intransitive (†), transitive (‡), complex (//), and compound (§) entries. Entries begin with a root skeleton followed by the transliterated Coeur d'Alene, followed by Nicodemus's English translation, grammatical notations, and additional information.
					    </p>
		            </AccordionItemBody>
		        </AccordionItem>
		    </Accordion>
	;
    return (
        <div className='ui content'>
        	{rootsIntro}
      	</div>
      );
    }
}

export default RootsAccordion;
