import React from 'react';
import SimpleKeyboard from "../../utils/SimpleKeyboard";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export default function BibliographyAccordion() {
  return (
      <Accordion allowZeroExpanded>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                    Information
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <span>This bibliography includes resources available outside the COLRC.  Where an online resource can be provided, we've linked to it directly; else we provide the bibliographic reference alone.</span>
              </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                    Keyboard
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <SimpleKeyboard />
              </AccordionItemPanel>
          </AccordionItem>
      </Accordion>
  );
}

