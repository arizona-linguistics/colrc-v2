import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

export default function HomeAccordion() {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Site History</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            <p>
              The{" "}
              <a
                href="http://lasrv01.pfw.edu/crd_archive/start1.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                original Coeur d'Alene Archive
              </a>{" "}
              was created by Shannon Bischoff and Musa Yassin Fort in the summer
              of 2009. The original website was created without any prior web
              design/building knowledge using{" "}
              <a
                href="http://www.w3schools.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                w3schools.com
              </a>{" "}
              free tutorials over a period of six weeks. The site was
              constructed using simple html, javascript, and css code, all
              designed based on lessons at the site. The search mechanisms were
              a bit more complicated and required php, which can also be learned
              at the w3 schools website.
            </p>
          </span>
          <span>
            <p>
              A{" "}
              <a
                href="http://lasrv01.pfw.edu/COLRC/"
                target="_blank"
                rel="noopener noreferrer"
              >
                second version of the website
              </a>{" "}
              is was developed in 2013 with the support of the National Science
              Foundation (award numbers BCS-1160394 and BCS-1160627), using
              these freely available, open-source, and easily learnable tools -
              expanded to include xml and ajax. You can find free tutorials for
              all of these tools at{" "}
              <a
                href="http://www.w3schools.com"
                target="blank"
                rel="noopener noreferrer"
              >
                w3schools.com
              </a>
              . That site includes our{" "}
              <a
                href="http://lasrv01.pfw.edu/COLRC/home/mission.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mission Statement
              </a>{" "}
              and{" "}
              <a
                href="http://lasrv01.pfw.edu/COLRC/home/history.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                History of Materials
              </a>
              .
            </p>
          </span>
          <span>
            <p>
              The current site's development began in 2019 with the support of
              the National Endowment for the Humanities award number
              PD-261031-18, using more specialized open-source tools that allow
              increased functionality and responsive design. The site is
              developed and maintained using{" "}
              <a
                href="https://nodejs.org/en/"
                target="blank"
                rel="noopener noreferrer"
              >
                Node.js
              </a>
              ,{" "}
              <a
                href="https://reactjs.org/"
                target="blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              ,{" "}
              <a
                href="https://graphql.org/"
                target="blank"
                rel="noopener noreferrer"
              >
                GraphQL
              </a>
              ,{" "}
              <a
                href="https://hasura.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hasura
              </a>{" "}
              and{" "}
              <a
                href="https://www.postgresql.org/"
                target="blank"
                rel="noopener noreferrer"
              >
                postgresSQL
              </a>{" "}
              (community edition). All of these tools are open source and
              available at no cost. You can find many excellent free tutorials
              on these tools at each resource homepage, and by searching online.
            </p>
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Addition of resources</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <span>
            Additional resources will be included, as well as further
            documentation about the methods used by Reichard and Nicodemus to
            collect many of these resources. We also will be posting our source
            files (for all material other than the language resources
            themselves) to the site, so that anyone who would like to make use
            of our code to develop their own websites may do so. If you would
            like to help or have questions, comments or suggestions, please
            contact the team.
          </span>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>External Links</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul className="ul-left-aligned">
            <li>
              The website of the{" "}
              <a
                href="http://www.cdatribe-nsn.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                the Coeur d'Alene Tribe
              </a>
            </li>
            <li>
              Ivy Doak's{" "}
              <a
                href="http://ivydoak.com/Coeurd'Alene/grammar/crgrammar.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                grammatical sketch
              </a>{" "}
              of Coeur d'Alene.
            </li>
            <li>
              The 1917 publication of James Teit's{" "}
              <a
                href="http://www.archive.org/stream/folktalesofsalis00boas#page/119/mode/1up"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coeur d'Alene "tales"
              </a>{" "}
              which include different versions of a small number of the Coeur
              d'Alene texts in the archive.
            </li>
            <li>
              Gladys Reichard's 1938 grammar published in{" "}
              <a
                href="http://www.archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Handbook of American Indian Languages v.3
              </a>
            </li>
            <li>
              Reichard's 1947{" "}
              <a
                href="http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up"
                target="_blank"
                rel="noopener noreferrer"
              >
                An Analysis of Coeur d'Alene Indian Myths
              </a>
              , which is available at the University of Michigan Digital Library
              General Collection
            </li>
            <li>
              John Lyon's 2010{" "}
              <a
                href="http://www.sfu.ca/nwjl/Articles/V004_N02/LyonNicodemusCards.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lawrence Nicodemus's Snchitsu'umshtsn File Card Collection in
                Dictionary Format
              </a>
              .
            </li>
            <li>
              The <Link to="/bibliography">bibliography</Link> section of this
              site includes a wide variety of published resources, with links to
              those that are available online.
            </li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
