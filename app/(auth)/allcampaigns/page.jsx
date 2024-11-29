"use client";
import React, { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { db } from '@/firebase'; // Ensure correct Firebase configuration
import { collection, getDocs, getDoc} from 'firebase/firestore';
import { useRouter } from 'next/navigation';




// Helper function to convert various formats to Date
const normalizeDate = (date) => {
  if (!date) return null; // Handle missing dates
  if (date.toDate) return date.toDate(); // Firestore Timestamp
  if (date.seconds) return new Date(date.seconds * 1000); // Seconds-based timestamp
  if (typeof date === "string" || typeof date === "number") return new Date(date); // ISO string or timestamp
  return date; // Already a Date object
};

// Get status of campaigns
const getStatus = (startDate,endDate) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(0, 0, 0, 0);

  if (currentDate < start) return "Upcoming";
  else if (currentDate > end) return "Expired"; 
  else  return "Ongoing";
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Separate pagination states for Ongoing and Upcoming campaigns
  const [currentPageOngoing, setCurrentPageOngoing] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);

  const itemsPerPage = 6; // Show 3 campaigns per page

  // Fetch campaigns data from Firestore
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before starting the request
        console.log("Fetching campaigns from Firestore...");

        // Fetch campaigns from the "campaigns" collection
        const campaignsSnapshot = await getDocs(collection(db, 'campaigns'));
        console.log(`Fetched ${campaignsSnapshot.size} campaigns`);

        if (campaignsSnapshot.empty) {
          console.log('No campaigns found in the database');
        }

        const campaignData = await Promise.all(
          campaignsSnapshot.docs.map(async (doc) => {
            const campaign = doc.data();

            // Check if campaign data exists
            if (!campaign) {
              console.warn(`No data found for campaign: ${doc.id}`);
              return null;
            }

            // Initialize vendor address
            let vendorAddress = '';

            // Fetch vendor details based on vendorId
            if (campaign.vendorId) {
              try {
                const vendorDoc = await getDoc(doc(db, 'vendors', campaign.vendorId));
                if (vendorDoc.exists()) {
                  vendorAddress = vendorDoc.data().address || 'Address not available';
                } else {
                  console.warn(`Vendor not found for vendorId: ${campaign.vendorId}`);
                }
              } catch (vendorError) {
                console.error('Error fetching vendor data:', vendorError);
              }
            }

            // Check if endDate is a valid Timestamp and convert it
            let endDate = null;
            if (campaign.endDate && campaign.endDate.toDate) {
              endDate = campaign.endDate.toDate();
            }

            console.log(`Campaign ID: ${doc.id}, End Date: ${endDate ? endDate.toLocaleDateString() : 'No end date'}`);

            return {
              id: doc.id,
              img: campaign.adCreative || 'default-image-url',  // Add a fallback image URL
              title: campaign.campaignName || 'Untitled Campaign',
              location: vendorAddress,
              rating: campaign.rating || 0,
              discount: campaign.vendors?.[0]?.firstPrize || 'No discount available',
              startDate: normalizeDate(campaign.startDate),
              endDate: normalizeDate(campaign.endDate),            };
          })
        );

        // Filter out any null entries (in case some campaigns did not load properly)
        setCampaigns(campaignData.filter(Boolean));  // Remove null values
        console.log('Campaign data successfully loaded');
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to fetch campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Get current date for filtering campaigns

  // Filter Ongoing and Upcoming campaigns
  const ongoingCampaigns = campaigns.filter(
    (campaign) => getStatus(campaign.startDate, campaign.endDate) === "Ongoing"
  );
  const upcomingCampaigns = campaigns.filter(
    (campaign) => getStatus(campaign.startDate, campaign.endDate) === "Upcoming"
  );

  // Handle Pagination Logic for Ongoing Campaigns
  const indexOfLastOngoing = currentPageOngoing * itemsPerPage;
  const indexOfFirstOngoing = indexOfLastOngoing - itemsPerPage;
  const currentOngoingCampaigns = ongoingCampaigns.slice(indexOfFirstOngoing, indexOfLastOngoing);

  const nextPageOngoing = () => {
    if (indexOfLastOngoing < ongoingCampaigns.length) {
      setCurrentPageOngoing(currentPageOngoing + 1);
    }
  };

  const prevPageOngoing = () => {
    if (indexOfFirstOngoing > 0) {
      setCurrentPageOngoing(currentPageOngoing - 1);
    }
  };

  // Handle Pagination Logic for Upcoming Campaigns
  const indexOfLastUpcoming = currentPageUpcoming * itemsPerPage;
  const indexOfFirstUpcoming = indexOfLastUpcoming - itemsPerPage;
  const currentUpcomingCampaigns = upcomingCampaigns.slice(indexOfFirstUpcoming, indexOfLastUpcoming);

  const nextPageUpcoming = () => {
    if (indexOfLastUpcoming < upcomingCampaigns.length) {
      setCurrentPageUpcoming(currentPageUpcoming + 1);
    }
  };

  const prevPageUpcoming = () => {
    if (indexOfFirstUpcoming > 0) {
      setCurrentPageUpcoming(currentPageUpcoming - 1);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 p-6">
        {[...Array(itemsPerPage)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4 h-56 animate-pulse" />
        ))}
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      {/* Ongoing Campaigns */}
      <div className="mb-8 relative">
        <h2 className="text-xl font-bold mb-4">Ongoing Campaigns</h2>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {currentOngoingCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Pagination Controls */}
        {ongoingCampaigns.length > itemsPerPage && (
          <div className="flex justify-center gap-20 mt-10">
            <button onClick={prevPageOngoing} disabled={currentPageOngoing === 1} className="text-white bg-blue-600 py-2 px-4 rounded">
              Previous
            </button>
            <span className="bg-gray-400 text-white px-4 py-2 rounded-full">
              {currentPageOngoing}
            </span>
            <button onClick={nextPageOngoing} disabled={indexOfLastOngoing >= ongoingCampaigns.length} className="text-white bg-blue-600 py-2 px-4 rounded">
              Next
            </button>
          </div>
        )}
      </div>

      {/* Upcoming Campaigns */}
      <div className="relative">
        <h2 className="text-xl font-bold mb-4">Upcoming Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {currentUpcomingCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Pagination Controls */}
        {upcomingCampaigns.length > itemsPerPage && (
          <div className="flex justify-center gap-20 mt-10">
            <button onClick={prevPageUpcoming} disabled={currentPageUpcoming === 1} className="text-white bg-blue-600 py-2 px-4 rounded">
              Previous
            </button>
            <span className="bg-gray-400 text-white px-4 py-2 rounded-full">
              {currentPageOngoing}
            </span>            <button onClick={nextPageUpcoming} disabled={indexOfLastUpcoming >= upcomingCampaigns.length} className="text-white bg-blue-600 py-2 px-4 rounded">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to render individual campaign cards
const CampaignCard = ({ campaign }) => {
  const isUpcoming = new Date() < new Date(campaign.startDate);
const router = useRouter();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden relative">
      <img src={campaign.img} alt={campaign.title} className="w-full h-60 object-cover" />

      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-purple-600">{campaign.title}</h3>
            {/* <p className="text-gray-500 text-sm">{campaign.location}</p> */}
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              4.5★
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FaShare />
            </button>
          </div>
        </div>

        {/* Discount Text */}
        <p className="text-gray-700 mt-2 font-medium">
          Get up to {campaign.discount} off on any product
        </p>

        {/* Show start date if upcoming, otherwise show end date */}
        <p className="text-gray-400 text-xs">
          {isUpcoming ? `Starts on ${formatDate(campaign.startDate)}` : `Offer till ${campaign.endDate ? formatDate(campaign.endDate) : 'No end date'}`}
        </p>

        {/* View Offers Button with Share (Plane) Icon */}
        <div className="mt-4">
          <button
            className="w-full bg-blue-600 text-white py-4 px-10 rounded-xl transition"
            onClick={() => router.push(`/campaigns/${campaign.id}`)}
          >
            View Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
