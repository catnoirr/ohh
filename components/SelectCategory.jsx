import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HelpDesk } from "./Helpdesk";

const CategorySelect = () => {
  const categories = [
    {
      name: "Bug Report",
      description: "Report any bugs or issues you've encountered.",
    },
    {
      name: "Feature Request",
      description: "Suggest a new feature to improve the app.",
    },
    {
      name: "Performance Issue",
      description: "Let us know if the app feels slow or unresponsive.",
    },
    {
      name: "Crash/Error",
      description: "Describe any crashes or errors you've experienced.",
    },
    {
      name: "Authentication Problem",
      description: "Issues related to login or account access.",
    },
    {
      name: "Billing/Payment Problem",
      description: "Report issues with payments or billing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-3">
      <h2 className="text-lg font-semibold mb-4"> Category</h2>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li
            key={index}
            className="bg-gray-50 border border-gray-300 rounded-lg"
          >
            <div
              className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => toggleDropdown(index)}
            >
              <span className="text-gray-700">{category.name}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
            {openIndex === index && (
              <div className="px-4 py-2 bg-gray-100 text-sm text-gray-600 border-t border-gray-300">
                {category.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelect;
