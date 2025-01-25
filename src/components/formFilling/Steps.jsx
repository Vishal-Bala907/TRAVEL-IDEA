"use client";
import * as React from "react";
import PassportForm from "./PassportForm";
import UploadDocument from "./UploadDocument";
import MakePayment from "./MakePayment";
import AddVisitDetails from "./AddVisitDetails";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaLock } from "react-icons/fa6";
import { useEffect } from "react";

export default function Steps({ id }) {
  const Id = id;

  // console.log("visaRequests", visaRequests);
  const [stage, setStage] = React.useState(1);
  const [reqId, setReqId] = React.useState(null);
  // console.log("stage", stage);

  useEffect(() => {
    // console.log("stage", stage);
  }, [stage]);
  return (
    <Box className="w-full max-w-4xl mx-auto p-4">
      <Accordion expanded={stage >= 1}>
        <AccordionSummary
          expandIcon={stage >= 1 ? "" : <FaLock />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Step 1: Passport Form</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PassportForm setStage={setStage} />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={stage >= 2} disabled={stage < 2}>
        <AccordionSummary
          expandIcon={stage >= 2 ? "" : <FaLock />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Step 2: Visit Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stage >= 2 && (
            <AddVisitDetails setReqId={setReqId} setStage={setStage} id={Id} />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={stage >= 3} disabled={stage < 3}>
        <AccordionSummary
          expandIcon={stage >= 3 ? "" : <FaLock />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Step 3: Upload Documents</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stage >= 3 && (
            <UploadDocument
              setReqId={setReqId}
              stage={stage}
              setStage={setStage}
              id={Id}
            />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={stage >= 4} disabled={stage < 4}>
        <AccordionSummary
          expandIcon={stage >= 4 ? "" : <FaLock />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Step 4: Make Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stage >= 4 && (
            <MakePayment reqId={reqId} setStage={setStage} id={Id} />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
