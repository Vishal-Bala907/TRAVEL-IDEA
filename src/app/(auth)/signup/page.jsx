"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { registerUser } from "../../../components/server/register/index";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Signup Page Component
const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData)
      .then((data) => {
        toast.success(data, {
          position: "top-center",
        });
        router.push("/login");
      })
      .catch((err) => {
        // console.log("HEELo");
        if (err.response.status === 409) {
          toast.error("Please use a different Email/Number", {
            position: "top-center",
          });
        } else {
          toast.error("Something got wrong", {
            position: "top-center",
          });
        }
      });

    setFormData({
      email: "",
      userName: "",
      mobileNumber: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "fit-content",
        padding: "45px 0px",
        background: "linear-gradient(135deg, #4caf50, #81c784)",
        backgroundImage: "url('/img/general/travel.svg')",
        backgroundSize: "contain",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "fit-content",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            borderRadius: "10px",
            maxWidth: 400,
            backgroundColor: "#fff",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: 3,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Create an Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{
                marginBottom: 2,
                "& .MuiInputLabel-root": { color: "#D2B4F8" },
                "& .MuiInputBase-root": { backgroundColor: "#f5f5f5" },
              }}
            />
            <TextField
              label="Username"
              type="text"
              name="userName" // Corrected the name attribute here to match state variable
              fullWidth
              value={formData.userName}
              onChange={handleInputChange}
              required
              sx={{
                marginBottom: 2,
                "& .MuiInputLabel-root": { color: "#D2B4F8" },
                "& .MuiInputBase-root": { backgroundColor: "#f5f5f5" },
              }}
            />
            <TextField
              label="Mobile Number"
              type="tel"
              name="mobileNumber" // Corrected the name attribute here to match state variable
              fullWidth
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              sx={{
                marginBottom: 2,
                "& .MuiInputLabel-root": { color: "#D2B4F8" },
                "& .MuiInputBase-root": { backgroundColor: "#f5f5f5" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#331749",
                "&:hover": { backgroundColor: "#388e3c" },
              }}
            >
              Sign Up
            </Button>
          </form>
          <Box
            sx={{
              textAlign: "center",
              marginTop: 2,
              fontSize: "14px",
              color: "#888",
            }}
          >
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default page;
