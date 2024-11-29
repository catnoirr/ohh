import React from "react";
import VendorsCard from "./VendorsCard";
import VendorsCard2 from "./VendorsCard2";
import VendorsCard3 from "./VendorsCard3";

const VendDetails = () => {
  const profileData = {
    name: "Kritika",
    id: "KRITI142523453",
    phone: "+91 56374578",
    email: "kritikabhardwaj@gmail.com",
    location: "Delhi, India",
    panCard: "+91 56374578",
    assignPerson: "Manju Sharma",
    assignPersonImage: "/profile.png",
  };

  return (
    <div className="w-full">
      {/* Profile Section */}
      <div className="w-full bg-oohpoint-grey-100 flex justify-between px-10 py-5 rounded-xl">
        <div>
          <h2 className="text-oohpoint-primary-1 text-3xl">Meet Kritika!</h2>
          <p>ID - KRIT5384693639</p>
        </div>
        <div>
          <img src="/assets/img.png" alt="" />
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-5 w-full grid gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {/* Render multiple VendorsCard components */}
        <VendorsCard profile={profileData} />
        <VendorsCard profile={profileData} />
        <VendorsCard2 profile={profileData} />
        <VendorsCard2 profile={profileData} />
      </div>
      <div  className="mt-5 w-full flex gap-4 max-lg:flex-col">
        <VendorsCard3 profile={profileData} />
        <VendorsCard3 profile={profileData} />
      </div>
    </div>
  );
};

export default VendDetails;
