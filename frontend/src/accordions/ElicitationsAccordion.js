import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class ElicitationsAccordion extends Component {

  render() {
	 const elicitationsIntro = 
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle>
          <div className="u-position-relative">
            The Nicodemus - Sloat Word List Elicitations
          <div className="accordion__arrow" role="presentation" />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>
		    <span>The recordings and transcriptions here are taken from word list elicitation sessions involving Clarence Sloat and Lawrence Nicodemus.  Sloat's 1966 dissertation was based in part on these sessions.  Transcriptions of the words are provided by the Coeur d'Alene Language Programs.</span>
			</AccordionItemBody>
		</AccordionItem>
    </Accordion>
	  return (
      <div className='ui content'>
		    {elicitationsIntro}
	   </div>
    );
  }
}

export default ElicitationsAccordion;
