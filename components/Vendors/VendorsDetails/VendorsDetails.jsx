import React, { useState } from "react";
import Table from "@/components/Table";
import VendDetails from "./VendDetails";
const VendorsDetails = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <button className="bg-oohpoint-grey-100 px-4 md:px-6 py-2 rounded-lg text-oohpoint-primary-2 w-full md:w-auto">
          Verified
        </button>
        <button className="bg-oohpoint-grey-100 px-4 md:px-6 py-2 rounded-lg text-oohpoint-primary-2 w-full md:w-auto">
          Disabled
        </button>
        <button className="bg-oohpoint-grey-100 px-4 md:px-6 py-2 rounded-lg text-oohpoint-primary-2 w-full md:w-auto">
          Unverified
        </button>
      </div>

      <div className="w-full mt-5">
        {show ? (
          <VendDetails/>
        ) : (
          <Table isShow={true} handleShow={handleShow} />
        )}
      </div>
    </div>
  );
};

export default VendorsDetails;
