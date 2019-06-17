import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';


class SpellingAccordion extends Component {

  render() {
	  const spellingIntro = 
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
			          Coeur d'Alene has been spelled using at least three different
			          systems - the "Reichard Orthography" (see Reichard 1938),
			          the "Nicodemus Orthography" (see Nicodemus 1975a,b)
			          and the "Salishan Orthography". What we refer to as the
			          Reichard Orthography is a variation of the transcription system
			          used by many linguists and anthropologists trained by Franz Boas at
			          Columbia University in the first half of the 20th century. The
			          Nicodemus Orthography was developed for use by the Coeur d'Alene
			          community. The Salishan Orthography is used by many linguists and
			          anthropologists today to transcribe Coeur d'Alene. You will find it
			          used in contemporary scholarly work about the language. This site
			          is intended to support users who want to use any of these systems.
			        </p>
			        <p></p>
			        <p>
			          The list below shows how the symbols used in each of these three
			          systems correspond to each other. Not all of the sounds used in
			          the Coeur d'Alene language are familiar to English speakers, but
			          many of them are. Sounds in Coeur d'Alene that are also found in
			          English words are listed with examples from English so that
			          learners can familiarize themselves with those sounds.
			        </p>
				</AccordionItemBody>
			</AccordionItem>
			<AccordionItem>
				<AccordionItemTitle>
	                <div className="u-position-relative">
	                Pronunciation of Coeur d'Alene sounds
	                <div className="accordion__arrow" role="presentation" />
	            	</div>				
				</AccordionItemTitle>
				<AccordionItemBody>
					<p>Coeur d'Alene uses some sounds that will be unfamiliar to English speakers. In this resource, we provide information about how the sounds are pronounced, using the terminology that linguists have developed to describe these processes.  For those who don't (yet) have training in "articulatory phonetics", we recommend working with a teacher who can help you learn to pronounce the sounds.
					</p>
					<p>Linguists use the term "phoneme" to refer to a sound that is used to distinguish words in a particular language. The charts below, adapted from Doak 1997 and Barthmaier 1996, show the consonant and vowel phonemes of Coeur d'Alene, based on the ways in which each is pronounced. We have used the Salishan Orthography to represent these sounds, as we anticipate this resource to be of most use to scholars in linguistics. Students interested in learning how to pronounce Coeur d'Alene might also find these charts useful if they have some background in the study of "articulatory phonetics".</p>
				
				</AccordionItemBody>
			</AccordionItem>
	    </Accordion>
  	;

  return (     
	  	<div className='ui content'> 
			{spellingIntro}
		</div>
	);
  }
}

export default SpellingAccordion;
