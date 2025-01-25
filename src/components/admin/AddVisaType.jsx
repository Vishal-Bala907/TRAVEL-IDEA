"use client";
import React from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { addVisaType } from "../server/admin/admin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { addVisaTypes } from "../redux/slices/VisaTypeSlice";

const AddVisaType = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }, // Destructure errors here
  } = useForm();

  const dispatch = useDispatch();

  const options = (data) => ({
    title: "Confirm",
    message: "Confirm Add Visa type",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          if (data && data.visaTypeName) {
            // Proceed with adding the visa type
            addVisaType({
              visaType: data.visaTypeName, // Assuming `visaTypeName` is the data to be sent
            })
              .then((response) => {
                dispatch(addVisaTypes(response));
              })
              .catch((err) => {
                console.error("Error adding visa type:", err);
              });
          } else {
            console.error("No visaTypeName found in the data");
          }
        },
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  });

  const onSubmit = (data) => {
    confirmAlert(options(data)); // Pass data to confirmAlert
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mb: 3,
        p: 2,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        marginLeft: "20px",
        height: "fit-content",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Visa Type
      </Typography>

      {/* Visa Type Name Field */}
      <Controller
        name="visaTypeName"
        control={control}
        defaultValue=""
        rules={{ required: "Visa type name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Visa Type Name"
            fullWidth
            error={!!errors.visaTypeName}
            helperText={errors.visaTypeName?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Add Button */}
      <Button type="submit" variant="contained" fullWidth>
        Add
      </Button>
    </Box>
  );
};

export default AddVisaType;
