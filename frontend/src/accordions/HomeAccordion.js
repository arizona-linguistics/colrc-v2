import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class HomeAccordion extends Component {

    render() {
	  const homeIntro =
	    <Accordion>
			<AccordionItem>
				<AccordionItemTitle>
	                <div className="u-position-relative">
	                Site history
	                <div className="accordion__arrow" role="presentation" />
	            	</div>
				</AccordionItemTitle>
				<AccordionItemBody>
				 	<p> The original Coeur d'Alene archive was created by Shannon Bischoff and Musa Yassin Fort in the summer of 2009. The original website was created without any prior web design/building knowledge using <a href="http://www.w3schools.com/" target="_blank" rel="noopener noreferrer">w3schools.com</a> free tutorials over a period of six weeks.  The site was constructed using simple html, javascript, and css code, all designed based on lessons at the site. The search mechanisms were a bit more complicated and required php, which can also be learned at the w3 schools website. </p>
		        	<p>A second version of the website is was developed in 2013 with the support of the National Science Foundation (award numbers BCS-1160394 and BCS-1160627), using these freely available, open-source, and easily learnable tools - expanded to include xml and ajax. You can find free tutorials for all of these tools at <a href="http://www.w3schools.com" target="blank" rel="noopener noreferrer">w3schools.com</a>.</p>
		          	<p>The current version of the site has been redeveloped beginning in 2019 with the support of the National Endowment for the Humanities award number PD-261031-18, using more specialized open-source tools that allow increased functionality and responsive design.  The site is developed and maintained using React and mySQL.  You can find free tutorials for these tools in a number of venues, including YouTube.</p>
				</AccordionItemBody>
			</AccordionItem>
				<AccordionItem>
				<AccordionItemTitle>
	                <div className="u-position-relative">
	                Addition of resources
	                <div className="accordion__arrow" role="presentation" />
	            	</div>
				</AccordionItemTitle>
				<AccordionItemBody>
		 		  <p>Additional resources will be included, as well as further documentation about the methods used by Reichard and Nicodemus to collect many of these resources. We also will be posting our source files (for all material other than the language resources themselves) to the site, so that anyone who would like to make use of our code to develop their own websites may do so. If you would like to help or have questions, comments or suggestions, please use the "contact us" page to let us know.
		          </p>
				</AccordionItemBody>
			</AccordionItem>
			<AccordionItem>
				<AccordionItemTitle>
	                <div className="u-position-relative">
	                External resources
	                <div className="accordion__arrow" role="presentation" />
	            	</div>
				</AccordionItemTitle>
				<AccordionItemBody>
				 	<p> 
				 	The COLRC also links to <a href="http://ivydoak.com/Coeurd'Alene/grammar/crgrammar.htm">Ivy Doak's grammatical sketch</a> of Coeur d'Alene.  Other websites with Coeur d'Alene material include the following:  The official Coeur d'Alene <a href="http://www.cdatribe-nsn.gov/" target="_blank" rel="noopener noreferrer">website</a>; the 1917 publication of Teit's <a href="http://www.archive.org/stream/folktalesofsalis00boas#page/119/mode/1up" target="_blank" rel="noopener noreferrer">Coeur d'Alene "tales"</a> which include different versions of a small number of the Coeur d'Alene texts in the archive; Reichard's 1938 grammar published in <a href="http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up" target="_blank" rel="noopener noreferrer">The Handbook of American Indian Languages v.3</a>; Reichard's 1947 <a href="http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up" target="_blank" rel="noopener noreferrer">An Analysis of Coeur d'Alene Indian Myths</a>, which is available at the University of Michigan Digital Library General Collection; and Lyon's 2010 <a href="http://www.sfu.ca/nwjl/Articles/V004_N02/LyonNicodemusCards.html" target="_blank" rel="noopener noreferrer">Lawrence Nicodemus's Snchitsu'umshtsn File Card Collection in Dictionary Format</a>.
          			</p>
				</AccordionItemBody>
			</AccordionItem>
	    </Accordion>
  	;	
      return (     
	  	<div className='ui content'>
			{homeIntro}
		</div>
	);
    }
}

export default HomeAccordion;