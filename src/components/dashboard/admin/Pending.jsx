import React from "react";
import VisaHistory from "../../VisaHistory/VisaHistory";

const Pending = () => {
  const status = "pending"
  return<>
    <VisaHistory status={status}/>
  </>
};

export default Pending;
