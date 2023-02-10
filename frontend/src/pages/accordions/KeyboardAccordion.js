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

export default function KeyboardAccordion() {
  return (
      <Accordion allowZeroExpanded>
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

