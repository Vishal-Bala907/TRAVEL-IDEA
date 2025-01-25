import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@mui/material";

const EmbassyFeesStructureForm = ({ onSubmit }) => {
  const [appointmentFees, setAppointmentFees] = useState("");
  const [ageRanges, setAgeRanges] = useState([
    { minAge: "", maxAge: "", fees: "" },
  ]);

  const handleAgeChange = (index, field, value) => {
    const updatedAgeRanges = [...ageRanges];
    updatedAgeRanges[index][field] = value;
    setAgeRanges(updatedAgeRanges);
  };

  const addAgeRange = () => {
    setAgeRanges([...ageRanges, { minAge: "", maxAge: "", fees: "" }]);
  };

  const removeAgeRange = (index) => {
    setAgeRanges(ageRanges.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      appointmentFees: Number(appointmentFees),
      fees: ageRanges.map((range) => ({
        minAge: Number(range.minAge),
        maxAge: Number(range.maxAge),
        fees: Number(range.fees),
      })),
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen my-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-md"
      >
        <Typography variant="h5" className="mb-4 text-center">
          Embassy Fees Structure Form
        </Typography>
        <Divider className="mb-4" />
        <TextField
          label="Appointment Fees"
          variant="outlined"
          type="number"
          fullWidth
          value={appointmentFees}
          onChange={(e) => setAppointmentFees(e.target.value)}
          className="mb-4"
        />
        <Typography variant="h6" className="mb-2">
          Age Ranges with Fees:
        </Typography>
        {ageRanges.map((range, index) => (
          <div key={index} className="flex flex-wrap gap-4 mb-4">
            <TextField
              label="Minimum Age"
              variant="outlined"
              type="number"
              fullWidth
              value={range.minAge}
              onChange={(e) => handleAgeChange(index, "minAge", e.target.value)}
            />
            <TextField
              label="Maximum Age"
              variant="outlined"
              type="number"
              fullWidth
              value={range.maxAge}
              onChange={(e) => handleAgeChange(index, "maxAge", e.target.value)}
            />
            <TextField
              label="Fees"
              variant="outlined"
              type="number"
              fullWidth
              value={range.fees}
              onChange={(e) => handleAgeChange(index, "fees", e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeAgeRange(index)}
              className="h-fit"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={addAgeRange}
          className="mb-4"
          fullWidth
        >
          Add Age Range
        </Button>
        <Divider className="mb-4" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmbassyFeesStructureForm;
