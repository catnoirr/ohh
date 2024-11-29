"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Helper function to determine status
const getStatus = (startDate, endDate) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const start = new Date(startDate.seconds * 1000).setHours(0, 0, 0, 0);
  const end = new Date(endDate.seconds * 1000).setHours(0, 0, 0, 0);

  if (currentDate < start) return "Upcoming";
  else if (currentDate > end) return "Closed";
  return "Active";
};

const Mini = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null); // Track selected vendor

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const normalizeDate = (date) => {
    if (!date) return null; // Handle missing dates
    const options = { year: "numeric", month: "long", day: "numeric" };
    if (date.toDate) return date.toDate().toLocaleDateString("en-US", options); // Firestore Timestamp
    if (date.seconds)
      return new Date(date.seconds * 1000).toLocaleDateString("en-US", options); // Seconds-based timestamp
    if (typeof date === "string" || typeof date === "number")
      return new Date(date).toLocaleDateString("en-US", options); // ISO string or timestamp
    return date.toLocaleDateString("en-US", options); // Already a Date object
  };

  useEffect(() => {
    const fetchVendorsAndCampaigns = async () => {
      try {
        const vendorsCollection = collection(db, "vendors");
        const vendorSnapshot = await getDocs(vendorsCollection);
        const vendorsData = await Promise.all(
          vendorSnapshot.docs.map(async (vendorDoc) => {
            const vendor = vendorDoc.data();

            const campaignIds = Array.isArray(vendor.campaigns)
              ? vendor.campaigns.map((campaign) => campaign.campaignId || "N/A")
              : ["N/A"];

            const activeCampaigns = await Promise.all(
              campaignIds.map(async (campaignId) => {
                if (campaignId === "N/A") return null;
                try {
                  const campaignDoc = await getDoc(doc(db, "campaigns", campaignId));
                  if (campaignDoc.exists()) {
                    const campaignData = campaignDoc.data();
                    const status = getStatus(
                      campaignData.startDate,
                      campaignData.endDate
                    );
                    if (status === "Active") {
                      return {
                        campaignName: campaignData.campaignName,
                        adCreative: campaignData.adCreative || "",
                        discount: campaignData.vendors?.[0]?.firstPrize || "No discount",
                        offerTill: normalizeDate(campaignData.endDate),
                      };
                    }
                  }
                  return null;
                } catch (error) {
                  return null;
                }
              })
            );

            return {
              id: vendorDoc.id,
              activeCampaigns: activeCampaigns.filter(Boolean),
              address: vendor.address,
              businessName: vendor.businessName,
            };
          })
        );

        setVendors(vendorsData.filter((vendor) => vendor.activeCampaigns.length > 0));
      } catch (error) {
        setError("Error fetching vendors: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorsAndCampaigns();
  }, []);

  const handleVendorSelection = (vendorId) => {
    setSelectedVendor(vendorId);
    setIsDropdownOpen(false);
  };

  const filteredVendors = selectedVendor
    ? vendors.filter((vendor) => vendor.id === selectedVendor)
    : vendors;

  if (loading) {
    return (
      <div className="skeleton animate-pulse">
        <div className="skeleton-line bg-gray-300 h-4 mb-2 rounded"></div>
        <div className="skeleton-line bg-gray-300 h-4 mb-2 rounded"></div>
        <div className="skeleton-line bg-gray-300 h-4 mb-2 rounded"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-4 px-2  w-full max-w-md overflow-hidden">
      <div className="relative w-64 mb-6 ">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white text-gray-800 rounded-lg shadow-md px-4 py-2 flex items-center justify-between focus:outline-none"
        >
          <span>Choose Vendor</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10">
            <ul className="py-2">
              <li
                onClick={() => handleVendorSelection(null)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Vendors
              </li>
              {vendors.map((vendor) => (
                <li
                  key={vendor.id}
                  onClick={() => handleVendorSelection(vendor.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {vendor.businessName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-2 gap-4 transition-all  "
        
      >
        {filteredVendors.map((vendor) =>
          vendor.activeCampaigns.map((campaign) => (
            <div
              key={`${vendor.id}-${campaign.campaignName}`}
              className="bg-white shadow-md rounded-lg   max-w-[187px] min-h-[217px] mx-auto"
            >
              <img
                src={campaign.adCreative}
                alt="Ad Creative Image"
                className="w-48 h-32 object-cover rounded-t-lg"
              />
              <div className="flex justify-between p-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#341266] text-sm font-bold">
                      {campaign.campaignName}
                    </p>
                    {/* <FaCheck className="text-white bg-green-500 p-1 rounded-full" /> */}
                  </div>
                  <p className="text-gray-600 text-xs">{vendor.address}</p>
                </div>
                <div className="text-[10px]">
                  <p className="border p-[2px] rounded-lg bg-oohpoint-primary-1 text-white">
                    4.5⭐
                  </p>
                </div>
              </div>
              <h3 className="text-[10px] font-bold text-gray-800 px-2">
                Get upto {campaign.discount} on any items
              </h3>
              <p className="px-2 text-[11px] pb-3">
                Offers Till - {campaign.offerTill}
              </p>
              <div className="px-2 pb-2">
                <button
                  className="bg-[#341266] text-white font-medium text-sm px-2 py-2  w-full rounded-xl hover:bg-purple-900"
                  onClick={() => router.push(`/campaigns`)}
                >
                  View Offer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mini;
