"use client";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-black text-white py-5 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 p-5">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-4 max-h-14" />
        <div className="flex flex-col mb-8">
          <p className="text-md mb-2">Subscribe</p>
          <p className="text-md mb-2 font-extralight">Enter your email and get notified about the latest campaigns</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="p-3 rounded-l-md w-full sm:w-64 text-black focus:outline-none"
            />
            <button className="p-3 px-4 text-xl -ml-2 bg-[#341266] rounded-md">
              <FaTelegramPlane/>
            </button>
          </div>
        </div>
        </div>

        <div className="border-t border-gray-700 pt-10 flex flex-wrap md:flex-nowrap justify-between">
        <div className="w-full sm:w-auto mb-4">
            <ul>
              <li className="text-sm mb-2">Brand</li>
              <li className="text-sm mb-2">Contact Us</li>
              <li className="text-sm mb-2" onClick={() => router.push('/about')}>About Us</li>
            </ul>
          </div>

          <div className="w-full sm:w-auto mb-4">
            <ul>
              <li className="text-sm mb-2">Brand Login</li>
              <li className="text-sm mb-2 cursor-pointer" onClick={() => router.push('/casestudy')}>Case Study</li>
              <li className="text-sm mb-2">Career</li>
              <li className="text-sm mb-2 cursor-pointer" onClick={() => router.push('/joincomunity')}>Join Community</li>
              <li className="text-sm mb-2 cursor-pointer" onClick={() => router.push('/CampusAmbassador')}>Student Ambassador</li>
              <li className="text-sm mb-2 cursor-pointer" onClick={() => router.push('/engagement')}>Sponsorship</li>
            </ul>
          </div>

          <div className="w-full sm:w-auto mb-4 flex flex-col justify-between">
            <ul>
              <li className="text-sm mb-2">Privacy Policy</li>
              <li className="text-sm mb-2">Terms & Conditions</li>
            </ul>
          <div className="w-full mt-auto">
            <p className="mb-2">Follow us</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8D57DD]">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#8D57DD]">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#8D57DD]">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#8D57DD]">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
