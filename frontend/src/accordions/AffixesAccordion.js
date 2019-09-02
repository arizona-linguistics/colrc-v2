import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
            <span>The the nearly 200 affixes included here come from <a href="http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up" target="_blank" rel="noopener noreferrer">Gladys Reichard's 1938 grammar</a>. Nearly all affixes are taken from this source, and these include a link to the relevant page of the original publication.  The sub-section in which the affix appears is given in parentheses "( )". A few entries come from <Link to="/bibliography">Doak 1997</Link>, which is not accessible online, and so these are not linked. Affixes that Reichard identified as variants of other forms are indicated as such, with links to the main entry given by Reichard.</span>
			     </AccordionItemBody>
		    </AccordionItem>
	     </Accordion>
    return (
      <div className='ui content'>
        {affixesIntro}
      </div>
    );
  }
}

export default AffixesAccordion;
