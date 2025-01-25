import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { updatImage } from "../../server/admin/admin";
import { useDispatch } from "react-redux";
import { addAllVisas } from "../../redux/slices/Visas";

const UpdateImage = ({ setUpdating, visaId, currentImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${currentImageUrl}`
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const dispatch = useDispatch();
  const handleUpdateClick = async () => {
    if (!selectedImage) return;
    setUpdating(true);
    try {
      setIsUploading(true);

      // Convert the file to Base64
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]); // Exclude the data URI prefix
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

      const base64Image = await toBase64(selectedImage);

      // Prepare ImageUpdateDTO object
      const imageUpdateDTO = {
        visaId,
        image: base64Image,
        originalName: selectedImage.name,
      };

      // Send to backend
      updatImage(imageUpdateDTO)
        .then((data) => {
          console.log(data);

          dispatch(addAllVisas(data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setUpdating(false);
        });
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        padding: 4,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Image
      </Typography>

      {/* Image Preview */}
      {previewImageUrl && (
        <Box sx={{ mb: 2 }}>
          <img
            src={previewImageUrl}
            alt="Preview"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      )}

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="imageUpload"
      />
      <label htmlFor="imageUpload">
        <Button variant="outlined" component="span" sx={{ mb: 2 }}>
          Choose Image
        </Button>
      </label>

      {/* Update Button */}
      <Button
        variant="contained"
        onClick={handleUpdateClick}
        disabled={!selectedImage || isUploading}
        fullWidth
      >
        {isUploading ? "Updating..." : "Update Image"}
      </Button>
    </Box>
  );
};

export default UpdateImage;
