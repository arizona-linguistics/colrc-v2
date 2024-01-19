import React from "react";
import SimpleKeyboard from "../../utils/SimpleKeyboard";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

export default function AffixesAccordion() {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Introduction</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            The stem list presented here was originally built by Gladys
            Reichard, and first published in the International Journal of
            American Linguistics in 1939. Reichard's list used her
            transcriptions, which are reproduced here in the 'Reichard' column.
            The list presented here has been supplemented with transliterations
            into the Coeur d'Alene orthography ('Nicodemus'), as well as two
            versions of a phonetic transcription system utilized by linguists -
            'Salish' is a version of the International Phonetic Alphabet that is
            used by many linguists who work with languages in this family. The
            list presented here also benefits from the additional analysis by
            linguist Ivy Doak, whose representations of the stems are presented
            in the 'Doak' column.
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Organization of the List</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            The stems are presented in several groups, following Reichard 1939.
            The groups are given as 'verbs', 'adverbs, interjections, and
            conjunctions', and 'nouns'. Where we are missing information about a
            particular transcriptions of the Coeur d'Alene stem, you will find "
            -- "; forms for which we have no English translation are noted.
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Keyboard</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <SimpleKeyboard />
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
