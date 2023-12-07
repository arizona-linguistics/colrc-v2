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

export default function RootsAccordion() {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Introduction</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            The root dictionary presented here was compiled by John Lyon and
            Rebecca Greene-Wood and contains nearly 1,400 roots and about 7690
            "word" forms. The data come from Lawrence Nicodemus's Coeur d'Alene
            dictionary. The original work was published by UMOPL and can be
            found at{" "}
            <a
              href="http://meltr.org/Publications/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lyon and Greene-Wood 2007
            </a>
            . All material is copyrighted by the Coeur d'Alene Tribe and may not
            be copied in any format without written permission from the Coeur
            d'Alene Tribe.
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Guide to Entries</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            For reasons of searchability and clarity of presentation, the
            organization of the dictionary has been altered from its original
            form. Roots with multiple entries are numbered. A single roots may
            be listed with multiple senses, and these senses are numbered -
            check the 'senses' column to view these numbers. Entries are
            displayed using the Nicodemus orthography, with their English
            translations. Select 'Salish' to view the entry written in the
            Salish orthography, with morpheme boundaries indicated.
          </span>
          <span>
            Grammatical information provided by Lawrence Nicodemus appears in
            the 'grammar' column. Nicodemus sometimes identifies the simplest
            forms as (stem), but not in all cases. By default, entries are
            ordered from simplest to most complex form, starting with those
            indicated as (stem). Intransitive and simple nominalized forms
            directly follow, then reduplicated forms, complex forms (those with
            lexical suffixes), and finally transitive forms and compounds.
          </span>
          <span>
            Symbols used to separate different kinds of entries can be found in
            the 'Symbols' column: intransitive (†), transitive (‡), complex
            (//), and compound (§) entries. Entries begin with a root skeleton
            followed by the transliterated Coeur d'Alene, followed by
            Nicodemus's English translation, grammatical notations, and
            additional information.
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Guide to Symbols and Abbreviations
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div>
            The following symbols and abbreviations are used in this Dictionary:
            <ul className="ul-left-aligned">
              <li>√ — Lexical root</li>
              <li>+ — Boundary of derivational affix</li>
              <li>- — Boundary of inflectional affix</li>
              <li>= — Boundary of lexical affix</li>
              <li>' — Glottalization</li>
              <li>
                ‿ — Ligature (following proclitic set of intransitive pronouns)
              </li>
              <li>† — Intransitive entry</li>
              <li>‡ — Transitive entry</li>
              <li>{"//"} — Complex entry</li>
              <li>§ — Compound entry</li>
              <li>
                [ ] — Brackets for editorial emendations and special notes
              </li>
              <li>adj — Adjective</li>
              <li>adv — Adverb</li>
              <li>conj — Conjunction</li>
              <li>dim — Diminutive</li>
              <li>etym — Etymology</li>
              <li>excl — Exclamation</li>
              <li>gr — Greeting</li>
              <li>h/h — Him, her</li>
              <li>h/h/i — Him, her, it</li>
              <li>h/s/i — He, she, it</li>
              <li>imp — Imperative</li>
              <li>interj — Interjection</li>
              <li>lit — Literally</li>
              <li>l.w. — Loan word (lexical borrowing)</li>
              <li>metaph — Metaphorically</li>
              <li>N — Nicodemus</li>
              <li>n — Noun</li>
              <li>neg — Negative</li>
              <li>onom — Onomatopoeic</li>
              <li>orig — Originally</li>
              <li>pl — Plural</li>
              <li>pref — Prefix</li>
              <li>prep — Preposition</li>
              <li>pro(n) — Pronoun</li>
              <li>qu — Question</li>
              <li>ref — Referring to</li>
              <li>sg — Singular</li>
              <li>suf(f) — Suffix</li>
              <li>v — Verb</li>
              <li>vi — Verb-intransitive</li>
              <li>vt — Verb-transitive</li>
              <li>w/c — Which</li>
              <li>xref — Cross-reference</li>
            </ul>
          </div>
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
