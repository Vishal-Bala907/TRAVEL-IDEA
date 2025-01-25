"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Upload } from "lucide-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { addVisaRequest } from "../redux/slices/VisaRequest";
import { submitVisaRequest, uploadImage } from "../server/basic/basic";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const UploadDocument = ({ setReqId, stage, setStage, id }) => {
  const dispatch = useDispatch();
  const Id = id;

  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  const users = visaRequests?.visaRequest?.map((item) => ({
    id: uuidv4(),
    firstname: item?.request?.visa?.givenName,
    lastname: item?.request?.visa?.surname,
  }));
  const phone = useSelector((state) => state.user.phone);
  const visas = useSelector((state) => state.visas?.visas || []);
  const visabyId = visas.find((item) => item.id === Number(Id));
  const dummylabels = visabyId?.documents;

  const [activeTab, setActiveTab] = useState(0); // Use index for activeTab
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = async (index, docType, e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const imageUrl = await uploadImage(formData);
      setUploadedFiles((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [docType]: imageUrl,
        },
      }));
    }
  };

  const handleDeleteImage = (index, docType) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      if (newFiles[index]) {
        delete newFiles[index][docType];
      }
      return newFiles;
    });
  };

  const handleSaveDetails = async () => {
    // Create a deep copy of the visaRequests object
    const updatedVisaRequests = JSON.parse(JSON.stringify(visaRequests));

    // Iterate over the uploadedFiles and update the docs array
    for (const index of Object.keys(uploadedFiles)) {
      const userIndex = parseInt(index);
      const userDocs = uploadedFiles[userIndex];

      for (const docType of Object.keys(userDocs)) {
        const imageUrl = userDocs[docType];

        // Create a new doc entry
        const docEntry = {
          name: docType,
          image: imageUrl,
        };

        // Check if the doc entry already exists
        const existingDocIndex = updatedVisaRequests.visaRequest[
          userIndex
        ].request.docs.findIndex((doc) => doc.name === docType);

        if (existingDocIndex !== -1) {
          // Update the existing doc entry
          updatedVisaRequests.visaRequest[userIndex].request.docs[
            existingDocIndex
          ] = docEntry;
        } else {
          // Push the new doc entry into the docs array
          updatedVisaRequests.visaRequest[userIndex].request.docs.push(
            docEntry
          );
        }
      }
    }

    // send data to backend
    submitVisaRequest(phone, updatedVisaRequests, id)
      .then((data) => {
        setReqId(data);
        toast.success("Visa submitted successfully");
      })
      .catch((err) => {
        toast.error("Visa not submitted");
      });

    // Dispatch the updated visaRequests to the Redux store
    dispatch(addVisaRequest(updatedVisaRequests));

    // Move to the next stage
    setStage(4);
  };

  // Use useEffect to log the updated state
  useEffect(() => {
    console.log("uploaded files", uploadedFiles);
  }, [uploadedFiles]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
      {/* Tabs */}
      <div className="mb-4">
        <div className="flex border-b">
          {users.map((user, index) => (
            <button
              key={user.id}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {`${user.firstname} ${user.lastname}`}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="mt-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-wrap gap-4">
                {dummylabels?.map((docType) => (
                  <div
                    key={docType}
                    className="flex flex-col items-center gap-4 mb-6"
                  >
                    <h2 className="text-lg font-medium">{docType}</h2>
                    {/* Upload Area */}
                    {!uploadedFiles[index]?.[docType] ? (
                      <div className="w-full">
                        <label
                          htmlFor={`file-${index}-${docType}`}
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                          </div>
                          <input
                            id={`file-${index}-${docType}`}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChange(index, docType, e)
                            }
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative mt-4">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${uploadedFiles[index][docType]}`}
                          alt="Uploaded"
                          width={128}
                          height={128}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(index, docType)}
                          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-150"
                        >
                          <FaRegTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleSaveDetails}
                className="mt-4 w-full py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 font-medium transition-colors duration-150"
              >
                Save Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDocument;
