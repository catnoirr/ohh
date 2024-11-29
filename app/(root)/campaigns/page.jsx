import CampaignList from "./components/DisplayCampaign"
import SearchBar from "@/components/Home/SearchBar"
const page = () => {
    

  return (
   <div className="flex flex-col min-h-screen bg-[#341266] sm:w-[30rem] w-full mx-auto pt-2">
     {/* <SearchBar/> */}
     <CampaignList/>
   </div>
  )
}

export default page
