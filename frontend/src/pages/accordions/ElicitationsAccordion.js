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

export default function ElicitationsAccordion() {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            The Nicodemus - Sloat Word List Elicitations
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            The recordings and transcriptions here are taken from word list
            elicitation sessions involving Clarence Sloat and Lawrence
            Nicodemus. Sloat's 1966 dissertation was based in part on these
            sessions. Transcriptions of the words are provided by the Coeur
            d'Alene Language Programs.
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
