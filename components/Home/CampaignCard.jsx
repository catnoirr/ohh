import Image from "next/image";
import React, { useEffect, useState } from "react";

const CampaignCard = ({
  title,
  buttonText,
  imageSrc,
  onButtonClick,
  discount,
  offerTill,
  vendors,
  campaignVendors,
}) => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const fetchVendor = async () => {
    const data = [];
    vendors.forEach((vendor) => {
      if (campaignVendors.some((cv) => cv.vendorId === vendor.vid)) {
        data.push(vendor);
      }
    });
    setSelectedVendor(data[0]);
  };

  useEffect(() => {
    fetchVendor();
  }, [vendors, campaignVendors]);

  return (
    <div className="bg-white rounded-lg shadow-md    ">
      <div className="shadow-md rounded-lg">
        <Image
          src={imageSrc}
          width={100}
          height={100}
          alt="Campaign"
          className="sm:w-full w-full   object-cover max-h-32 mx-auto rounded-md "
        />
        <div className="sm:p-3 p-2">
          <div className="flex justify-between">
            <div className="">
              <h2 className="text-md  font-bold text-[#341266]">{title}</h2>
              <p className="text-[10px]  text-gray-600">
                {selectedVendor?.address}
              </p>
            </div>
            <div className="text-[10px] ">
              <p className="border p-1 rounded-lg bg-oohpoint-primary-1 text-white">
                4.5⭐
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-3 px-2">
        <h2 className="text-sm font-bold">Get upto {discount} on any items</h2>
        <p className="text-[10px] text-gray-600"> Offer Till - {offerTill}</p>
      </div>
      <div className="sm:p-3 p-2 ">
        <button
          className=" bg-[#341266] text-white font-medium py-2 px-4 text-sm w-full rounded-xl hover:bg-purple-900"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
