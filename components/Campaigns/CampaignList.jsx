"use client"
import React, { useEffect, useState } from "react";
import CampaignCard from "@/components/Campaigns/CampaignCard";
import ClipLoader from 'react-spinners/ClipLoader';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/getCampaigns");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-[70vh]">
    <ClipLoader color="#ffffff" loading={loading} size={20} />
  </div>
  }

  return (
    <div className="rounded-xl w-full bg-[#341266] text-black mt-4">
      <div className="flex gap-3 ms-5 overflow-x-auto">
        {/* <p className="text-sm text-black bg-white rounded-full px-5 py-2 min-w-24 text-center">Sort by</p>
        <p className="text-sm text-black bg-white rounded-full px-5 py-2 min-w-24 text-center">Filters</p>
        <p className="text-sm text-black bg-white rounded-full px-5 py-2 min-w-24 text-center">Status</p>
        <p className="text-sm text-black bg-white rounded-full px-5 py-2 min-w-24 text-center">Date</p> */}
      </div>

      <div className="mt-5 flex w-full items-center justify-center flex-wrap">
        {campaigns.map((campaign) => (
          <div key={campaign.campaignId} className="m-3">
            <CampaignCard
              data={campaign}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
