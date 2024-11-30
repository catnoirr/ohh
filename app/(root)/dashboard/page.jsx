import React from "react";
import TotalSavingsCard from "./components/TotalSavingsCard"; // Adjust the path based on your file structure
import StatsCard from "./components/StatsCard"; // Adjust the path based on your file structure
import LastScans from "./components/LastScans";
import BalanceHistory from "./components/BalanceHistory";


const Page = () => {
  return (
    <div className="sm:w-[30rem] w-full mx-auto flex flex-col justify-center items-center">

      {/* Using TotalSavingsCard Component */}
      <TotalSavingsCard />
      <StatsCard/>
      <LastScans/>
      <BalanceHistory/>
    </div>
  );
};

export default Page;
