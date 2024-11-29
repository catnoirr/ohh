import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";

const SocialComponent = () => {
  return (
    <div className="mt-5 bg-gradient-to-r from-[#d9d3e2] to-[#B2A6C4] p-6 rounded-xl text-white w-full mx-auto">
      <button className="flex mx-auto items-center justify-center bg-gradient-to-r from-purple-400 to-[#5C25AB] py-2 px-4 rounded-full mb-6 shadow-lg hover:opacity-90 transition-opacity duration-300">
        <IoLogoWhatsapp size={24} className="mr-2 text-white" />
        <span className="font-bold text-lg">Join Oohpoint Community</span>
      </button>

      <p className="text-center mb-4 font-medium">Follow us on</p>
      <div className="flex justify-center space-x-6">
        <a href="#" className="bg-[#5C25AB] text-[#5C25AB] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="bg-[#5C25AB] text-[#5C25AB] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300">
          <FaFacebookF size={24} />
        </a>
        <a href="#" className="bg-[#5C25AB] text-[#5C25AB] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300">
          <FaLinkedinIn size={24} />
        </a>
        <a href="#" className="bg-[#5C25AB] text-[#5C25AB] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300">
          <FaYoutube size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialComponent;
