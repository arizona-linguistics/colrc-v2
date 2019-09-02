import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { 
	Accordion, 
	Icon,
} from 'semantic-ui-react'

class RootsHistory extends Component {
 	state = { activeIndex: 0 }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  render() {
    const { activeIndex } = this.state;
	  const HistoryRootsSubmenu = () => (
    <Accordion fluid styled>
  		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
  			<Icon name='dropdown' />
  			Lawrence Nicodemus' Coeur d'Alene Dictionary in Root Format
  		</Accordion.Title>
		  <Accordion.Content active={activeIndex === 0}>
      <p>Edited by John Lyon and Rebecca Greene-Wood, 2007</p>
      <p>Lawrence Nicodemus's Coeur d'Alene Dictionary in Root Format, by John Lyon and Rebecca Greene-Wood (2007) is a reworking of the dictionary compiled by Lawrence Nicodemus and published by the Coeur d'Alene Tribe in 1975. The original dictionary, Nicodemus' Snchitsu'umshtsn: The Coeur d'Alene Language, appeared in two volumes, the first from Coeur d'Alene to English (1975a, vol. 1) and the second from English to Coeur d'Alene (1975a, vol. 2). The dictionary volumes were part of a larger project supported by the Institute of American Indian Arts (Nicodemus 1973:3) that included a textbook and an accompanying set of six audio tapes (1975b). The project was a collaborative work produced and designed by Southwest Research Associates, Inc. (SRA), of Albuquerque, NM (1975a:i, ii, 1975b:ii).</p>
      <p>Lyon and Greene-Wood's version of the dictionary is in a format that is conducive for comparative research in Salishan morphology. Similar root-formatted dictionaries exist for other Salishan languages (see, for example, Mattina 1987, Thompson and Thompson 1996). Like Mattina's Colville-Okanagan Dictionary (1987), Lyon and Greene-Wood's version of the Nicodemus dictionary omits vowels from the root entries. This provides an easy way to search for any root, the essential element of each Coeur d'Alene word. In a language such as Coeur d'Alene, where vowel harmony, both progressive and regressive, and unstressed vowel reduction occur, it is often difficult to tell what the underlying vowel of a root may be without evidence provided by a stressed root form unaffected by harmony-inducing affixes. Lyon and Greene-Wood's format thus allows the researcher or language learner to base their inquiry on the root consonants.</p>
      <p>The work of Lyon and Greene-Wood is presented here as a list of the roots in Salishan orthography, with vowels extracted, followed by all the forms provided by Nicodemus based on those roots. Each form is transcribed with analysis, marking lexical affixes (=) and other morpheme (+) boundaries. The Tribal spelling is also provided, along with the various definitions provided by Nicodemus. In the column presenting Nicodemus' definitions, Lyon and Greene-Wood indicate the classification of each definition with the following symbols: intransitive (†), transitive (‡), complex (//), and compound (§) entries.</p>
      <p>Problems with the modern version of the dictionary are mainly the result of errors in the original publication perpetuated or inadvertently amplified in the new edition. I will reiterate here some of the observations on the original volume, presented in Doak 2009: First, the dictionary is skewed to words that translate into English as words that begin with letters from the first half of the English alphabet. Second, some semantic fields are missing. The third problem is inconsistency in labeling each entry's part of speech: many of the entries represent full sentences, and thus cannot be identified as noun or verb or adjective. In other cases, a word is given several glosses, and the part of speech label matches not the Coeur d'Alene word but the English translation. A fourth problem is the lack of syntactic or morphological analysis in Nicodemus' original dictionary. An entry such as lutasp'a'qhs ‘the wound did not heal' has the same syntactic construction as the entry lut ha sqhests ‘it is not good'. Both are based on the negative root followed by a specifier and a nominalized predicate: //lut he s--s//. But each of these forms is presented uniquely, one as a single word, one as a sequence. The fifth and most significant problem with Nicodemus' work is his reliance on an orthography, designed by SRA and adopted by the Tribe in 1976, that does not include a symbol for schwa; is inconsistent in marking essential phonological elements such as laryngealization, glottal stops, and stress; and inconveniently uses up to three character spaces to indicate a single sound (in a polysynthetic language such as Coeur d'Alene, this results in exceptionally long words). Finally, the dictionary is rife with typographical errors.</p>
      <p>The work of Lyon and Greene-Wood is exceptional, considering the source of their data. They methodically re-transcribed the entries in both Nicodemus volumes into standard Salishan orthography, a system based on the American Phonetic Alphabet, then attempted to identify each root. The root was stripped of its vowels and introduced as a unique entry in the new dictionary. All the forms identified as being based on the root appear as subentries, which include morphological analysis. Appendices follow the main section of the dictionary and include lists of affixes, unverified affixes, other morphemes, borrowings, etc.</p>
      <p>Lyon and Greene-Wood's interpretation of Nicodemus' data provide insight into word construction that is invisible in the original work, but problems exist. Vowels that Nicodemus spelled out in the SRA orthography do not occur in the actual pronunciation of some words, leading Lyon and Greene-Wood to perpetuate phonological misrepresentations of lexical items. For example, Nicodemus uses e, i, u, as well as greater-than and less-than signs, to represent schwa, and Lyon and Greene-Wood wind up with full vowels in their transcriptions where they do not occur in the language. Also, the inconsistency of Nicodemus' word analyses make it difficult to see related forms. The entries with identical syntactic structures beginning with the root √lut described above are still presented as unique constructions in Lyon and Greene-Wood (see items 51 and 81 under the root √lt 1).</p>
      <p>Nicodemus' omission of analysis has allowed Lyon and Greene-Wood to overlook lexical relationships as well as syntactic relationships. Notice the two separate roots, √ʔkʷn and √ʔkʷs. Coeur d'Alene regularly reduces sequences of alveolar segments, an example being where /n/ is deleted preceding /s/ in particular environments. However, since Nicodemus doesn't identify morphemes, Lyon and Greene-Wood present the root √ʔekwun ‘say, tell' as these two separate forms, when the second is a predictable variant of the first, n-final, form when it occurs before suffixes that begin with /s/. While the forms listed on this site are interesting, many of the analyses should be considered in need of reevaluation.</p>
      <p>Lyon and Greene-Wood's print edition has a very complete explanation of their methods and describes the problems they encountered. It also includes useful appendices listing affixes of several types, borrowings, and items that remain unanalyzed.</p>
      </Accordion.Content>
      <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
        <Icon name='dropdown' />
        References
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <p>See also our <Link to="/bibliography">Bibliography</Link></p>
        <ul className="ul-left-aligned">
          <li>Doak, Ivy. 2009. Review of Lawrence Nicodemus's Coeur d'Alene Dictionary in Root Format, Edited by John Lyon and Rebecca Greene-Wood, 2007. AL 51.1:78-82.</li>
          <li>Lyon, John, and Rebecca Greene-Wood, eds. 2007. Lawrence Nicodemus's Coeur d'Alene Dictionary in Root Format. UMOPL 20. Missoula.</li>
          <li>Mattina, Anthony. 1987. Colville-Okanagan dictionary. UMOPL 5. Missoula.</li>
          <li>Nicodemus, Lawrence. 1973. The Coeur d'Alene Language Project Summary of Objectives and Contents. Presented at the Eighth International Salish Conference. Eugene, Oregon.</li>
          <li>Nicodemus, Lawrence. 1975. Snchitsu'umshtsn: The Coeur d'Alene language. Spokane: University Press. In two volumes: I The grammar and Coeur d'Alene-English dictionary; II English-Coeur d'Alene dictionary.</li>
          <li>Nicodemus, Lawrence. 1975b. Snchitsu'umshtsn: The Coeur d'Alene language. A modern course. Coeur d'Alene Tribe.</li>
          <li>Thompson, Laurence C., and M. Terry Thompson. 1996. Thompson River Salish Dictionary. UMOPL 12. Missoula.</li>
        </ul>
		  </Accordion.Content>  
	  </Accordion>
	)
    return (     
	  	<div className='ui content'>
			  <HistoryRootsSubmenu />
		  </div>
	  );
  }
}
export default RootsHistory;
