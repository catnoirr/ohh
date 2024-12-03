import React from "react";

const PricingSection = () => {
  return (
    <div className="mission text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="space-y-4">
            <h2 className="text-green-400 font-semibold uppercase">Pricing</h2>
            <h3 className="text-3xl font-bold">Budget-friendly pricing solutions</h3>
            <p>
              Our pricing model is designed with your agency in mind. Discover our
              transparent rates and flexible options tailored to fit your unique needs.
            </p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" name="billing" className="mr-2" />
                Monthly
              </label>
              <label className="flex items-center">
                <input type="radio" name="billing" className="mr-2" />
                Yearly
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  20% save
                </span>
              </label>
            </div>
          </div>

          {/* Middle Section */}
          <div className="bg-white text-black p-6 rounded-md">
            <h4 className="text-xl font-semibold">Customization</h4>
            <p className="text-sm text-gray-600 my-4">
              Our essential plan is self-service solution for businesses to handle website
              messaging and personalization.
            </p>
            <p className="text-gray-600 mb-4">How many customers do you have?</p>
            <p className="text-3xl font-bold mb-4">$20 <span className="text-base font-normal">/month</span></p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500">
              Get started →
            </button>
          </div>

          {/* Right Section */}
          <div className="bg-white text-black p-6 rounded-md">
            <h4 className="text-xl font-semibold">Boss mode</h4>
            <p className="text-sm text-gray-600 my-4">
              In no impression, assistance contrasted Manners she wishing justice.
            </p>
            <ul className="text-sm text-gray-600 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✔</span>
                <span>Unlimited monthly visitors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✔</span>
                <span>Dedicated SEO strategists</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✔</span>
                <span>Google Docs style editors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✔</span>
                <span>Basic chat and email support</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✔</span>
                <span>AI-powered product recommendation engine</span>
              </li>
            </ul>
            <p className="text-3xl font-bold mb-4">$250 <span className="text-base font-normal">/month</span></p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500">
              Get started →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
