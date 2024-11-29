"use client";
import { useState } from 'react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('user'); // Track the active tab (User or Brand)
  const [openQuestion, setOpenQuestion] = useState(null); // Track the open FAQ

  // Switch between tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
    setOpenQuestion(null); // Reset the open question when switching tabs
  };

  // Toggle open/close for FAQs
  const toggleFAQ = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // FAQs for User tab
  const userFAQs = [
    {
      question: "What is Ooh Point?",
      answer: "Ooh point allows you to discover new brands through engaging campaigns and earn rewards like discounts or free products for participating."
    },
    {
      question: "How does Ooh Point benefit me?",
      answer: "Ooh point helps you earn rewards by participating in brand campaigns."
    },
    {
      question: "Is it free to sign up and use Ooh Point?",
      answer: "Yes, signing up and using Ooh Point is completely free."
    },
    {
      question: "What is Ooh Point?",
      answer: "Ooh point allows you to discover new brands through engaging campaigns and earn rewards like discounts or free products for participating."
    },
    {
      question: "How does Ooh Point benefit me?",
      answer: "Ooh point helps you earn rewards by participating in brand campaigns."
    },
    {
      question: "Is it free to sign up and use Ooh Point?",
      answer: "Yes, signing up and using Ooh Point is completely free."
    },
    // Add more User FAQs here
  ];

  // FAQs for Brand tab
  const brandFAQs = [
    {
      question: "What is Ooh Point for brands?",
      answer: "Ooh Point helps brands create engaging campaigns to connect with users and promote their products."
    },
    {
      question: "How can brands benefit from Ooh Point?",
      answer: "Brands can run campaigns to increase awareness and reward users for participating, helping boost engagement."
    },
    {
      question: "How do brands create a campaign?",
      answer: "Brands can create campaigns by signing into their Ooh Point account and accessing the brand dashboard."
    },
    {
      question: "What is Ooh Point for brands?",
      answer: "Ooh Point helps brands create engaging campaigns to connect with users and promote their products."
    },
    {
      question: "How can brands benefit from Ooh Point?",
      answer: "Brands can run campaigns to increase awareness and reward users for participating, helping boost engagement."
    },
    {
      question: "How do brands create a campaign?",
      answer: "Brands can create campaigns by signing into their Ooh Point account and accessing the brand dashboard."
    },
    // Add more Brand FAQs here
  ];

  // Display relevant FAQ list based on the active tab
  const faqs = activeTab === 'user' ? userFAQs : brandFAQs;

  return (
    <>
      <p className="text-lg text-white font-semibold mt-16">FAQ's</p>
      <div className="flex justify-center mb-6 p-1 bg-white rounded-full">
        <button
          onClick={() => toggleTab('user')}
          className={`px-4 py-2 text-sm font-semibold rounded-full min-w-[90px] ${
            activeTab === 'user' ? 'bg-[#341266] text-white' : ''
          }`}
        >
          User
        </button>
        <button
          onClick={() => toggleTab('brand')}
          className={`px-4 py-2 text-sm font-semibold rounded-full min-w-[90px] ${
            activeTab === 'brand' ? 'bg-[#341266] text-white' : ''
          }`}
        >
          Brand
        </button>
      </div>

      <div className="w-full mx-auto p-4 bg-white">
        <div className="p-4 rounded-md">
          {faqs.map((faq, index) => (
            <div key={index} className="">
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer p-3 bg-white rounded-lg"
              >
                <p className="font-semibold">{faq.question}</p>
                <span>{openQuestion === index ? '−' : '+'}</span>
              </div>
              {openQuestion === index ? (
                <p className="px-3 py-2 bg-white rounded-lg text-sm">{faq.answer}</p>
              ):(
                <div className='h-[1px] my-1 bg-[#DFDFDF] w-full'></div>
              )
            }
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
