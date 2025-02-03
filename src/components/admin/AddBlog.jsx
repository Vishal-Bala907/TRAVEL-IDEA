
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { addNewBlog } from "../server/admin/admin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCountry } from "../redux/slices/BlogSlice";
import { useForm } from "react-hook-form";
import AutofillCountry from "../../components/admin/AutofillCountry";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { CloudUpload, Image } from "@mui/icons-material";

const AddBlog = () => {
  const [countryName, setSelectedCountryName] = useState("");
  const [blog, setBlog] = useState({
    countryName: "",
    bannerImage: null,
    img1: null,
    img2: null,
    blogHeading: "",
    blogDescription: "",
    blogContent: "",
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prev) => ({ ...prev, [field]: file }));
    }
  };

  const updateField = (field, value) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.bannerImage || !blog.img1 || !blog.img2) {
      toast.error("Please upload all required images: Banner, Image 1, and Image 2", {
        position: "top-left",
      });
      return;
    }

    if (!countryName || !blog.blogHeading || !blog.blogDescription || !blog.blogContent) {
      toast.error("Please fill out all the blog details", {
        position: "top-left",
      });
      return;
    }

    const formData = new FormData();
    formData.append("countryName", countryName);
    formData.append("bannerImage", blog.bannerImage);
    formData.append("img1", blog.img1);
    formData.append("img2", blog.img2);
    formData.append("blogHeading", blog.blogHeading);
    formData.append("blogDescription", blog.blogDescription);
    formData.append("blogContent", blog.blogContent);

    addNewBlog(formData)
        .then((data) => {
          dispatch(addCountry(data));
          toast.success("Blog added successfully!", { position: "top-left" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to add blog. Please try again.", { position: "top-left" });
        });
  };

  const {
    control,
    watch,
    formState: { errors },
  } = useForm();
  const selectedCountry = watch("countryName");

  useEffect(() => {
    if (selectedCountry?.label) {
      setSelectedCountryName(selectedCountry?.label);
    }
  }, [selectedCountry?.label]);

  return (
      <Container maxWidth="lg" className="mt-8">
        <Paper elevation={3} className="p-6">
          <Typography variant="h4" gutterBottom className="font-bold text-center">
            Add New Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Country Name */}
            <Box className="mb-6">
              <Typography variant="h6" gutterBottom>
                Country Name
              </Typography>
              <AutofillCountry control={control} name="countryName" errors={errors} />
            </Box>

            {/* Banner Image */}
            <Box className="mb-6">
              <Typography variant="h6" gutterBottom>
                Banner Image
              </Typography>
              <label htmlFor="bannerImage" className="cursor-pointer">
                <Box
                    className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <CloudUpload fontSize="large" className="text-gray-500" />
                  <Typography variant="body1" className="mt-2 text-gray-600">
                    Click here to upload banner image
                  </Typography>
                  {blog.bannerImage && (
                      <img
                          src={URL.createObjectURL(blog.bannerImage)}
                          alt="Banner Preview"
                          className="mt-4 w-full max-h-64 object-cover rounded-lg"
                      />
                  )}
                </Box>
              </label>
              <input
                  id="bannerImage"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "bannerImage")}
              />
            </Box>

            {/* Blog Images */}
            <Grid container spacing={4} className="mb-6">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  First Blog Image
                </Typography>
                <label htmlFor="first" className="cursor-pointer">
                  <Box
                      className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Image fontSize="large" className="text-gray-500" />
                    <Typography variant="body1" className="mt-2 text-gray-600">
                      Click here to upload first image
                    </Typography>
                    {blog.img1 && (
                        <img
                            src={URL.createObjectURL(blog.img1)}
                            alt="First Image Preview"
                            className="mt-4 w-full max-h-64 object-cover rounded-lg"
                        />
                    )}
                  </Box>
                </label>
                <input
                    id="first"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "img1")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Second Blog Image
                </Typography>
                <label htmlFor="second" className="cursor-pointer">
                  <Box
                      className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Image fontSize="large" className="text-gray-500" />
                    <Typography variant="body1" className="mt-2 text-gray-600">
                      Click here to upload second image
                    </Typography>
                    {blog.img2 && (
                        <img
                            src={URL.createObjectURL(blog.img2)}
                            alt="Second Image Preview"
                            className="mt-4 w-full max-h-64 object-cover rounded-lg"
                        />
                    )}
                  </Box>
                </label>
                <input
                    id="second"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "img2")}
                />
              </Grid>
            </Grid>

            {/* Blog Heading */}
            <Box className="mb-6">
              <Typography variant="h6" gutterBottom>
                Blog Heading
              </Typography>
              <TextField
                  fullWidth
                  variant="outlined"
                  value={blog.blogHeading}
                  onChange={(e) => updateField("blogHeading", e.target.value)}
                  required
              />
            </Box>

            {/* Blog Description */}
            <Box className="mb-6">
              <Typography variant="h6" gutterBottom>
                Blog Description
              </Typography>
              <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={blog.blogDescription}
                  onChange={(e) => updateField("blogDescription", e.target.value)}
                  required
              />
            </Box>

            {/* Blog Content */}
            <Box className="mb-6">
              <Typography variant="h6" gutterBottom>
                Blog Content
              </Typography>
              <ReactQuill
                  theme="snow"
                  value={blog.blogContent}
                  onChange={(value) => updateField("blogContent", value)}
                  className="bg-white rounded-lg md:h-[300px] md:mb-12"
              />
            </Box>

            {/* Submit Button */}
            <Box className="text-center">
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Blog
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
  );
};

export default AddBlog;