import React, { Component } from 'react';
import { Link } from "react-router-dom";

class About extends Component {

	render() {

	const AboutText = () => (

   <p> This resource contains the <Link to="/rootdictionary">Couer d'Alene Root Dictionary</Link> (<a href="http://meltr.org/Publications/" target="_blank" rel="noopener noreferrer">Lyon and Greene-Wood 2007</a>) with nearly 1,400 roots and about 7690 "word" forms,	Reichard's 1939 <a href="./stem_list">Stem List</a> with some 1,300 stems, a list of roughly <a href="./affix_list">200 affixes</a>, and over 1,200 pages of Coeur d'Alene <a href="./texts">texts</a> (copies of <a href="http://anthropology.usf.edu/women/reichard/reichard.html" target="_blank" rel="noopener noreferrer">Gladys Reichard's</a> 1927-1929 field notes and typed manuscripts) and English translations from <a href="http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up" target="_blank" rel="noopener noreferrer">Reichard 1947</a>. Resources to help with <Link to="/spelling">spelling and pronunciation</Link> of Coeur d'Alene include lists of the consonant and vowel phonemes of Coeur d'Alene, a comparison of the three different orthographies most commonly used to write Coeur d'Alene (Nicodemus, Reichard, and Salishan), and a guide to pronunciation.    A <a  href="./bibliography">working bibliography</a> is also included.  This bibliography continues to be updated as we identify additional resources.
	    </p>
	);
	
      return (     
	  	<div className='ui content'>
			<AboutText />
		</div>
	);
  }
}

export default About;
