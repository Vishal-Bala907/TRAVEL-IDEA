import React, { useEffect, useState } from "react";
import ManageItems from "./ManageItem";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { getAllDocuments } from "../server/basic/basic";
import { fetchAllVisaTypes } from "../server/admin/admin";
import "../../app/ScrollBar.css";
import GridLoaderSpinner from "../../components/spinner/GridLoaderSpinner";
import NotFoundPage from "../not-found/NotFoundPage";
import { ClipLoader } from "react-spinners";

const ManageProdList = ({ filter, visas = [] }) => {
  const [data, setData] = useState(visas); // Start with all visas
  const [priceToggle, setPriceToggle] = useState(false);
  const [showToggle, setShowToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log(visas);

  // console.log(filter);

  useEffect(() => {
    // Start loading
    setLoading(true);
    let filteredData = [...visas]; // Default to all visas

    if (filter) {
      // Apply filtering based on the filter type
      switch (filter.fil) {
        case "tag":
          filteredData = visas.filter((item) => item.tag === filter.name);
          setShowToggle(false);
          break;
        case "visaType":
          filteredData = visas.filter((item) => item.visaType === filter.name);
          setShowToggle(false);
          break;
        case "countyName":
          filteredData = visas.filter(
            (item) => item.countyName === filter.name
          );
          setShowToggle(false);
          break;
        case "visaFee":
          const criteria = +filter.name;
          filteredData = priceToggle
            ? visas.filter((item) => item.visaFee <= criteria)
            : visas.filter((item) => item.visaFee >= criteria);
          setShowToggle(true);
          break;
        default:
          break;
      }
    }

    setData(filteredData); // Update the displayed data
    setLoading(false); // End loading
  }, [filter, priceToggle, visas]);

  const [documentOptions, setDocumentOptions] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllDocuments()
      .then((data) => {
        // console.log(data);
        setDocumentOptions(data);
      })
      .catch((err) => {
        console.error(err);
      });
    fetchAllVisaTypes()
      .then((data) => {
        // console.log(data);
        setVisaTypes(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <GridLoaderSpinner />;
  }

  // Render loading state
  if (loading) {
    return <GridLoaderSpinner />;
  }

  // console.log(data);
  return (
    <main className="relative">
      {/* Price toggle section */}
      {showToggle && (
        <section className="flex justify-center align-center gap-[20px] h-[40px] bg-[#5500e34f]">
          <FaChevronUp
            title="Greater than"
            className="h-[100%] cursor-pointer hover:shadow-lg"
            style={{ fontSize: "x-large" }}
            onClick={() => setPriceToggle(false)}
          />
          <FaChevronDown
            title="Less than"
            className="h-[100%] cursor-pointer hover:shadow-lg"
            style={{ fontSize: "x-large" }}
            onClick={() => setPriceToggle(true)}
          />
        </section>
      )}
      {/* Visa items display */}
      <section className="custom-scrollbar flex justify-center align-top flex-row flex-wrap gap-15  h-[856px] overflow-y-auto">
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <ManageItems
              documentOptions={documentOptions}
              visaTypes={visaTypes}
              key={idx}
              item={item}
            />
          ))
        ) : (
          <NotFoundPage />
        )}
      </section>
    </main>
  );
};

export default ManageProdList;
