import React from "react";
import { Link } from "react-router-dom";
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
            The the nearly 200 affixes included here come from{" "}
            <a
              href="http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gladys Reichard's 1938 grammar
            </a>
            . Nearly all affixes are taken from this source, and these include a
            link to the relevant page of the original publication. The
            sub-section in which the affix appears is given in parentheses "(
            )". A few entries come from{" "}
            <Link to="/bibliography">Doak 1997</Link>, which is not accessible
            online, and so these are not linked. Affixes that Reichard
            identified as variants of other forms are indicated as such, with
            links to the main entry given by Reichard.
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
