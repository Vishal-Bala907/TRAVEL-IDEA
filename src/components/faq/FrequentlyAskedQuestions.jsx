import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FrequentlyAskedQuestions() {
  return (
    <>
      <div className="heading-div my-4">
        <h2 className="text-center font-lexend text-[32px] font-bold">
          Frequently Asked Questions (FAQs)
        </h2>
      </div>
      <div className="flex flex-col items-center mb-4">
        <Accordion className="w-full md:w-[60%] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              borderBottom: "2px solid #00000042",
            }}
          >
            <Typography component="span">
              How long does the visa process take?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="span">
              Processing times vary depending on the type of visa and the
              destination country. Tourist visas typically take 7-15 working
              days, while work and student visas may take longer.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-full md:w-[60%] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            style={{
              borderBottom: "2px solid #00000042",
            }}
          >
            <Typography component="span">
              What documents are required for a visa application?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="span">
              Required documents generally include a valid passport, recent
              photographs, financial proofs, travel itinerary, and
              destination-specific documents such as invitation letters or
              university admissions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-full md:w-[60%] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            style={{
              borderBottom: "2px solid #00000042",
            }}
          >
            <Typography component="span">
              Do you assist with rejected applications?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="span">
              Yes, we analyze your rejected application and help you reapply
              with improved documentation and adherence to embassy guidelines.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-full md:w-[60%] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
            style={{
              borderBottom: "2px solid #00000042",
            }}
          >
            <Typography component="span">
              Is visa assistance available for all countries?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="span">
              Yes, we provide visa services for a wide range of countries
              worldwide, including the USA, UK, Canada, European nations, and
              more.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
