import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addVisaRequest } from "../redux/slices/VisaRequest";
import "react-toastify/dist/ReactToastify.css";
import "./PassportForm.css";
const VITE_API_URL = "f16a94a303ef3ed524348cd85534f639";
// const VITE_API_URL = "";
import { uploadImage } from "../server/basic/basic";
import ConfirmChoiceModal from '../confirmChoiceModal/ConfirmChoiceModal'

const initialVisaRequestsState = {
  purposeOfVisit: "",
  appointmentDetails: "",
  startDate: new Date(),
  endDate: new Date(),
  visaRequest: [
    {
      request: {
        visa: {
          passportNumber: "",
          givenName: "",
          surname: "",
          sex: "Male",
          dateOfBirth: new Date(),
          placeOfBirth: "",
          issueDate: new Date(),
          expiryDate: new Date(),
          issuePlace: "",
          addressLine1: "",
          addressLine2: "",
          state: "",
          city: "",
          pincode: "",
          mobile: "",
          email: "",
          passportFront: null,
          passportBack: null,
        },
        docs: [],
      },
    },
  ],
  loading: false,
};

const PassportForm = ({ purposeOfVisit, setStage }) => {
  const [visaRequests, setVisaRequests] = useState(initialVisaRequestsState);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {

    setStage(2);
    const serializableVisaRequests = {
      ...visaRequests,
      startDate: visaRequests.startDate.toISOString(),
      endDate: visaRequests.endDate.toISOString(),
      visaRequest: visaRequests.visaRequest.map((request) => ({
        ...request,
        request: {
          ...request.request,
          visa: {
            ...request.request.visa,
            dateOfBirth: request.request.visa.dateOfBirth.toISOString(),
            issueDate: request.request.visa.issueDate.toISOString(),
            expiryDate: request.request.visa.expiryDate.toISOString(),
          },
        },
      })),
    };

    dispatch(addVisaRequest(serializableVisaRequests));
    toast("Visa request submitted successfully!", { autoClose: 3000 });
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDateRangeSelected && isImageUploaded) {
      toast("Please select departure and arrival date.", { autoClose: 3000 });
      return;
    }
    handleOpenModal();

    //
    //
    // if (!isDateRangeSelected && isImageUploaded) {
    //   toast("Please select departure and arrival date.", { autoClose: 3000 });
    //   return;
    // }
    // setStage(2);
    // const serializableVisaRequests = {
    //   ...visaRequests,
    //   startDate: visaRequests.startDate.toISOString(),
    //   endDate: visaRequests.endDate.toISOString(),
    //   visaRequest: visaRequests.visaRequest.map((request) => ({
    //     ...request,
    //     request: {
    //       ...request.request,
    //       visa: {
    //         ...request.request.visa,
    //         dateOfBirth: request.request.visa.dateOfBirth.toISOString(),
    //         issueDate: request.request.visa.issueDate.toISOString(),
    //         expiryDate: request.request.visa.expiryDate.toISOString(),
    //       },
    //     },
    //   })),
    // };
    //
    // dispatch(addVisaRequest(serializableVisaRequests));
    // toast("Visa request submitted successfully!", { autoClose: 3000 });
  };
  const handleTabChange = (newValue) => setTabValue(newValue);
  const handleAddTab = () => {
    setVisaRequests((prevState) => ({
      ...prevState,
      visaRequest: [
        ...prevState.visaRequest,
        initialVisaRequestsState.visaRequest[0],
      ],
    }));
    setTabValue(visaRequests.visaRequest.length);
  };

  const DateRangeRef = useRef(null);

  const handleDeleteTab = (index) => {
    if (index === 0) return;
    const newVisaRequests = visaRequests.visaRequest.filter(
      (_, i) => i !== index
    );
    setVisaRequests((prevState) => ({
      ...prevState,
      visaRequest: newVisaRequests,
    }));
    setTabValue(tabValue >= index ? tabValue - 1 : tabValue);
  };

  const fetchPassportData = async (id) => {
    try {
      return await axios.get(
        `https://api.mindee.net/v1/products/mindee/ind_passport/v1/documents/queue/${id}`,
        {
          headers: {
            Authorization: `Token ${VITE_API_URL}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const pollForResult = async (id, interval = 2000, maxAttempts = 10) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      const response = await fetchPassportData(id);
      if (response?.data?.job?.status === "completed") {
        return response;
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error("Job did not complete in time");
  };
  const handleImageUpload = async (e, index, type) => {
    const file = e.target.files[0];
    toast("Please wait, our AI is filling the form.", { autoClose: 3000 });
    if (file) {
      try {
        // Upload the image to the server and get the URL
        const newFormData = new FormData();
        newFormData.append("file", file);
        const imageUrl = await uploadImage(newFormData);

        // Update the state with the image URL
        setVisaRequests((prevState) => ({
          ...prevState,
          visaRequest: prevState.visaRequest.map((request, i) =>
            i === index
              ? {
                  ...request,
                  request: {
                    ...request.request,
                    visa: {
                      ...request.request.visa,
                      [type === "front" ? "passportFront" : "passportBack"]:
                        imageUrl,
                    },
                  },
                }
              : request
          ),
        }));

        // Fetch passport data from the API
        const formData = new FormData();
        formData.append("document", file);

        const response = await axios.post(
          "https://api.mindee.net/v1/products/mindee/ind_passport/v1/predict_async",
          formData,
          {
            headers: {
              Authorization: `Token ${VITE_API_URL}`,
            },
          }
        );

        const completeData = await pollForResult(response.data.job.id);
        const apiData = completeData.data.document.inference.prediction;
        setIsImageUploaded(true);

        setVisaRequests((prevState) => ({
          ...prevState,
          visaRequest: prevState.visaRequest.map((request, i) =>
            i === index
              ? {
                  ...request,
                  request: {
                    ...request.request,
                    visa: {
                      ...request.request.visa,
                      givenName:
                        apiData.given_names?.value ||
                        request.request.visa.givenName ||
                        "",
                      surname:
                        apiData.surname?.value ||
                        request.request.visa.surname ||
                        "",
                      sex:
                        apiData.gender?.value === "M"
                          ? "Male"
                          : apiData.gender?.value === "F"
                          ? "Female"
                          : "Other" || request.request.visa.sex,
                      dateOfBirth: apiData.birth_date?.value
                        ? new Date(apiData.birth_date.value)
                        : request.request.visa.dateOfBirth || new Date(),
                      placeOfBirth:
                        apiData.birth_place?.value ||
                        request.request.visa.placeOfBirth ||
                        "",
                      issueDate: apiData.issuance_date?.value
                        ? new Date(apiData.issuance_date.value)
                        : request.request.visa.issueDate || new Date(),
                      expiryDate: apiData.expiry_date?.value
                        ? new Date(apiData.expiry_date.value)
                        : request.request.visa.expiryDate || new Date(),
                      issuePlace:
                        apiData.issuance_place?.value ||
                        request.request.visa.issuePlace,
                      addressLine1:
                        apiData.address1?.value ||
                        request.request.visa.addressLine1 ||
                        "",
                      addressLine2:
                        apiData.address2?.value ||
                        request.request.visa.addressLine2 ||
                        "",
                      state:
                        apiData.address3?.value?.split(",")[1]?.trim() ||
                        request.request.visa.state ||
                        "",
                      city:
                        apiData.address3?.value?.split(",")[0]?.trim() ||
                        request.request.visa.city ||
                        "",
                      pincode:
                        apiData.address3?.value?.split(",")[2]?.trim() ||
                        request.request.visa.pincode ||
                        "",
                    },
                  },
                }
              : request
          ),
        }));
      } catch (error) {
        console.error("Error uploading image or fetching data:", error);
        setIsImageUploaded(true);
      }
    }
  };

  const handleDeleteImage = (index, type) => {
    setVisaRequests((prevState) => ({
      ...prevState,
      visaRequest: prevState.visaRequest.map((request, i) =>
        i === index
          ? {
              ...request,
              request: {
                ...request.request,
                visa: {
                  ...request.request.visa,
                  [type === "front" ? "passportFront" : "passportBack"]: null,
                },
              },
            }
          : request
      ),
    }));
  };

  const handleFormChange = (index, field, value) => {
    setVisaRequests((prevState) => ({
      ...prevState,
      visaRequest: prevState.visaRequest.map((request, i) =>
        i === index
          ? {
              ...request,
              request: {
                ...request.request,
                visa: {
                  ...request.request.visa,
                  [field]: field.includes("Date") ? new Date(value) : value,
                },
              },
            }
          : request
      ),
    }));
  };

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
    setIsDateRangeSelected(true);

    setVisaRequests((prevState) => ({
      ...prevState,
      startDate: item.selection.startDate, // Store as Date object
      endDate: item.selection.endDate, // Store as Date object
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);



  return (
    <div className="p-4">
      <ToastContainer autoClose={3000} limit={1} />
      <div className="flex justify-center mb-8">
        <div className="date-range-picker-container">
          <div className="flex flex-wrap flex-col md:flex-row">
            <div>
              {windowWidth > 768 && (
                <div className="flex justify-end mt-2.5 ">
                  <div className="text-right w-1/2">
                    <label className="font-bold text-lg">
                      Tentative Departure Date
                    </label>
                  </div>

                  <div className="text-center w-1/2">
                    <label className="font-bold text-lg">
                      Tentative Return Date
                    </label>
                  </div>
                </div>
              )}

              <DateRangePicker
                ref={DateRangeRef}
                onChange={handleDateRangeChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={windowWidth < 768 ? 1 : 2}
                ranges={dateRange}
                direction={windowWidth < 768 ? "vertical" : "horizontal"}
                minDate={tomorrow}
                showDateDisplay={false}
                rangeColors={["#3b82f6"]}
                editableDateInputs={true}
                staticRanges={[]}
                inputRanges={[]}
              />
            </div>
            <div className="flex justify-center items-center ">
              <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-100 w-4/5">
                <p className="text-lg font-semibold text-blue-800 mb-2 text-center md:text-left">
                  Selected Date:
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Tentative Departure Date
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {dateRange[0].startDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-gray-400 hidden md:block">→</span>
                  <span className="text-gray-400 md:hidden">↓</span>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Tentative Return Date
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {dateRange[0].endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="flex justify-center">
          {visaRequests.visaRequest.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`px-4 py-2 mx-1 rounded-xl hover:bg-blue-700 hover:text-white transition duration-200 ${
                tabValue === index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {`Traveller ${index + 1}`}
              {index !== 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTab(index);
                  }}
                  className="ml-1 text-red-500 cursor-pointer"
                >
                  ×
                </span>
              )}
            </button>
          ))}
          <button
            onClick={handleAddTab}
            className="px-4 py-2 mx-1 bg-green-500 text-white rounded-xl hover:bg-green-600 hover:text-white transition duration-200"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center p-6">
        <div className="w-full md:w-1/4 flex flex-col items-center space-y-4">
          {visaRequests.visaRequest[tabValue] && (
            <>
              <div className="w-full relative">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Passport Front:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, tabValue, "front")}
                  className="w-full border p-2"
                />
                <div className="relative">
                  {visaRequests.visaRequest[tabValue].request.visa
                    .passportFront ? (
                    <>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${visaRequests.visaRequest[tabValue].request.visa.passportFront}`}
                        alt="Passport Front"
                        className="mt-4 w-3/4"
                      />
                      <button
                        onClick={() => handleDeleteImage(tabValue, "front")}
                        className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                      >
                        <FaRegTrashCan />
                      </button>
                    </>
                  ) : (
                    <img
                      src="/img/general/user_passport_front.png"
                      alt="Passport Front Placeholder"
                      className="mt-4 w-3/4"
                    />
                  )}
                </div>
              </div>
              <div className="w-full relative">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Passport Back:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, tabValue, "back")}
                  className="w-full border p-2"
                />
                {visaRequests.visaRequest[tabValue].request.visa
                  .passportBack ? (
                  <div className="relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${visaRequests.visaRequest[tabValue].request.visa.passportBack}`}
                      alt="Passport Back"
                      className="mt-4 w-3/4"
                    />
                    <button
                      onClick={() => handleDeleteImage(tabValue, "back")}
                      className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                ) : (
                  <img
                    src="/img/general/user_passport_front.png"
                    alt="Passport Back Placeholder"
                    className="mt-4 w-3/4"
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 md:px-4">
          {!isImageUploaded && (
            <div className="flex absolute mt-60 max-w-screen-md md:ml-20 backdrop-blur-sm z-20">
              <div className="font-lexend text-sm font-medium bg-yellow-200 text-neutral-light-n800 p-4 rounded-lg border border-yellow-200">
                <div className="font-bold text-yellow-800">
                  <BsStars className={"inline mr-2 "} />
                  Autofill basic details
                </div>
                <p className="mt-2 text-white-800">
                  Upload passport to autofill your basic details and start your
                  application
                </p>
              </div>
            </div>
          )}

          <div
            className={`traveller-form ${!isImageUploaded ? "blur-sm" : ""}`}
          >
            <div className="m-2 bg-yellow-100 p-4 rounded-lg border border-yellow-200">
              Please note that the auto-filled information may be incorrect.
              Kindly review and make any necessary corrections.
            </div>
            {visaRequests.visaRequest[tabValue] && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Traveler&#39;s Basic Details
                </h2>
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Given Name
                      </label>
                      <input
                          type="text"
                          placeholder="Given Name"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .givenName
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "givenName",
                                  e.target.value
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Surname
                      </label>
                      <input
                          type="text"
                          placeholder="Surname"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .surname
                          }
                          onChange={(e) =>
                              handleFormChange(tabValue, "surname", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Sex
                      </label>
                      <select
                          value={
                            visaRequests.visaRequest[tabValue].request.visa.sex
                          }
                          onChange={(e) =>
                              handleFormChange(tabValue, "sex", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                          type="date"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .dateOfBirth
                                ? dayjs(
                                    visaRequests.visaRequest[tabValue].request.visa
                                        .dateOfBirth
                                ).format("YYYY-MM-DD")
                                : ""
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "dateOfBirth",
                                  e.target.value ? new Date(e.target.value) : ""
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Place of Birth
                    </label>
                    <input
                        type="text"
                        placeholder="Place of Birth"
                        value={
                          visaRequests.visaRequest[tabValue].request.visa
                              .placeOfBirth
                        }
                        onChange={(e) =>
                            handleFormChange(
                                tabValue,
                                "placeOfBirth",
                                e.target.value
                            )
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        required
                        disabled={!isImageUploaded}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Issue Date
                      </label>
                      <input
                          type="date"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .issueDate
                                ? dayjs(
                                    visaRequests.visaRequest[tabValue].request.visa
                                        .issueDate
                                ).format("YYYY-MM-DD")
                                : ""
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "issueDate",
                                  e.target.value ? new Date(e.target.value) : ""
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                          type="date"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .expiryDate
                                ? dayjs(
                                    visaRequests.visaRequest[tabValue].request.visa
                                        .expiryDate
                                ).format("YYYY-MM-DD")
                                : ""
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "expiryDate",
                                  e.target.value ? new Date(e.target.value) : ""
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Passport Issue Place
                    </label>
                    <input
                        type="text"
                        placeholder="Passport Issue Place"
                        value={
                          visaRequests.visaRequest[tabValue].request.visa
                              .issuePlace
                        }
                        onChange={(e) =>
                            handleFormChange(tabValue, "issuePlace", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        required
                        disabled={!isImageUploaded}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Current Address
                    </h3>
                    <div className="space-y-4">
                      <input
                          type="text"
                          placeholder="Address Line 1"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .addressLine1
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "addressLine1",
                                  e.target.value
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                      <input
                          type="text"
                          placeholder="Address Line 2"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa
                                .addressLine2
                          }
                          onChange={(e) =>
                              handleFormChange(
                                  tabValue,
                                  "addressLine2",
                                  e.target.value
                              )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="State"
                            value={
                              visaRequests.visaRequest[tabValue].request.visa
                                  .state
                            }
                            onChange={(e) =>
                                handleFormChange(tabValue, "state", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            required
                            disabled={!isImageUploaded}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={
                              visaRequests.visaRequest[tabValue].request.visa.city
                            }
                            onChange={(e) =>
                                handleFormChange(tabValue, "city", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            required
                            disabled={!isImageUploaded}
                        />
                        <input
                            type="text"
                            placeholder="Pincode"
                            value={
                              visaRequests.visaRequest[tabValue].request.visa
                                  .pincode
                            }
                            onChange={(e) =>
                                handleFormChange(
                                    tabValue,
                                    "pincode",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            required
                            disabled={!isImageUploaded}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mobile Number
                      </label>
                      <input
                          type="text"
                          placeholder="Mobile Number"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa.mobile
                          }
                          onChange={(e) =>
                              handleFormChange(tabValue, "mobile", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                          type="email"
                          placeholder="Email Address"
                          value={
                            visaRequests.visaRequest[tabValue].request.visa.email
                          }
                          onChange={(e) =>
                              handleFormChange(tabValue, "email", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                          required
                          disabled={!isImageUploaded}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        disabled={!isImageUploaded}
                    >
                      Submit Application
                    </button>


                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmChoiceModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
      />
    </div>
  );
};

export default PassportForm;
