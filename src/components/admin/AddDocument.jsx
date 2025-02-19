import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { addNewDocumentType } from "../server/admin/admin";
import CircleSpinner from "../spinner/CircleSpinner";
import { toast } from "react-toastify";
const AddDocument = ({ setSpinnerLoading }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSpinnerLoading(true);

    addNewDocumentType({
      documentName: data.documentTypeName,
    })
      .then((data) => {
        reset();
        toast.success(
          "Document Added... , Please Refresh the page to view changes",
          {
            position: "top-left",
          }
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to add Document... 🙁🙁🙁");
      })
      .finally(() => {
        setSpinnerLoading(false);
      });
  };
  // if (loading) {
  //   return <CircleSpinner />;
  // }

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
        Add Document Type
      </Typography>

      {/* Document Type Name Field */}
      <Controller
        name="documentTypeName"
        control={control}
        defaultValue=""
        rules={{ required: "Document type name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Document Type Name"
            fullWidth
            error={!!errors.documentTypeName}
            helperText={errors.documentTypeName?.message}
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

export default AddDocument;
