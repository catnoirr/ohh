"use client";
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt,FaShare ,FaPlane } from 'react-icons/fa';
import { db } from '@/firebase'; // Ensure correct Firebase configuration
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaLocationArrow } from 'react-icons/fa';





// Helper function to convert various formats to Date
const normalizeDate = (date) => {
  if (!date) return null; // Handle missing dates
  if (date.toDate) return date.toDate(); // Firestore Timestamp
  if (date.seconds) return new Date(date.seconds * 1000); // Seconds-based timestamp
  if (typeof date === "string" || typeof date === "number") return new Date(date); // ISO string or timestamp
  return date; // Already a Date object
};

// Get status of campaigns  
const getStatus = (startDate, endDate) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(0, 0, 0, 0);

  if (currentDate < start) return "Upcoming";
  else if (currentDate > end) return "Expired";
  else return "Ongoing";
};

const Campaigns = () => {
  const router = useRouter();
  
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Separate pagination states for Ongoing and Upcoming campaigns
  const [currentPageOngoing, setCurrentPageOngoing] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);

  const itemsPerPage = Infinity; // Show all campaigns per page
  // Fetch campaigns data from Firestore
  // Fetch campaigns data from Firestore
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // Fetch campaigns from the "campaigns" collection
        const campaignsSnapshot = await getDocs(collection(db, 'campaigns'));
  
        const campaignData = await Promise.all(
          campaignsSnapshot.docs.map(async (docSnapshot) => {
            const campaign = docSnapshot.data();
  
            // Initialize vendor address
            let vendorAddress = 'Address not available';
            let mapLocation = 'Location not found ';
  
            // If there are vendors, fetch the vendor details using vendorId as documentId
            if (campaign.vendors && campaign.vendors.length > 0) {
              const vendorId = campaign.vendors[0].vendorId; // Get vendorId from the first vendor in the array
  
              try {
                // Fetch the vendor document from the vendors collection using vendorId
                const vendorDocRef = doc(db, 'vendors', vendorId);
                const vendorDocSnapshot = await getDoc(vendorDocRef);
  
                // Check if vendor document exists and fetch address
                if (vendorDocSnapshot.exists()) {
                  const vendorData = vendorDocSnapshot.data();
                  vendorAddress = vendorData.address || 'Address not available';
                  mapLocation = vendorData.googleMapLink || 'Location not found';

                } else {
                  console.warn(`Vendor document not found for vendorId: ${vendorId}`);
                }
              } catch (vendorError) {
                console.error('Error fetching vendor data:', vendorError);
              }
            }
  
            return {
              id: docSnapshot.id,
              img: campaign.adCreative || 'default-image-url',
              title: campaign.campaignName || 'Untitled Campaign',
              location: vendorAddress,
              rating: campaign.rating || 0,
              discount: campaign.vendors?.[0]?.firstPrize,
              vendorId: campaign.vendors?.[0]?.vendorId,
              startDate: normalizeDate(campaign.startDate),
              endDate: normalizeDate(campaign.endDate),
              direction : mapLocation,
            };
          })
        );
  
        // Filter out any null entries (in case some campaigns did not load properly)
        setCampaigns(campaignData.filter(Boolean));
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
      <div className="border rounded-lg shadow-lg overflow-hidden relative animate-pulse">
        {/* Skeleton Image */}
        <div className="bg-gray-200 h-60 w-full"></div>

        {/* Skeleton Content */}
        <div className="p-4">
          <div className="flex justify-between">
            {/* Title Skeleton */}
            <div>
              <div className="bg-gray-200 h-6 w-32 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>
            {/* Rating Skeleton */}
            <div className="flex flex-col items-center gap-1">
              <div className="bg-gray-200 h-6 w-12 rounded-full"></div>
              <div className="bg-gray-200 h-6 w-6 rounded-full"></div>
            </div>
          </div>

          {/* Discount Skeleton */}
          <div className="bg-gray-200 h-4 w-3/4 mt-4 rounded"></div>

          {/* Date Skeleton */}
          <div className="bg-gray-200 h-3 w-40 mt-2 rounded"></div>

          {/* Button Skeleton */}
          <div className="bg-gray-200 h-10 w-full mt-6 rounded-xl"></div>
        </div>
      </div>
    );
  }  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      {/* Ongoing Campaigns */}
      <div className="mb-8 relative">
        <h2 className="text-xl font-bold mb-4">Ongoing Campaigns</h2>
        {/* <button
          className="absolute -top-5 right-0 text-black border border-black p-3 font-medium rounded-lg hover:bg-blue-600 hover:text-white"
          onClick={() => router.push("/allcampaigns")}
        >
          View All
        </button> */}
        <div className="overflow-x-auto max-h-full">
  <div
    className="grid grid-flow-col grid-rows-1 auto-cols-[minmax(250px,_330px)] "
    style={{ width: "max-content" }}
  >
    {currentOngoingCampaigns.map((campaign) => (
      <CampaignCard key={campaign.id} campaign={campaign} />
    ))}
  </div>
</div>


       
      </div>

      {/* Upcoming Campaigns */}
      <div className="relative">
        <h2 className="text-xl font-bold mb-4">Upcoming Campaigns</h2>
        <div  className="grid grid-flow-col grid-rows-1 auto-cols-[minmax(250px,_350px)]"
    style={{ width: "max-content" }}>
          {currentUpcomingCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

      
        
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
    <div className="border rounded-lg shadow-lg overflow-hidden relative max-w-[300px] ">
      <img src={campaign.img} alt={campaign.title} className="w-full h-40 object-cover rounded-sm" />

      <div className="p-4 ">
        <div className="flex justify-between  border-b">
          <div>
          <h3 className="text-2xl font-semibold text-purple-600 cursor-pointer" 
            onClick={(e) => {
              if (campaign.title.length > 10) {
                e.currentTarget.textContent = campaign.title;
              }
            }}
          >
            {campaign.title.length > 10 ? `${campaign.title.substring(0, 10)} ...` : campaign.title}
          </h3>   
                     <p className="text-gray-500 text-sm cursor-pointer"  onClick={(e) => {
              if (campaign.location.length > 10) {
                e.currentTarget.textContent = campaign.location;
              }
            }}>
                     {campaign.location.length > 5 ? `${campaign.location.substring(0, 20)} ...` : campaign.location}

                     </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              4.5★
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ url: `/campaigns/${campaign.id}` });
                } else {
                  console.log("Your browser does not support sharing");
                }
              }}>
              <FaShare />
            </button>
          </div>
        </div>

        {/* Discount Text */}
        <p className="text-gray-700 mt-2 font-medium">
          {campaign.discount ? `Get up to ${campaign.discount} off on any product` : 'No discount available'}
        </p>
      
        {/* Show start date if upcoming, otherwise show end date */}
        <p className="text-gray-400 text-xs">
          {isUpcoming ? `Starts on ${formatDate(campaign.startDate)}` : `Offer till ${campaign.endDate ? formatDate(campaign.endDate) : 'No end date'}`}
        </p>

        {/* View Offers Button with Share (Plane) Icon */}
        <div className="mt-4 flex justify-between gap-4 items-center">
          <button
            className="w-full bg-blue-600 text-white py-4 px-10 rounded-xl transition"
            onClick={() => router.push(`/campaigns/${campaign.id}`)}
          >
            View Offers
          </button>
         
          <button className='bg-blue-600 text-white rounded-full p-4' onClick={() => router.push(campaign.direction)}>
            <FaLocationArrow  className=''/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;


