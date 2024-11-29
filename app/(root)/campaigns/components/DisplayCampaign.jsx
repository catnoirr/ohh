"use client";

import React, { useState, useEffect } from "react";
import CampaignCard from "./DisplayCard";
import { useRouter } from "next/navigation";
import ClipLoader from 'react-spinners/ClipLoader';

const CampaignSection = ({ title, campaigns, isLoading }) => {
  const router = useRouter();
  const normalizeDate = (date) => {
    if (!date) return null; // Handle missing dates
    const options = { year: "numeric", month: "long", day: "numeric" };
    if (date.toDate) return date.toDate().toLocaleDateString("en-US", options); // Firestore Timestamp
    if (date.seconds) return new Date(date.seconds * 1000).toLocaleDateString("en-US", options); // Seconds-based timestamp
    if (typeof date === "string" || typeof date === "number") return new Date(date).toLocaleDateString("en-US", options); // ISO string or timestamp
    return date.toLocaleDateString("en-US", options); // Already a Date object
  };

  

  return (
    <div className="my-6 w-full sm:px-6 px-3">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button className="text-white text-sm border border-[#A3A3A3] bg-[#F2F0F53D] px-2 py-1 rounded-md">
          View All
        </button>
      </div>

      {/* Grid Layout for Campaigns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
        {isLoading ? (
          <div className="flex items-center justify-center col-span-full h-40">
            <ClipLoader color="#ffffff" loading={isLoading} size={20} />
          </div>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            
            <CampaignCard
              key={campaign.campaignId}
              title={campaign.campaignName}
              buttonText={campaign.redirectLink ? "Visit Now" : "Notify Me"}
              imageSrc={campaign.adCreative}
              discount={campaign.vendors?.[0]?.firstPrize || 'No discount available'}
              offerTill={normalizeDate(campaign.endDate) }
              onButtonClick={() => router.push('/campaigns')}
            />
          ))
        ) : (
          <div className="text-white text-center col-span-full">No campaigns available</div>
        )}
      </div>
    </div>
  );
};

const CampaignsDisplay = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignsNearYou, setCampaignsNearYou] = useState([]);
  const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/getCampaigns", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const currentDate = new Date();

        const nearYou = data.filter((campaign) => {
          if (Array.isArray(campaign.geographicTargeting)) {
            return campaign.geographicTargeting.some((target) =>
              target.toLowerCase().includes("mumbai")
            );
          }
          return false;
        });
        
        const ongoing = data.filter(
          (campaign) =>
            currentDate >= new Date(campaign.startDate.seconds * 1000) &&
            currentDate <= new Date(campaign.endDate.seconds * 1000)
        );

        const upcoming = data.filter(
          (campaign) =>
            currentDate < new Date(campaign.startDate.seconds * 1000)
        );

        setCampaigns(data);
        setCampaignsNearYou(nearYou);
        setOngoingCampaigns(ongoing);
        setUpcomingCampaigns(upcoming);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-[#341266] min-h-screen sm:max-w-[30rem] w-full">
      {/* <CampaignSection title="Campaigns Near You" campaigns={campaignsNearYou} isLoading={isLoading} /> */}
      <CampaignSection title="Ongoing Campaigns" campaigns={ongoingCampaigns} isLoading={isLoading} />
      <CampaignSection title="Upcoming Campaigns" campaigns={upcomingCampaigns} isLoading={isLoading} />
    </div>
  );
};

export default CampaignsDisplay;
