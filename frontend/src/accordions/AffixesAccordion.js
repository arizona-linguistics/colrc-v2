import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';


class AffixesAccordion extends Component {

    render() {

	  	const affixesIntro = 
		    <Accordion>
		        <AccordionItem>
		            <AccordionItemTitle>
		                <div className="u-position-relative">
		                Introduction
		                <div className="accordion__arrow" role="presentation" />
		            	</div>
		            </AccordionItemTitle>
		            <AccordionItemBody>
				      <p>
				        The the nearly 200 affixes included here come from <a href="http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up" target="_blank" rel="noopener noreferrer">Reichard's 1938 grammar</a> (listed as 'Reichard 1938' on the left menu). Nearly all affixes are taken from Reichard 1938, these include a link to the relevant page of the original publication.  The sub-section in which the affix appears is given in parentheses "( )". A very small number of entries come from Doak 1997, which is not accessible online. Affixes that Reichard identified as variants of other forms are indicated as such, with links to the main entry given by Reichard.
				      </p>
					</AccordionItemBody>
				</AccordionItem>
		    </Accordion>
		;

    return (
        <div className='ui content'>
	      	{affixesIntro}
      	</div>
      );
    }
}

export default AffixesAccordion;
