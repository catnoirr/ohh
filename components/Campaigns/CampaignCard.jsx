import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image' 
import { useRouter } from "next/navigation";

const CampaignCard = ({ data }) => {
  const router = useRouter()
  const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatCampaignDates = (startTimestamp, endTimestamp) => {
    const formattedStart = formatTimestampToDate(startTimestamp);
    const formattedEnd = formatTimestampToDate(endTimestamp);

    return `${formattedStart} – ${formattedEnd}`;
  };

  const formattedDates = formatCampaignDates(data.startDate, data.endDate);
  
  const handleRedeem = ()=> {
// router.push(`/campaign/${data.vendorId}-${campaignId}`)
  }
  return (
    <Card className="max-w-sm mx-auto rounded-xl border text-black shadow-lg bg-white">
      <Image
        src={data.adCreative}
        alt="Products"
        className="w-full h-44 rounded-none"
        width={200}
        height={200}
      />

      <CardContent className="!px-2  flex flex-col items-center space-y-2 text-center bg-white rounded-b-xl">
        <p className="text-lg font-semibold mt-2">{data.campaignName || "Campaign Title"}</p>
        <p className="text-xs font-medium text-black">
          Discover exciting offers, discounts, and rewards just by interacting with campaigns in your area.
        </p>
        <p className="sm:text-xs text-[10px] text-black font-normal">
          Campaign Date: <span className="sm:text-xs text-[10px] font-bold">{formattedDates}</span>
        </p>
        {/* <button className="relative bg-[#FFAD01] text-white px-6 py-1 !mt-5 rounded font-semibold" onClick={handleRedeem}>
          Redeem Now
          <div className="w-0 h-0 border-l-[15px] absolute -top-2 left-3 border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-[#FFAD01]"></div>
        </button> */}
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
