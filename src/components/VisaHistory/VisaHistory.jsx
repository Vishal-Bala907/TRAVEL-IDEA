"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminVisaHistory, getUserVisaHistory } from "../server/basic/basic";
import GridLoaderSpinner from "../spinner/GridLoaderSpinner";
import VisaHistoryNotFound from "../not-found/VisaHistoryNotFound";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineIdcard,
} from "react-icons/ai";
import { FaPassport, FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import Pagination from "../archivedVisas/Pagination";
import { markVisaCompleted } from "../server/admin/admin";
import { toast } from "react-toastify";
import {confirmAlert} from "react-confirm-alert";
const VisaHistory = ({ status }) => {
  //   console.log("status prop:", status); // Debugging

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const phone = useSelector((state) => state.user.phone);
  const role = useSelector((state) => state.user.role);
  const [visaHistory, setVisaHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmMarkCompleted = (visa) => {

    confirmAlert({
      title: "Confirm Completion",
      message: "Are you sure you want to mark this visa as completed?",
      buttons: [
        {
          label: "Confirm",
          onClick: () => handleMarkVisaCompleted(visa),
        },
        {
          label: "Cancel",
        },
      ],
    });
    setIsConfirmModalOpen(false);

  };



  useEffect(() => {
    setLoading(true);
    if (role === "ROLE_USER") {
      getUserVisaHistory(phone, currentPage)
        .then((data) => {
          //   console.log("Fetched Data (User):", data); // Debugging
          setTotalPages(data.totalPages);
          setVisaHistory(data.content);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (role === "ROLE_ADMIN") {
      getAdminVisaHistory(currentPage)
        .then((data) => {
          console.log("Fetched Data (Admin):", data);
          setTotalPages(data.totalPages);
          let filteredVisas = data.content;
          if (status === "completed") {
            if (data.content && data.content.length > 0) {
              filteredVisas = data.content.filter(
                (visa) => visa.completionStatus === true
              );
            }
          } else if (status === "pending") {
            if (data.content && data.content.length > 0) {
              filteredVisas = data.content.filter(
                (visa) => visa.completionStatus === false
              );
            }
          }
          console.log("Filtered Visa History:", filteredVisas); // Debugging
          setVisaHistory(filteredVisas);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [phone, status, role, totalPages]);

  const handleMarkVisaCompleted = (visa) => {
    markVisaCompleted(visa)
      .then((data) => {
        toast.success("Done...");
        location.reload();
      })
      .catch((err) => {
        toast.error("unable to mark completed");
      });
  };

  if (loading) {
    return <GridLoaderSpinner />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Visa History
      </h1>
      {visaHistory.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                {role === "ROLE_ADMIN" && (
                  <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Visa ID
                  </th>
                )}
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Visa Validity
                </th>
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Stay Duration
                </th>
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Waiting Time
                </th>
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Visa Type
                </th>
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Country Name
                </th>
                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
                {status === "pending" ? (
                  <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {visaHistory.map((visa, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  {role === "ROLE_ADMIN" && (
                    <td className="border px-4 py-3 text-sm text-gray-700">
                      {visa.visa.id}
                    </td>
                  )}
                  <td className="border px-4 py-3 text-sm text-gray-700">
                    {visa.visa.visaValidity} days
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-700">
                    {visa.visa.stayDuration} days
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-700">
                    {visa.visa.waitingTime} days
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-700">
                    {visa.visa.visaType}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-700">
                    {visa.visa.countyName}
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() => setSelectedVisa(visa)}
                    >
                      <AiOutlineEye className="mr-2" />
                      View More
                    </button>
                  </td>
                  {status === "pending" && (
                      <td className="border px-4 py-3 text-sm">
                      <button
                        onClick={() => {
                          handleConfirmMarkCompleted(visa);
                          setIsConfirmModalOpen(true);
                        }}
                        className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        <FaRegCircleCheck className="mr-2" />
                        Mark As Completed
                      </button>
                      </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <VisaHistoryNotFound />
      )}

      {/* Modal for Visa Details */}
      {selectedVisa && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 w-4/5 max-w-3xl overflow-y-auto max-h-[90vh] relative shadow-2xl">
            <button
              onClick={() => setSelectedVisa(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-white">Visa Details</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              {role === "ROLE_ADMIN" && (
                <div className="mb-6">
                  <strong className="flex items-center text-gray-700">
                    <AiOutlineFileText className="mr-2" />
                    Visa ID:
                  </strong>
                  <span className="text-gray-600">{selectedVisa.visa.id}</span>
                </div>
              )}
              <div className="mb-6">
                <strong className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2" />
                  Country Name:
                </strong>
                <span className="text-gray-600">
                  {selectedVisa.visa.countyName}
                </span>
              </div>
              <div className="mb-6">
                <strong className="flex items-center text-gray-700">
                  <AiOutlineFileText className="mr-2" />
                  Description:
                </strong>
                <span className="text-gray-600">
                  {selectedVisa.visa.description}
                </span>
              </div>
              {selectedVisa.appointmentDetails !== "N/R" && (
                <div className="mb-6">
                  <strong className="flex items-center text-gray-700">
                    <AiOutlineCalendar className="mr-2" />
                    Appointment Details:
                  </strong>
                  <span className="text-gray-600">
                    {new Date(
                      selectedVisa.appointmentDetails
                    ).toLocaleDateString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <strong className="flex items-center text-gray-700">
                  <AiOutlineUser className="mr-2" />
                  Travelers:
                </strong>
                <div className="flex border-b border-gray-300">
                  {selectedVisa.visaRequest.map((request, idx) => (
                    <button
                      key={idx}
                      className={`py-2 px-4 focus:outline-none ${
                        idx === activeTab
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveTab(idx)}
                    >
                      Traveler {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <FaMapMarkerAlt className="mr-2" />
                      Address:
                    </strong>
                    <span className="text-gray-600">
                      {
                        selectedVisa.visaRequest[activeTab].request.visa
                          .addressLine1
                      }
                      ,{" "}
                      {
                        selectedVisa.visaRequest[activeTab].request.visa
                          .addressLine2
                      }
                      , {selectedVisa.visaRequest[activeTab].request.visa.city},{" "}
                      {selectedVisa.visaRequest[activeTab].request.visa.state},{" "}
                      {selectedVisa.visaRequest[activeTab].request.visa.pincode}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlineUser className="mr-2" />
                      Full Name:
                    </strong>
                    <span className="text-gray-600">
                      {
                        selectedVisa.visaRequest[activeTab].request.visa
                          .givenName
                      }{" "}
                      {selectedVisa.visaRequest[activeTab].request.visa.surname}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlineUser className="mr-2" />
                      Gender:
                    </strong>
                    <span className="text-gray-600">
                      {selectedVisa.visaRequest[activeTab].request.visa.sex}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlineCalendar className="mr-2" />
                      Date of Birth:
                    </strong>
                    <span className="text-gray-600">
                      {new Date(
                        selectedVisa.visaRequest[
                          activeTab
                        ].request.visa.dateOfBirth
                      ).toLocaleDateString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlineMail className="mr-2" />
                      Email:
                    </strong>
                    <span className="text-gray-600">
                      {selectedVisa.visaRequest[activeTab].request.visa.email}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlinePhone className="mr-2" />
                      Mobile:
                    </strong>
                    <span className="text-gray-600">
                      {selectedVisa.visaRequest[activeTab].request.visa.mobile}
                    </span>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <FaPassport className="mr-2" />
                      Passport Front:
                    </strong>
                    <div className="flex justify-center">
                      {selectedVisa.visaRequest[activeTab].request.visa
                        .passportFront && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selectedVisa.visaRequest[activeTab].request.visa.passportFront}`}
                          alt="Passport Front"
                          className="w-64 h-64 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <FaPassport className="mr-2" />
                      Passport Back:
                    </strong>
                    <div className="flex justify-center">
                      {selectedVisa.visaRequest[activeTab].request.visa
                        .passportBack && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selectedVisa.visaRequest[activeTab].request.visa.passportBack}`}
                          alt="Passport Back"
                          className="w-64 h-64 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <strong className="flex items-center text-gray-700">
                      <AiOutlineFileText className="mr-2" />
                      Documents:
                    </strong>
                    <ul className="list-disc ml-6">
                      {selectedVisa.visaRequest[activeTab].request.docs.map(
                        (doc, idx) => (
                          <li key={idx} className="text-gray-600">
                            {doc.name}:{" "}
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${doc.image}`}
                              alt={doc.name}
                              className="w-32 h-32 object-cover mt-2 rounded-lg shadow-sm"
                            />
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default VisaHistory;
