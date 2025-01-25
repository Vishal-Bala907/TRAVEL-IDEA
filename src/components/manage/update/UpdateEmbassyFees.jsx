import React, { memo, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid2,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { updateEmbassyFees } from "../../server/admin/admin";
import { useDispatch } from "react-redux";
import { addAllVisas } from "../../redux/slices/Visas";

const UpdateEmbassyFees = ({ visaId, setUpdating, initialData }) => {
  console.log(initialData);
  const [appointmentFees, setAppointmentFees] = useState(
    initialData.appointmentFees || 0
  );
  const [fees, setFees] = useState(initialData.fees || []);

  const handleFeeChange = (index, field, value) => {
    const updatedFees = [...fees];
    updatedFees[index][field] = value;
    setFees(updatedFees);
  };

  const handleAddFee = () => {
    setFees([...fees, { minAge: 0, maxAge: 0, fees: 0 }]);
  };

  const handleDeleteFee = (index) => {
    const updatedFees = fees.filter((_, i) => i !== index);
    setFees(updatedFees);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    setUpdating(true);
    const updatedData = {
      appointmentFees,
      fees,
    };
    updateEmbassyFees(visaId, updatedData)
      .then((response) => {
        dispatch(addAllVisas(response));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Update Embassy Fees
      </Typography>

      {/* Appointment Fees */}
      <TextField
        label="Appointment Fees"
        type="number"
        value={appointmentFees}
        onChange={(e) => setAppointmentFees(Number(e.target.value))}
        fullWidth
        sx={{ mb: 3 }}
        required
      />

      {/* Fees Structure */}
      <main className="flex flex-col gap-4 max-h-[600px] overflow-auto">
        {fees.map((fee, index) => (
          <React.Fragment key={fee.id}>
            {/* Min Age */}
            <Grid2 item xs={3}>
              <TextField
                label="Min Age"
                type="number"
                value={fee.minAge}
                onChange={(e) =>
                  handleFeeChange(index, "minAge", Number(e.target.value))
                }
                fullWidth
                required
              />
            </Grid2>

            {/* Max Age */}
            <Grid2 item xs={3}>
              <TextField
                label="Max Age"
                type="number"
                value={fee.maxAge}
                onChange={(e) =>
                  handleFeeChange(index, "maxAge", Number(e.target.value))
                }
                fullWidth
                required
              />
            </Grid2>

            {/* Fee Amount */}
            <Grid2 item xs={4}>
              <TextField
                label="Fees"
                type="number"
                value={fee.fees}
                onChange={(e) =>
                  handleFeeChange(index, "fees", Number(e.target.value))
                }
                fullWidth
                required
              />
            </Grid2>

            {/* Delete Button */}
            <Grid2 item xs={2} display="flex" alignItems="center">
              <IconButton onClick={() => handleDeleteFee(index)}>
                <Delete />
              </IconButton>
            </Grid2>
          </React.Fragment>
        ))}
      </main>

      {/* Add Fee Button */}
      <Button
        startIcon={<Add />}
        onClick={handleAddFee}
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Fee
      </Button>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 3 }}
      >
        Update Fees
      </Button>
    </Box>
  );
};

export default memo(UpdateEmbassyFees);
