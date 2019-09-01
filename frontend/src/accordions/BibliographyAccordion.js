import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class BibliographyAccordion extends Component {

render() {
  const bibIntro = 
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle>
          <div className="u-position-relative">
            Bibliography Information
          <div className="accordion__arrow" role="presentation" />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>
          <span>This bibliography includes resources available outside the COLRC.  Where an online resource can be provided, we've linked to it directly; else we provide the bibliographic reference alone.  If you have recommendations for items or links that could be added, please use the 'contact us' page to let us know about them!</span>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
    return (
      <div className='ui content'>
  		  {bibIntro}
  		</div>
    )
  }
 }


export default BibliographyAccordion;
