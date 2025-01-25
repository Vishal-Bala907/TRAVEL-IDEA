import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextareaAutosize } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addVisaRequest } from "../redux/slices/VisaRequest";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField"; // Added TextField import
import { submitVisaRequest } from "../server/basic/basic";
import { toast } from "react-toastify";
import ConfirmChoiceModal from '../confirmChoiceModal/ConfirmChoiceModal'

function AddVisitDetails({ setReqId, setStage, id }) {
  const [visitDetails, setVisitDetails] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [error, setError] = useState("");
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const Id = id;
  const visas = useSelector((state) => state.visas?.visas || []);
  const visabyId = visas.find((item) => item.id === Number(Id));

  const appointmentFees = visabyId?.embassyFees?.appointmentFees;
  console.log("appointmentFees", appointmentFees);
  //   const [reqId, setReqId] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleConfirm = () => {

    };
  const handleSubmit = async () => {
    if (!visitDetails) {
      setError("Please fill in the visit details.");
      return;
    }

    // Only validate appointmentDate if appointmentFees is greater than 0
    if (appointmentFees > 0 && !appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    // Convert the selected date to an ISO string using dayjs
    const isoDateString = appointmentDate
      ? appointmentDate.toISOString()
      : null;

    // Dispatch the action to update purposeOfVisit and appointmentDetails in Redux
    dispatch(
      addVisaRequest({
        ...visaRequests,
        purposeOfVisit: visitDetails,
        appointmentDetails: isoDateString,
      })
    );

    await setStage(3);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        p={6}
        bgcolor="white"
      >
        <Box
          width="100%"
          maxWidth="md"
          p={6}
          bgcolor="white"
          boxShadow={3}
          borderRadius={4}
        >
          <h2 className="text-xl font-semibold mb-4">Reason to Visit</h2>
          <TextareaAutosize
            minRows={4}
            placeholder="Enter visit details here..."
            value={visitDetails}
            onChange={(e) => setVisitDetails(e.target.value)}
            style={{
              width: "100%",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            aria-label="Visit Details"
          />
          {appointmentFees > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Appointment Date</h2>
              <DatePicker
                label="Appointment Date"
                value={appointmentDate}
                onChange={(newValue) => {
                  setAppointmentDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box sx={{ display: "block", mt: 2 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit Details
            </Button>
          </Box>
        </Box>
      </Box>
        <ConfirmChoiceModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
        />
    </LocalizationProvider>
  );
}

export default AddVisitDetails;
