import React from "react";
import VisaHistory from "../../VisaHistory/VisaHistory";

const Completed = () => {
  const status = "completed"
  return<>
<VisaHistory status={status}/>
  </>

};

export default Completed;
